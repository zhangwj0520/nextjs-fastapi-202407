'use client'

import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function Demo() {
  const AI = React.useRef()
  React.useEffect(() => {
    if (!AI.current) {
      getAi()
    }
  }, [])

  const getAi = async () => {
    AI.current = await window?.model?.createTextSession()
  }

  const question = React.useRef<HTMLTextAreaElement>(null)
  const [answer, setAnswer] = React.useState('')

  const handSubmit = async () => {
    const prompt = question?.current?.value
    console.log(prompt)
    const data = await AI?.current?.prompt(prompt)
    console.log('d', data)
    setAnswer(data)
    // const response = await fetch('/api/gemini', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     prompt
    //   }),
    // })
    // const data = await response.json()
    // console.log(data)
  }

  return (
    <>
      <Textarea placeholder="Type your message here." ref={question} />
      <Button onClick={handSubmit}>Send</Button>
      {answer}
    </>
  )
}
