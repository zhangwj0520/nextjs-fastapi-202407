from fastapi import APIRouter


from typing import List, Optional, TypedDict

from langchain.output_parsers.openai_tools import JsonOutputToolsParser
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableConfig
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from langgraph.graph.graph import CompiledGraph

from app.ai.tools.github import github_repo
from app.ai.tools.invoice import invoice_parser
from app.ai.tools.weather import weather_data


from app.models.langchain import ChatInputType

from langserve import add_routes

router = APIRouter()


class GenerativeUIState(TypedDict, total=False):
    input: HumanMessage
    result: Optional[str]
    """如果未使用工具，则为纯文本响应。"""
    tool_calls: Optional[List[dict]]
    """已解析的工具调用列表。"""
    tool_result: Optional[dict]
    """工具调用的结果。"""


def invoke_model(state: GenerativeUIState, config: RunnableConfig) -> GenerativeUIState:
    tools_parser = JsonOutputToolsParser()
    initial_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "你是一个有用的助手。您提供了一系列的工具,以及来自用户的输入。\n"
                + "你的工作是确定你是否有可以处理用户输入的工具,或使用纯文本响应进行回答。",
                # "You are a helpful assistant. You're provided a list of tools, and an input from the user.\n"
                # + "Your job is to determine whether or not you have a tool which can handle the users input, or respond with plain text.",
            ),
            MessagesPlaceholder("input"),
        ]
    )
    model = ChatOpenAI(model="gpt-4o", temperature=0, streaming=True)
    tools = [github_repo, invoice_parser, weather_data]
    model_with_tools = model.bind_tools(tools)
    chain = initial_prompt | model_with_tools
    result = chain.invoke({"input": state["input"]}, config)  # type: ignore

    if not isinstance(result, AIMessage):
        raise ValueError("Invalid result from model. Expected AIMessage.")

    if isinstance(result.tool_calls, list) and len(result.tool_calls) > 0:
        parsed_tools = tools_parser.invoke(result, config)
        return {"tool_calls": parsed_tools}
    else:
        return {"result": str(result.content)}


def invoke_tools_or_return(state: GenerativeUIState) -> str:
    if "result" in state and isinstance(state["result"], str):
        return END
    elif "tool_calls" in state and isinstance(state["tool_calls"], list):
        return "invoke_tools"
    else:
        raise ValueError("Invalid state. No result or tool calls found.")


def invoke_tools(state: GenerativeUIState) -> GenerativeUIState:
    tools_map = {
        "github-repo": github_repo,
        "invoice-parser": invoice_parser,
        "weather-data": weather_data,
    }

    if state["tool_calls"] is not None:
        tool = state["tool_calls"][0]
        selected_tool = tools_map[tool["type"]]
        return {"tool_result": selected_tool.invoke(tool["args"])}
    else:
        raise ValueError("No tool calls found in state.")


def create_graph() -> CompiledGraph:
    workflow = StateGraph(GenerativeUIState)

    workflow.add_node("invoke_model", invoke_model)  # type: ignore
    workflow.add_node("invoke_tools", invoke_tools)

    # Add a conditional edge from the starting node to any number of destination nodes.
    # 添加从起始节点到任意数量的目标节点的条件边。
    workflow.add_conditional_edges("invoke_model", invoke_tools_or_return)

    # 指定要在图中调用的第一个节点。
    workflow.set_entry_point("invoke_model")

    # 将节点标记为图形的终点
    workflow.set_finish_point("invoke_tools")

    # 将状态图编译为 CompiledGraph 对象。
    graph = workflow.compile()
    return graph


graph = create_graph()
graph.debug = True

runnable = graph.with_types(input_type=ChatInputType, output_type=dict)

add_routes(router, runnable, playground_type="chat")
