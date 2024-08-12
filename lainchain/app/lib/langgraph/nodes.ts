import type { ChatOpenAI } from '@langchain/openai'
import type { RunnableConfig } from '@langchain/core/runnables'
import { HumanMessage } from '@langchain/core/messages'
import { createAgent } from './utils'
import { chartTool, tavilyTool } from './tools'
import type { AgentStateChannels } from './types'
/// 111

export async function getResearcherNode(llm: ChatOpenAI) {
  const researcherAgent = await createAgent(
    llm,
    [tavilyTool],
    // "You are a web researcher. You may use the Tavily search engine to search the web for" +
    // " important information, so the Chart Generator in your team can make useful plots.",
    'You are a web researcher. You may use the Tavily search engine to search the web for'
    + ' important information, so the Chart Generator in your team can make useful plots.',
  )

  const researcherNode = async (
    state: AgentStateChannels,
    config?: RunnableConfig,
  ) => {
    const result = await researcherAgent.invoke(state, config)
    return {
      messages: [
        new HumanMessage({ content: result.output, name: 'Researcher' }),
      ],
    }
  }
  return researcherNode
}

export async function getChartGenNode(llm: ChatOpenAI) {
  const chartGenAgent = await createAgent(
    llm,
    [chartTool],
    // "You excel at generating bar charts. Use the researcher's information to generate the charts.",
    '你擅长生成柱状图。使用Researcher返回的信息来生成图表',
  )

  const chartGenNode = async (
    state: AgentStateChannels,
    config?: RunnableConfig,
  ) => {
    const result = await chartGenAgent.invoke(state, config)
    return {
      messages: [
        new HumanMessage({ content: result.output, name: 'ChartGenerator' }),
      ],
    }
  }
  return chartGenNode
}
// 写一个冒泡
