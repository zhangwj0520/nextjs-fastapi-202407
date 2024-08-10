'use client'

import { useEffect, useRef, useState } from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Button } from '@/components/ui/button'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { Icon } from '@/components/icon'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'
import { MemoizedReactMarkdown } from '@/components/ai/markdown'
import { CodeBlock } from '@/components/ai/codeblock'

let index = 0
export default function TongyiDemo() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [contents, setContents] = useState([])
  const [parentMsgId, setParentMsgId] = useLocalStorage('parentMsgId', '')
  const [sessionId, setSessionId] = useLocalStorage('sessionId', '')
  const textMsg = useRef('')
  const textContent = useRef({})
  const curMsg = useRef({})
  const getData = () => {
    setLoading(true)
    setStreaming(true)
    textMsg.current = ''
    setDisplayedText('')
    const params = {
      parentMsgId,
      sessionId,
      userIntent: '写一个关于春天的800字作文',
      // userIntent: '列出昨日10条热点新闻',
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
        console.log('stop', json)

        json.contents.forEach((item) => {
          if (item.contentType === 'text') {
            console.log('item.')
            // setCurMsg(item.content)
          }
        })
      }
      if (json.contents) {
        json.contents.forEach((item) => {
          if (item.contentType === 'text') {
            textMsg.current = item.content
            textContent.current = item
          }
        })
      }
      // console.log('json', json)
    } catch (error) {

    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      const text = textMsg.current
      console.log('text', text.length, index)
      if (text) {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1))
          index++
        } else {
          if (!streaming) {
            clearInterval(intervalId)
          }
        }
      }
    }, 50)

    return () => clearInterval(intervalId)
  }, [loading, streaming])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [messagesEndRef?.current?.clientHeight])
  return (
    <div className="w-full h-full relative">

      <Button onClick={() => getData()} disabled={loading} className="sticky top-0">
        {loading && <Icon name="radix-icons:reload" className="mr-2 h-4 w-4 animate-spin" />}
        通义千问
      </Button>

      <div className="ml-4 space-y-2 px-1 h-full" ref={messagesEndRef}>
        {/* {displayedText} */}
        {/* {text} */}
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"

          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="my-4 last:mb-0">{children}</p>
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
          {displayedText}
        </MemoizedReactMarkdown>

      </div>

    </div>
  )
}
