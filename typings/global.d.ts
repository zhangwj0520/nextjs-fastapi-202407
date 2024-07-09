type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

interface Session {
  user?: {
    id: string
    usename: string
    email: string
    disabled:boolean
  }
}

interface AuthResult {
  type: string
  message: string
}
