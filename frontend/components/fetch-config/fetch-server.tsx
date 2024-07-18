import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { OpenAPI } from '@/client/core/OpenAPI'
import { auth, signIn, signOut } from '@/auth'

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
  if (response.status === 401) {
    return redirect('/signout')
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
