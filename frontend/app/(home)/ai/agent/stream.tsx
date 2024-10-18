'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/icon'

class RetriableError extends Error { }
class FatalError extends Error { }

interface ChatItem {
  id: string
  content: string
  // role: 'user' | 'ai'
  isAnswer: boolean
  agent_thoughts?: any[]

}
const ChatDemo: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const [chatList, setChatList] = useState<ChatItem[]>([])
  const chatListRef = useRef<ChatItem[]>([])

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

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      // prevent send message when using input method enter
      if (!e.shiftKey)
        handleSend()
    }
  }

  const handleUpdateChatList = useCallback((newChatList: ChatItem[]) => {
    setChatList(newChatList)
    chatListRef.current = newChatList
  }, [])

  useEffect(() => {
    console.log('chatList', chatList)
  }, [chatList])
  const handleSend = () => {
    if (loading) {
      return
    }
    // 加载框
    setLoading(true)

    const questionId = `question-${Date.now()}`
    const questionItem = {
      id: questionId,
      content: query,
      isAnswer: false,
    }

    const placeholderAnswerId = `answer-placeholder-${Date.now()}`
    const placeholderAnswerItem = {
      id: placeholderAnswerId,
      content: '',
      isAnswer: true,
      agent_thoughts: [],
    }

    const newList = [...chatListRef.current, questionItem, placeholderAnswerItem]
    handleUpdateChatList(newList)

    const ctrl = new AbortController()
    fetchEventSource('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
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
          // const list = chatListRef.current
          // console.log('list', list)
          // list[list.length - 1]?.agent_thoughts = JSON.parse(msg.data)
          const newList = chatListRef.current
          console.log('newList', newList)
          newList[newList.length - 1].agent_thoughts = JSON.parse(msg.data)
          handleUpdateChatList(newList)
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
        <div>
          <div>
            {
              chatList.map((item, index) => {
                if (item.isAnswer) {
                  const isLast = item.id === chatList[chatList.length - 1]?.id
                  return (
                    <div key={item.id}>{JSON.stringify(item.agent_thoughts)}</div>
                  )
                }
                return (
                  <div key={item.id}>{item.content}</div>
                )
              })
            }
          </div>
        </div>
        <div className="flex space-x-2">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyUp={handleKeyUp}
            placeholder="输入消息..."
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            {loading ? <Icon name="radix-icons:reload" className="mr-2 h-4 w-4 animate-spin" /> : '发送'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatDemo
