'use client'
import { toast } from 'sonner'
import type { Session } from 'next-auth'
import { OpenAPI, setClientConfig } from '@/client/core/OpenAPI'
import { auth } from '@/auth'

export default function FetchClientConfig({ session }: { session: Session }) {
  OpenAPI.interceptors.response.use(async (req) => {
    if (req.status === 400) {
      const res = await req.clone().json()
      toast.error(res.detail)
    }
    return req
  })
  setClientConfig({
    BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
    TOKEN: async () => {
      // const session = await auth()
      return `${session?.accessToken}`
    },
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
