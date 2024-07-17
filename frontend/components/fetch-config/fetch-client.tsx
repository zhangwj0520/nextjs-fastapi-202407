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
console.log('process.env.NEXT_PUBLIC_BACKEND_URL', process.env.NEXT_PUBLIC_BACKEND_URL)
setClientConfig({
  BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
  TOKEN: () => {
    return Promise.resolve('11111')
    // return Promise.resolve(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  },
})

export default function FetchClientConfig() {
  return (
    null
  )
}
