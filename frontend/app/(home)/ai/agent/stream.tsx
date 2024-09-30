'use client'
import React, { useEffect, useRef, useState } from 'react'
import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/icon'

class RetriableError extends Error { }
class FatalError extends Error { }

const ChatDemo: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const abortControllerRef = useRef<AbortController>()
  // 清理函数，用于取消请求
  const cleanup = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }
  useEffect(() => {
    // 在组件挂载后初始化 AbortController
    abortControllerRef.current = new AbortController()
    return cleanup // 返回清理函数，用于在组件卸载时调用
  }, []) // 空数组确保组件挂载和卸载时只执行一次

  const sendMessage = () => {
    if (loading) {
      return
    }
    // 加载框
    setLoading(true)

    const ctrl = new AbortController()
    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: '画一个小狗',
          },
        ],
      }),
      signal: ctrl.signal,
      async onopen(response) {
        if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
          // everything's good
        } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
          // client-side errors are usually non-retriable:
          throw new FatalError()
        } else {
          throw new RetriableError()
        }
      },
      onmessage(msg) {
        if (msg.data) {
          console.log('msg', JSON.parse(msg.data))
          // console.log('msg', msg.data)
        }
        // if the server emits an error message, throw an exception
        // so it gets handled by the onerror callback below:
        if (msg.event === 'FatalError') {
          throw new FatalError(msg.data)
        }
      },
      onclose() {
        // 取消加载框
        setLoading(false)
        ctrl.abort()
      },
      onerror(err: any) {
        console.log(err, '出错了')
        // 取消加载框
        setLoading(false)
        throw err
        ctrl?.abort()
      },
    })
  }

  return (
    <div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            // onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="输入消息..."
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading}>
            {loading ? <Icon name="radix-icons:reload" className="mr-2 h-4 w-4 animate-spin" /> : '发送'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatDemo
