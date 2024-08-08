'use client'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { StreamService } from '@/client'

export default function VoicePage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const play = async () => {
    const response = await StreamService.getGetttsApi()
    if (audioRef.current) {
      audioRef.current.src = URL.createObjectURL(new Blob([response], { type: 'audio/mp3' }))
      audioRef.current.play()
    }
  }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>语音</CardTitle>
          <CardDescription>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={play}>播放</Button>
          <audio ref={audioRef}></audio>
        </CardContent>
      </Card>
    </div>
  )
}
