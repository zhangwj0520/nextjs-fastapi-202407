'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { Icon } from '@/components/icon'

let i = 1
export default function TongyiDemo() {
  const [loading, setLoading] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [contents, setContents] = useState([])
  const [parentMsgId, setParentMsgId] = useLocalStorage('parentMsgId', '')
  const [sessionId, setSessionId] = useLocalStorage('sessionId', '')
  const textMsg = useRef()
  const getData = () => {
    setLoading(true)
    const params = {
      parentMsgId,
      sessionId,
      userIntent: '写一个关于春天的800字作文',
      // userIntent: '你是谁1',
    }
    const url = 'http://127.0.0.1:9110/api/stream/tongyi'
    // 创建 URLSearchParams 对象
    const searchParams = new URLSearchParams(params)

    // 将参数附加到 URL
    const finalUrl = `${url}?${searchParams.toString()}`
    console.log('finalUrl', finalUrl)

    const evtSource = new EventSource(finalUrl, {
      withCredentials: true,
    })
    evtSource.onmessage = function (event) {
      handleMsg(event.data)
    }
    evtSource.onerror = (event) => {
      // console.error('Error:', event)
      evtSource.close() // 关闭连接
      setLoading(false)
    }
  }

  const handleMsg = (msg: string) => {
    try {
      i++
      console.log('i', i)
      const json = JSON.parse(msg)
      if (json.msgStatus === 'finished') {
        setParentMsgId(json.msgId)
        setSessionId(json.sessionId)
      }
      if (json.contents) {
        json.contents.forEach((item) => {
          if (item.contentType === 'text') {
            textMsg.current = item.content
          }
        })
      }
      console.log('json', json)
    } catch (error) {

    }
  }

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      const text = textMsg.current
      if (text) {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1))
          index++
        } else {
          clearInterval(intervalId)
        }
      }
    }, 10)
    return () => clearInterval(intervalId)
  }, [textMsg.current])

  useEffect(() => {
    console.log('loading', loading)
  }, [loading])
  return (
    <div className=" w-full overflow-hidden">

      <Button onClick={() => getData()} disabled={loading}>
        {loading && <Icon name="radix-icons:reload" className="mr-2 h-4 w-4 animate-spin" />}
        通义千问
      </Button>

      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {displayedText}
      </div>

    </div>
  )
}
