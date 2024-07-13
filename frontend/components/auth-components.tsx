import { Button } from './ui/button'
import { signIn, signOut } from '@/auth'

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn(provider)
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
      className="w-full"
    >
      <button type="submit">登出</button>
    </form>
  )
}
