import GitHub from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { z } from 'zod'
import { LoginService } from './client'
import { OpenAPI, setClientConfig } from '@/client/core/OpenAPI'

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
      // const isApiPage = nextUrl.pathname.startsWith('/api')
      // if (isApiPage) {
      //   return true
      // }

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
    // async jwt({ token, user }) {
    //   if (user) {
    //     token = { ...token, id: user.id }
    //   }

    //   return token
    // },
    async jwt({ token, trigger, session, user, account }) {
      // console.log('account', account)
      // if (account?.provider === "my-provider") {
      //   return { ...token, accessToken: account.access_token }
      // }

      if (user) {
        token = { ...token, id: user.id }
      }
      if (trigger === 'update')
        token.name = session.user.name
      return token
    },
    async session({ session, token }) {
      // console.log('session, token', session, token)
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      if (token) {
        const { id } = token as { id: string }
        const { user } = session

        session = { ...session, user: { ...user, id } }
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
          console.log('user111', res)
          if (!res)
            return Promise.resolve(null)

          return {
            ...res.user,
            name: res.username,
            id: res.id,
            access_token: res.access_token,
          }
        }

        return Promise.resolve(null)
      },
    }),
  ],
} satisfies NextAuthConfig

declare module 'next-auth' {
  interface Session {
    accessToken?: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
