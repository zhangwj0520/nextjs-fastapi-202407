"""An image generation agent implemented by assistant"""

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse

from typing import Dict, Iterator, List, Optional, Tuple, Union
from qwen_agent.llm.schema import Message
from pydantic import BaseModel

router = APIRouter()

import json
import os
import urllib.parse

import json5

from qwen_agent.agents import Assistant

# from qwen_agent.gui import WebUI
from qwen_agent.tools.base import BaseTool, register_tool

# ROOT_RESOURCE = os.path.join(os.path.dirname(__file__), "../../resource")
ROOT_RESOURCE = os.path.join(os.getcwd(), "app/assets/resource")

print("ROOT_RESOURCE", ROOT_RESOURCE)

# ROOT_RESOURCE = os.path.join(os.getcwd(), "resource")

# print("ROOT_RESOURCE", ROOT_RESOURCE)


# template_str = (
#         Path(__file__).parent / "../assets/email-templates" / "build" / template_name
#     ).read_text()


# Add a custom tool named my_image_gen：
@register_tool("my_image_gen")
class MyImageGen(BaseTool):
    description = "AI painting (image generation) service, input text description, and return the image URL drawn based on text information."
    parameters = [
        {
            "name": "prompt",
            "type": "string",
            "description": "Detailed description of the desired image content, in English",
            "required": True,
        }
    ]

    def call(self, params: str, **kwargs) -> str:
        prompt = json5.loads(params)["prompt"]
        prompt = urllib.parse.quote(prompt)
        return json.dumps(
            {"image_url": f"https://image.pollinations.ai/prompt/{prompt}"},
            ensure_ascii=False,
        )


def init_agent_service():
    # llm_cfg = {"model": "qwen-turbo"}
    llm_cfg = {
        "model": "cestc",
        "model_server": "http://182.92.112.254:424/v1",
        "api_key": "kanshucestckanshu",
        # "header": {"Authorization": "Bearer kanshucestckanshu"},
    }
    system = (
        "根据用户的要求，先画一幅画"
        "然后自动运行代码下载图片,并从给定文档中选择图像操作处理图像"
    )
    # system = (
    #     "According to the user's request, you first draw a picture and then automatically "
    #     "run code to download the picture and select an image operation from the given document "
    #     "to process the image"
    # )

    print("ROOT_RESOURCE", ROOT_RESOURCE)

    tools = [
        "my_image_gen",
        "code_interpreter",
    ]  # code_interpreter is a built-in tool in Qwen-Agent
    bot = Assistant(
        llm=llm_cfg,
        name="AI painting",
        description="AI painting service",
        system_message=system,
        function_list=tools,
        files=[os.path.join(ROOT_RESOURCE, "doc.pdf")],
    )

    return bot


def chat_generator(
    messages: List[Union[Dict, Message]],
):
    # Define the agent
    bot = init_agent_service()

    # messages = [{"role": "user", "content": "画一个小狗"}]
    print("messages", messages)
    # Chat
    for response in bot.run(messages=messages):
        # print("bot response:", response)

        # for msg in response:
        #     # print("bot response:", msg)
        #     # 将Message转换成json串
        #     temp = json.dumps(msg, ensure_ascii=False)
        #     # print("temp====", temp)
        #     # print(json.dumps(msg, ensure_ascii=False))
        #     res.extend(temp)
        #     # yield f"{temp}"

        print("res", response)
        yield f"data: {response}\n\n"


class ChatBody(BaseModel):
    messages: List[Union[Dict, Message]]


@router.post("", response_model=bytes)
async def chat(
    body: ChatBody,
):
    print(1111)
    # Convert instances of Message to dictionaries
    # messages = [msg.dict() if isinstance(msg, Message) else msg for msg in messages]
    return StreamingResponse(
        chat_generator(messages=body.messages),
        media_type="text/event-stream",
        headers={"Content-Type": "text/event-stream;charset=UTF-8"},
        # headers={"Content-Type": "application/json"},
    )


# @router.get("", response_model=bytes)
# async def chat():
#     print(1111)
#     # Convert instances of Message to dictionaries
#     # messages = [msg.dict() if isinstance(msg, Message) else msg for msg in messages]
#     return StreamingResponse(
#         chat_generator(),
#         media_type="text/event-stream",
#         headers={"Content-Type": "text/event-stream;charset=UTF-8"},
#         # headers={"Content-Type": "application/json"},
#     )
