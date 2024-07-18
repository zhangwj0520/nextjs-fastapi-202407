'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function FullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false)
  return (
    <Button
      variant="outline"
      size="icon"
    >
      {isFullScreen
        ? (
            <span
              className="icon-[ant-design--fullscreen-exit-outlined] h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
              onClick={() => {
                document.exitFullscreen()
                setIsFullScreen(false)
              }}
            >
            </span>
          )
        : (
            <span
              className="icon-[ant-design--fullscreen-outlined] h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"
              onClick={() => {
                document.documentElement.requestFullscreen()
                setIsFullScreen(true)
              }}
            >
            </span>
          )}
      <span className="sr-only">全屏</span>
    </Button>
  )
}
