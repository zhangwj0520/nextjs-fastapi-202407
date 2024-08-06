'use client'

import { useState } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { generateStreamText } from './actions'
import { Button } from '@/components/ui/button'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function Home() {
  const [generation, setGeneration] = useState<string>('')

  return (
    <div>
      <Button
        onClick={async () => {
          const { output } = await generateStreamText('写一篇3000字关于中国经济的情况?')

          for await (const delta of readStreamableValue(output)) {
            console.log('delta', delta)
            setGeneration(currentGeneration => `${currentGeneration}${delta}`)
          }
        }}
      >
        Ask
      </Button>

      <div>{generation}</div>
    </div>
  )
}
