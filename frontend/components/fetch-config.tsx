'use client'
import { toast } from 'sonner'
import { OpenAPI, setClientConfig } from '@/client/core/OpenAPI'

OpenAPI.interceptors.response.use(async (req) => {
  if (req.status === 400) {
    const res = await req.clone().json()
    toast.error(res.detail)
  }
  return req
})
setClientConfig({
  TOKEN: () => {
    return Promise.resolve('11111')
    // return Promise.resolve(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  },
})

function FetchConfig() {
  return (
    null
  )
}

export { FetchConfig }
