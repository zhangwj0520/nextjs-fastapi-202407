import { redirect } from 'next/navigation'
import SignupForm from '@/components/auth/signup-form'
import { auth, signOut } from '@/auth'
import { Button } from '@/components/ui/button'

export default async function Signout() {
  // const session = await auth()

  return (
    <main className="h-screen w-screen pt-[25vh]">
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
        className="flex flex-col items-center gap-4 space-y-3"
      >

        <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96 dark:bg-zinc-950 flex items-center flex-col">
          {/* <h1 className="mb-3 text-2xl font-bold">请登录</h1> */}
          <p>接口鉴权失败,请重新登陆</p>
          <Button
            className="my-4 flex h-10 w-full mt-10"
          >
            登录
          </Button>
        </div>

      </form>
    </main>
  )
}
