import GitHub from 'next-auth/providers/github'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { z } from 'zod'
import { LoginService } from './client'

// Notice this is only an object, not a full Auth.js instance
export default {
  secret: process.env.AUTH_SECRET,
  basePath: '/auth',
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      // oauth回调页面
      const isAuthPage = nextUrl.pathname.startsWith('/auth')
      if (isAuthPage) {
        return true
      }
      // 注册页面,登录页面
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
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
    async jwt({ token, trigger, session, user }) {
      if (user) {
        token = { ...token, id: user.id }
      }
      if (trigger === 'update')
        token.name = session.user.name
      return token
    },
    async session(config) {
      let { session, token } = config
      if (token) {
        const { id } = token as { id: string }
        const { user } = session

        session = { ...session, user: { ...user, id } }
      }

      return session
    },
  },
  providers: [GitHub({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET }), Credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({
          username: z.string(),
          password: z.string().min(6),
        })
        .safeParse(credentials)

      if (parsedCredentials.success) {
        const { username, password } = parsedCredentials.data
        const user = await LoginService.postLoginApi({ requestBody: {
          username,
          password,
        } })

        if (!user)
          return Promise.resolve(null)

        return {
          ...user,
          name: user.username,
          id: `${user.id}`,
        }
      }

      return Promise.resolve(null)
    },
  })],
} satisfies NextAuthConfig
