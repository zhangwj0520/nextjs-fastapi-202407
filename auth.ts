import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import type { Provider } from 'next-auth/providers'

import { z } from 'zod'
import type { NextAuthConfig } from 'next-auth'
import { LoginService } from './client'

const providers: Provider[] = [
  GitHub({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }),
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
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
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
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, id: user.id }
      }

      return token
    },
    async session({ session, token }) {
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
