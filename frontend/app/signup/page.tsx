import { redirect } from 'next/navigation'
import SignupForm from '@/components/auth/signup-form'
import { auth } from '@/auth'

export default async function SignupPage() {
  const session = await auth()

  if (session) {
    redirect('/')
  }
  return (
    <main className="h-screen w-screen pt-[25vh]">
      <SignupForm />
    </main>
  )
}
