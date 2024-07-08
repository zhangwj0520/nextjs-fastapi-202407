import { redirect } from 'next/navigation'
import SignupForm from '@/components/c-ui/signup-form'
import { auth } from '@/auth'

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    console.log('session', session)
    redirect('/')
  }
  return (
    <main className="flex flex-col p-4">
      <SignupForm />
    </main>
  )
}
