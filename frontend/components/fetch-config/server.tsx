import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { OpenAPI } from '@/client/core/OpenAPI'
import { auth } from '@/auth'

OpenAPI.setConfig({
  TYPE: 'server',
  INIT: true,
  BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
  TOKEN: async () => {
    const session = await auth()
    return `${session?.accessToken}`
  },
}).addResponseInterceptor(async (response) => {
  if (response.status === 400) {
    const res = await response.clone().json()
    toast.error(res.detail)
  }
  if (response.status === 401) {
    return redirect('/signout')
  }
  if (response.status === 403) {
    return redirect('/signout')
  }
  return response
})

export default function OpenApiServerConfig() {
  return (
    null
  )
}
