'use client'

import { useRef, useState } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { generateStreamObject } from './actions'
import { Button } from '@/components/ui/button'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function Home() {
  const [generation, setGeneration] = useState<string>('')
  const list = useRef<string[]>([])

  return (
    <div>
      <Button
        onClick={async () => {
          const { object } = await generateStreamObject('Messages during finals week.')
          console.log('object', object)

          for await (const partialObject of readStreamableValue(object)) {
            console.log('partialObject', partialObject)
            if (partialObject) {
              // list.current.push(JSON.stringify(partialObject.data, null, 2))
              setGeneration(
                JSON.stringify(partialObject.data, null, 2),
              )
            }
          }
        }}
      >
        Ask
      </Button>

      <pre>{generation}</pre>
      {list.current.map(item => <pre key={item}>{item}</pre>)}
    </div>
  )
}
