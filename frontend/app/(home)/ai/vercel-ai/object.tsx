'use client'

import { useState } from 'react'
import { getNotifications } from './actions'
import { Button } from '@/components/ui/button'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default function Home() {
  const [generation, setGeneration] = useState<string>('')

  return (
    <div>
      <Button
        onClick={async () => {
          const { notifications } = await getNotifications(
            'Messages during finals week.',
          )

          setGeneration(JSON.stringify(notifications, null, 2))
        }}
      >
        View Notifications
      </Button>

      <pre>{generation}</pre>
    </div>
  )
}
