'use client'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icon'
import { FakerService } from '@/client'

export default function ButtonDemo() {
  const [apiResponse, setApiResponse] = useState('')
  const makeRequestWithToken = async () => {
    try {
      // const response = await fetch('/api/faker/person')
      const response = await FakerService.getFakerUserListApi()
      console.log('response', response)
      setApiResponse(JSON.stringify(response, null, 2))
    } catch (error) {
    }
  }

  const getNextApi = async () => {
    const res = await fetch('/api/protected')
    console.log('res', res)
    const json = await res.json()
    console.log('sjon', json)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Button</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button>Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="outline" size="icon">
            <Icon name="radix-icons:chevron-right" className="h-4 w-4" />
          </Button>

          <Button disabled>Button</Button>
        </div>
        <div className="mt-4 ">
          <div className="flex gap-4">
            <Button onClick={makeRequestWithToken}>获取数据</Button>
            <Button onClick={() => setApiResponse('')}>隐藏数据</Button>
          </div>
          <pre>{apiResponse}</pre>
        </div>
        <div className="mt-4">
          <div className="flex gap-4">
            <Button onClick={getNextApi}>Next-Api</Button>
          </div>
          <pre>{apiResponse}</pre>
        </div>
      </CardContent>
    </Card>

  )
}
