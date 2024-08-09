import type { StreamableValue } from 'ai/rsc'
import { readStreamableValue } from 'ai/rsc'
import { useEffect, useState } from 'react'

export function useStreamableText(content: string | StreamableValue<string>) {
  const [rawContent, setRawContent] = useState(
    typeof content === 'string' ? content : '',
  )

  useEffect(() => {
    ;(async () => {
      if (typeof content === 'object') {
        let value = ''
        for await (const delta of readStreamableValue(content)) {
          if (typeof delta === 'string') {
            setRawContent((value = value + delta))
          }
        }
      }
    })()
  }, [content])

  return rawContent
}
