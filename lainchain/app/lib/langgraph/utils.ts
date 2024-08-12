import { AgentExecutor, createOpenAIToolsAgent } from 'langchain/agents'
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts'
import type { ChatOpenAI } from '@langchain/openai'

export async function createAgent(
  llm: ChatOpenAI,
  tools: any[],
  systemPrompt: string,
): Promise<AgentExecutor> {
  // Each worker node will be given a name and some tools.
  const prompt = await ChatPromptTemplate.fromMessages([
    ['system', systemPrompt],
    new MessagesPlaceholder('messages'),
    new MessagesPlaceholder('agent_scratchpad'),
  ])
  const agent = await createOpenAIToolsAgent({ llm, tools, prompt })
  return new AgentExecutor({ agent, tools })
}
