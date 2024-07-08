'use server'

import { AuthError } from 'next-auth'
import { z } from 'zod'
import { signIn } from '@/auth'
import { ResultCode } from '@/lib/utils'


interface Result {
  type: string
  resultCode: ResultCode
}

export async function authenticate(
  _prevState: Result | undefined,
  formData: FormData,
): Promise<Result | undefined> {
  try {
    const username = formData.get('username')
    const password = formData.get('password')

    const parsedCredentials = z
      .object({
        username: z.string(),
        password: z.string().min(6),
      })
      .safeParse({
        username,
        password,
      })

    if (parsedCredentials.success) {
    await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      return {
        type: 'success',
        resultCode: ResultCode.UserLoggedIn,
      }
    } else {
      return {
        type: 'error',
        resultCode: ResultCode.InvalidCredentials,
      }
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            type: 'error',
            resultCode: ResultCode.InvalidCredentials,
          }
        default:
          return {
            type: 'error',
            resultCode: ResultCode.UnknownError,
          }
      }
    }
  }
}
