'use client'

import type { StreamableValue } from 'ai/rsc'
import { useStreamableValue } from 'ai/rsc'
import { AIMessageText } from '@/components/ai/message'

export function AIMessage(props: { value: StreamableValue<string> }) {
  const [data] = useStreamableValue(props.value)

  if (!data) {
    return null
  }
  return <AIMessageText content={data} />
}
