'use client'
import { toast } from 'sonner'
import type { Session } from 'next-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OpenAPI } from '@/client/core/OpenAPI'

export default function FetchClientConfig({ session }: { session: Session }) {
  const router = useRouter()

  useEffect(() => {
    console.log('OpenAPI111', OpenAPI)
    if (!OpenAPI.INIT) {
      // OpenAPI.setConfig({
      //   INIT: true,
      //   BASE: '',
      //   TYPE: 'client',
      //   TOKEN: async () => {
      //     return `${session?.accessToken}`
      //   },
      // }).addResponseInterceptor(async (response) => {
      //   if (response.status === 400) {
      //     const res = await response.clone().json()
      //     toast.error(res.detail)
      //   }
      //   if (response.status === 401) {
      //     router.push('/signout')
      //   }
      //   if (response.status === 403) {
      //     router.push('/signout')
      //   }
      //   return response
      // })
      OpenAPI.addResponseInterceptor(async (response) => {
        if (response.status === 400) {
          const res = await response.clone().json()
          toast.error(res.detail)
        }
        if (response.status === 401) {
          router.push('/signout')
        }
        if (response.status === 403) {
          router.push('/signout')
        }
        return response
      })
    }
  }, [router, session, OpenAPI.INIT])

  return (
    null
  )
}
