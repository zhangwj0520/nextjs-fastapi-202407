'use server'

import { z } from 'zod'
import { AuthError } from 'next-auth'
// import { getUser } from '../login/actions'
// import prisma from '@/lib/prisma'
import { ResultCode, getStringFromBuffer } from '@/lib/utils'
import { signIn } from '@/auth'

export async function createUser(
  email: string,
  hashedPassword: string,
  salt: string,
) {
  // const existingUser = await getUser(email)

  if (existingUser) {
    return {
      type: 'error',
      resultCode: ResultCode.UserAlreadyExists,
    }
  } else {
    // await prisma.user.create({
    //   data: {
    //     email,
    //     password: hashedPassword,
    //     salt,
    //   },
    // })
    return {
      type: 'success',
      resultCode: ResultCode.UserCreated,
    }
  }
}

interface Result {
  type: string
  resultCode: ResultCode
  detail?: z.ZodIssue[]
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData,
): Promise<Result | undefined> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsedCredentials = z
    .object({
      email: z.string().email({ message: '请输入正确的Email地址' }).trim(),
      password: z.string().min(6),
      // password: z
      //   .string()
      //   .min(8, { message: 'Be at least 8 characters long' })
      //   .regex(/[a-z]/i, { message: 'Contain at least one letter.' })
      //   .regex(/\d/, { message: 'Contain at least one number.' })
      //   .regex(/[^a-z0-9]/i, {
      //     message: 'Contain at least one special character.',
      //   })
      //   .trim(),
    })
    .safeParse({
      email,
      password,
    })

  if (parsedCredentials.success) {
    const salt = crypto.randomUUID()

    const encoder = new TextEncoder()
    const saltedPassword = encoder.encode(password + salt)
    const hashedPasswordBuffer = await crypto.subtle.digest(
      'SHA-256',
      saltedPassword,
    )
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

    try {
      const result = await createUser(email, hashedPassword, salt)

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
      }

      return result
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
      } else {
        return {
          type: 'error',
          resultCode: ResultCode.UnknownError,
        }
      }
    }
  } else {
    console.log('parsedCredentials.success', parsedCredentials.success)
    return {
      type: 'error',
      resultCode: ResultCode.InvalidCredentials,
      detail: parsedCredentials.error.issues,
    }
  }
}
