import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { auth, providerMap, signIn } from '@/auth'
import LoginForm from '@/components/c-ui/login-form'
import { Button } from '@/components/ui/button'

console.log('providerMap', providerMap)

export default async function LoginPage() {
  // https://authjs.dev/getting-started/session-management/get-session
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
      {/* <LoginFormServer /> */}

      <div className="">
        <form
          action={async () => {
            'use server'
            try {
              await signIn('github')
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                console.log('errors', error)
                // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
              }

              // Otherwise if a redirects happens NextJS can handle it
              // so you can just re-thrown the error and let NextJS handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <Button>使用GitHub登录</Button>
        </form>
      </div>
    </main>
  )
}
