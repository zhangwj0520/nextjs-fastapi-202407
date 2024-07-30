import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

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

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE }
