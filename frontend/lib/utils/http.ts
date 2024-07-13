export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export async function handlerResponseSuccess<T>(data: T, message = 'success', code = 200) {
  return Response.json({ code, data, message })
  // return Response.json({ result }, {
  //   status: 201,
  //   headers: { 'Set-Cookie': `token=111111` },
  // })
}
export async function handlerResponseError<T>(data: T, message = '未知错误!') {
  return Response.json({ code: 9999, data, message })
  // return Response.json({ result }, {
  //   status: 201,
  //   headers: { 'Set-Cookie': `token=111111` },
  // })
}

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN',
}

export function getMessageFromCode(resultCode: string) {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!'
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!'
    case ResultCode.UserAlreadyExists:
      return '用户已存在,请登录!'
    case ResultCode.UserCreated:
      return '用户创建成功!'
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!'
    case ResultCode.UserLoggedIn:
      return '登录成功!'
  }
}
