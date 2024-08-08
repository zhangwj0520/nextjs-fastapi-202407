'use client'

import { useRef, useState } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { generateStreamObject, getTongyi } from './actions'
import { Button } from '@/components/ui/button'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function TongyiDemo() {
  const [generation, setGeneration] = useState<any[]>([])
  const list = useRef<string[]>([])
  const getData = () => {
    fetchEventSource('http://127.0.0.1:9110/api/stream/tongyi', {
      onmessage(ev) {
        console.log(ev.data)
      },
    })
  }

  return (
    <div>
      <Button
        onClick={async () => {
          const { object } = await getTongyi('Messages during finals week.')
          console.log('object', object)

          for await (const partialObject of readStreamableValue(object)) {
            console.log('partialObject', partialObject)
            if (partialObject) {
              console.log('json', JSON.parse(partialObject.data))
              const list = JSON.parse(partialObject.data)?.contents || []
              console.log('list.current', list)
              setGeneration(
                list,
              )
            }
          }
        }}
      >
        Ask
      </Button>
      <Button onClick={getData}>getData</Button>

      {/* <pre>{generation}</pre> */}
      {generation.map((item) => {
        if (item.contentType === 'plugin') {
          return (
            <div>
              工具:
              {item.pluginName}
            </div>
          )
        }
        if (item.contentType === 'text') {
          return (
            <div>
              {item.content}
            </div>
          )
        }
        if (item.contentType === 'referenceLink') {
          return (
            <div>
              {item.content}
            </div>
          )
        }
      })}
    </div>
  )
}
