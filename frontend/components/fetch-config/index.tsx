import { SessionProvider } from 'next-auth/react'
import { OpenApiServerConfig } from './server'
import { OpenApiClientConfig } from './client'
import { auth } from '@/auth'

export async function OpenApiConfig() {
  const session = await auth()

  return (
    <SessionProvider basePath="/auth" session={session}>
      <OpenApiClientConfig />
      <OpenApiServerConfig />
    </SessionProvider>
  )
}
