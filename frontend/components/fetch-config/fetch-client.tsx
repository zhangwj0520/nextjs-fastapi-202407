'use client'
import { toast } from 'sonner'
import type { Session } from 'next-auth'
import { OpenAPI } from '@/client/core/OpenAPI'
import { auth } from '@/auth'

export default function FetchClientConfig({ session }: { session: Session }) {
  OpenAPI.setConfig({
    BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
    TOKEN: async () => {
      return `${session?.accessToken}`
    },
  }).addResponseInterceptor(async (req) => {
    if (req.status === 400) {
      const res = await req.clone().json()
      toast.error(res.detail)
    }
    return req
  })

  OpenAPI.interceptors.response.use(async (req) => {
    if (req.status === 400) {
      const res = await req.clone().json()
      toast.error(res.detail)
    }
    return req
  })
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
