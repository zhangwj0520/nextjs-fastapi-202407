type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

interface Session {
  user: {
    id: string
    email: string
  }
}

interface AuthResult {
  type: string
  message: string
}
