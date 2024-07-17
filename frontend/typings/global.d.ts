type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

interface AuthResult {
  type: string
  message: string
}
