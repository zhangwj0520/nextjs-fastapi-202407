// import GitHub from 'next-auth/providers/github'
import type { JWT, NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { z } from 'zod'
import { LoginService } from './client'
import { setClientConfig } from '@/client/core/OpenAPI'
import type { User as UserType } from '@/client'

const openapiPage = [
  '/openapi.json',
  '/docs',
]

// Notice this is only an object, not a full Auth.js instance
export default {
  secret: process.env.AUTH_SECRET,
  basePath: '/auth',
  pages: {
    signIn: '/signIn',
    newUser: '/signup',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      // console.log('nextUrl', nextUrl)
      const isLoggedIn = !!auth?.user
      if (openapiPage.includes(nextUrl.pathname)) {
        return true
      }
      // oauth回调页面
      const isAuthPage = nextUrl.pathname.startsWith('/auth')
      if (isAuthPage) {
        return true
      }
      // 注册页面,登录页面
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')
      const isOnLoginPage = nextUrl.pathname.startsWith('/signIn')
      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/', nextUrl))
        }
        return true
      }

      if (isOnSignupPage) {
        return true
      }

      return false
    },
    async jwt({ token, user, account }) {
      if (account?.provider === 'credentials') {
        token.accessToken = user.access_token
      }
      if (user) {
        token.username = user.username
        token.accessToken = user.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      if (token) {
        const { username, image } = token
        const { user } = session

        session = { ...session, user: { ...user, username: username as string, image: image as string } }
      }
      return session
    },
  },
  providers: [
    // GitHub({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string().min(6),
            origin: z.string().optional(),
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data
          setClientConfig({
            BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
          })
          const res = await LoginService.postLoginApi({ requestBody: {
            username,
            password,
          } })
          if (!res)
            return Promise.resolve(null)

          return {
            ...res.user,
            name: res.user.name,
            access_token: res.access_token,
          }
        }

        return Promise.resolve(null)
      },
    }),
  ],
} satisfies NextAuthConfig

declare module 'next-auth' {
  interface User {
    name?: string | null
    email?: string | null
    username?: string
    disabled: boolean
    image?: string | null
    access_token?: string
  }
  interface Session {
    accessToken?: any
  }
  interface JWT {
    username?: string
    accessToken?: string
  }

}
