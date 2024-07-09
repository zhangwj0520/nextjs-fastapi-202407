import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import LoginForm from '@/components/c-ui/login-form'
import LoginFormServer from '@/components/c-ui/login-form-server'

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
    </main>
  )
}
