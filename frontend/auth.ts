import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import type { Provider } from 'next-auth/providers'

import { z } from 'zod'
import type { NextAuthConfig } from 'next-auth'
import { LoginService } from './client'

// process.env.NEXTAUTH_URL = 'http://localhost:9100'
// process.env.AUTH_GITHUB_ID = 'Ov23litnOdDyW03DniYK'
// process.env.AUTH_GITHUB_SECRET = '579bf2b4409050b2cd1dd50ffefe8b7660197da5'
console.log('process.env', process.env)
const providers: Provider[] = [
  GitHub({ clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET }),
  Credentials({
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
  }),
]

const authConfig = {
  secret: process.env.AUTH_SECRET,
  basePath: '/auth',
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isAuthPage = nextUrl.pathname.startsWith('/auth')
      if (isAuthPage) {
        return true
      }
      if (!auth?.user) {
        return false
      }
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/', nextUrl))
        }
      }

      return true
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
  providers,
} satisfies NextAuthConfig

export const providerMap = providers.map((provider) => {
  if (typeof provider === 'function') {
    const providerData = provider()
    return { id: providerData.id, name: providerData.name }
  } else {
    return { id: provider.id, name: provider.name }
  }
})
export const { auth, signIn, signOut, handlers } = NextAuth(authConfig)
