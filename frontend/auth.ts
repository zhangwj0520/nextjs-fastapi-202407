import NextAuth from 'next-auth'
import authConfig from './auth.config'

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: { strategy: 'jwt' },
  ...authConfig,
})

// next demo
// https://github.com/nextauthjs/next-auth-example
