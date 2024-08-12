import type { BaseMessage } from '@langchain/core/messages'

export interface AgentStateChannels {
  messages: BaseMessage[]
  // The agent node that last performed work
  next: string
}
