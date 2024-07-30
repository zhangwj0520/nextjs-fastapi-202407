'use client'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { OpenAPI } from '@/client/core/OpenAPI'

export function OpenApiClientConfig() {
  const router = useRouter()
  // 客户端组件获取session
  const { data, status } = useSession()
  useEffect(() => {
    // console.log('OpenAPI111', OpenAPI)
    // console.log('session, status ', session, status)
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
  }, [router])

  return (
    null
  )
}
