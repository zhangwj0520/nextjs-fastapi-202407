import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { LoginService } from './client'

export const { auth, signIn, signOut, handlers } = NextAuth({
  // ...authConfig,
  providers: [
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
          const user = await LoginService.postLoginApi({requestBody: {
            username,
            password
          }})

          if (!user)
            return Promise.resolve(null)

          return {
            ...user,
            name: user.username,
            id: "" + user.id
          }
        }

        return Promise.resolve(null)
      },
    }),
  ],
})
