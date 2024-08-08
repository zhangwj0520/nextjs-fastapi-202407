'use client'

import { useRef, useState } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { generateStreamObject, getTongyi } from './actions'
import { Button } from '@/components/ui/button'

export default function TongyiDemo() {
  const [generation, setGeneration] = useState<any[]>([])
  const getData = () => {
    console.log(1111)
    const evtSource = new EventSource('http://127.0.0.1:9110/api/stream/tongyi', {
      withCredentials: true,
    })
    evtSource.onmessage = function (event) {
      console.log('event', event)
    }
    evtSource.onerror = (event) => {
      // console.error('Error:', event)
      evtSource.close() // 关闭连接
    }
  }

  return (
    <div className=" w-full overflow-hidden">

      <Button onClick={() => getData()}>通义千问</Button>

      {/* <pre>{generation}</pre> */}

    </div>
  )
}
