type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

interface Session {
  user?: {
    id: string
    name: string
    email: string
    disabled: boolean
    image: string
  }
}

interface AuthResult {
  type: string
  message: string
}
