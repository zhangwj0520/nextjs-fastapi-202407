import type { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { auth, signOut } from '@/auth'
import { OpenAPI } from '@/client/core/OpenAPI'

OpenAPI.addResponseInterceptor(async (response) => {
  console.log(12222)
  if (response.status === 400) {
    const res = await response.clone().json()
  }
  if (response.status === 401) {
    redirect('/signout')
  }
  if (response.status === 403) {
    redirect('/signout')
  }
  return response
})
// Review if we need this, and why
function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers)
  responseHeaders.delete('content-encoding')

  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers: responseHeaders,
  })
}

async function handler(request: NextRequest) {
  const session = await auth()

  const headers = new Headers(request.headers)
  headers.set('Authorization', `Bearer ${session?.accessToken}`)

  const backendUrl
    = process.env.NEXT_PUBLIC_BACKEND_URL
    ?? 'http://127.0.0.1:9110'

  const url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl)
  const result = await fetch(url, { headers, body: request.body })
  return stripContentEncoding(result)
}

export const dynamic = 'force-dynamic'

export { handler as GET, handler as POST }
