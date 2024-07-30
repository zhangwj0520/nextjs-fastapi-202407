import { redirect } from 'next/navigation'
import LoginForm from '@/components/auth/login-form'
import { auth } from '@/auth'

export default async function LoginPage() {
  // https://authjs.dev/getting-started/session-management/get-session
  const session = await auth()

  if (session) {
    redirect('/')
  }

  return (
    <main className="h-screen w-screen mt-[25vh]">
      <LoginForm />
      {/* <LoginFormServer /> */}
    </main>
  )
}
