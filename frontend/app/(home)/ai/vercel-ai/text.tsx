'use client'

import { useState } from 'react'
import { getText } from './actions'
import { Button } from '@/components/ui/button'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function GeneratingText() {
  const [generation, setGeneration] = useState<string>('')

  return (
    <div>
      <Button
        onClick={async () => {
          const { text } = await getText('天空为啥是蓝色?')
          setGeneration(text)
        }}
      >
        Answer
      </Button>
      <div>{generation}</div>
    </div>
  )
}
