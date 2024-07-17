import { toast } from 'sonner'
import { OpenAPI } from '@/client/core/OpenAPI'
import { auth } from '@/auth'

OpenAPI.setConfig({
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
  return response
})

// setClientConfig({
//   BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
//   TOKEN: async () => {
//     const session = await auth()
//     return `${session?.accessToken}`
//   },
// })

export default function FetchServerConfig() {
  return (
    null
  )
}
