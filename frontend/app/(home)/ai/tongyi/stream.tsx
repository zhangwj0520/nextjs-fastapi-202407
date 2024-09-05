'use client'

import { useEffect, useRef, useState } from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { Icon } from '@/components/icon'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import { MemoizedReactMarkdown } from '@/components/ai/markdown'
import { CodeBlock } from '@/components/ai/codeblock'

function processLatex(str: string) {
  return str.replace(/```\s*```/g, '')
    .replace(/\\\[(.*?)\\\]/gs, (_, equation) => `$$${equation}$$`)
    .replace(/\(\\\\((.*?)\\\\)/gs, (_, equation) => `$$${equation}$$`)
    .replace(/\\\((.*?)\\\)/gs, (_, equation) => `$$${equation}$$`)
    .replace(/(^|[^\\])\$(.+?)\$/gs, (_, prefix, equation) => `${prefix}$${equation}$`)
}

let index = 0
export default function TongyiChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([])
  const [input, setInput] = useState('')
  const [parentMsgId, setParentMsgId] = useLocalStorage('parentMsgId', '')
  const [sessionId, setSessionId] = useLocalStorage('sessionId', '')
  const textMsg = useRef('')
  const textContent = useRef({})
  const curMsg = useRef({})

  const sendMessage = () => {
    if (!input.trim())
      return

    setMessages(prev => [...prev, { role: 'user', content: input }])
    getData(input)
    setInput('')
  }

  const getData = (userIntent: string) => {
    setLoading(true)
    setStreaming(true)
    textMsg.current = ''
    const params = {
      parentMsgId,
      sessionId,
      userIntent,
    }
    const url = 'http://127.0.0.1:9110/api/stream/tongyi'
    const searchParams = new URLSearchParams(params)
    const finalUrl = `${url}?${searchParams.toString()}`

    const evtSource = new EventSource(finalUrl, {
      withCredentials: true,
    })
    evtSource.onmessage = function (event) {
      handleMsg(event.data)
    }
    evtSource.onerror = (event) => {
      evtSource.close()
      setLoading(false)
      setTimeout(() => {
        setStreaming(false)
      }, 500)
    }
  }

  const handleMsg = (msg: string) => {
    try {
      const json = JSON.parse(msg)
      curMsg.current = json
      if (json.msgStatus === 'finished') {
        setParentMsgId(json.msgId)
        setSessionId(json.sessionId)
      }
      if (json.contents) {
        json.contents.forEach((item: any) => {
          if (item.contentType === 'text') {
            textMsg.current = item.content
            textContent.current = item
          }
        })
      }
    } catch (error) {
      console.error('Error parsing message:', error)
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const text = textMsg.current
      if (text) {
        if (index < text.length) {
          setMessages((prev) => {
            const newMessages = [...prev]
            if (newMessages[newMessages.length - 1]?.role === 'assistant') {
              newMessages[newMessages.length - 1].content = text.substring(0, index + 1)
            } else {
              newMessages.push({ role: 'assistant', content: text.substring(0, index + 1) })
            }
            return newMessages
          })
          index++
        } else {
          if (!streaming) {
            clearInterval(intervalId)
            index = 0
          }
        }
      }
    }, 20)

    return () => clearInterval(intervalId)
  }, [loading, streaming])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messages])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <MemoizedReactMarkdown
                className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  p({ children }) {
                    return <p className="my-1 last:mb-0">{children}</p>
                  },
                  code({ node, inline, className, children, ...props }) {
                    if (children.length) {
                      if (children[0] == '▍') {
                        return (
                          <span className="mt-1 animate-pulse cursor-default">▍</span>
                        )
                      }
                      children[0] = (children[0] as string).replace('`▍`', '▍')
                    }
                    const match = /language-(\w+)/.exec(className || '')
                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }
                    return (
                      <CodeBlock
                        key={Math.random()}
                        language={(match && match[1]) || ''}
                        value={String(children).replace(/\n$/, '')}
                        {...props}
                      />
                    )
                  },
                }}
              >
                {processLatex(message.content)}
              </MemoizedReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
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
