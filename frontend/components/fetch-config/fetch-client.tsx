'use client'
import { toast } from 'sonner'
import type { Session } from 'next-auth'
import { useEffect } from 'react'
import { OpenAPI } from '@/client/core/OpenAPI'
import { auth } from '@/auth'

export default function FetchClientConfig({ session }: { session: Session }) {
  useEffect(() => {
    if (!OpenAPI.INIT) {
      OpenAPI.setConfig({
        INIT: true,
        BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
        TOKEN: async () => {
          return `${session?.accessToken}`
        },
      }).addResponseInterceptor(async (response) => {
        if (response.status === 400) {
          const res = await response.clone().json()
          toast.error(res.detail)
        }
        return response
      })
    }
  }, [OpenAPI, OpenAPI.INIT])

  return (
    null
  )
}
export async function getServerSideProps() {
  const session = await auth()

  return {
    props: {
      session,
    },
  }
}
