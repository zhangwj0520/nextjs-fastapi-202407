'use client'

import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { toast } from 'sonner'
import { redirect, useRouter } from 'next/navigation'
import { getMessageFromCode } from '@/lib/utils'
import { authenticate } from '@/app/signIn/actions'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
  const router = useRouter()
  const [result, dispatch] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        toast.success(getMessageFromCode(result.resultCode))
        // router.refresh()
        redirect('/')
      }
    }
  }, [result, router])

  return (
    <form
      action={dispatch}
      className="flex flex-col items-center gap-4 space-y-3"
    >
      <input
        className="hidden"
        id="origin"
        name="origin"
        defaultValue={location.origin}
      />

      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96 dark:bg-zinc-950">
        <h1 className="mb-3 text-2xl font-bold">请登录</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
            >
              用户名
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="username"
                name="username"
                defaultValue="zhangsan"
                placeholder="请输入"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="password"
            >
              密码
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="password"
                type="password"
                name="password"
                defaultValue="Qwer1234@@"
                placeholder="请输入"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />
      </div>

      <Link
        href="/signup"
        className="flex flex-row gap-1 text-sm text-zinc-400"
      >
        还没有账户
        {' '}
        <div className="font-semibold underline text-primary">注册</div>
      </Link>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      className="my-4 flex h-10 w-full"
      aria-disabled={pending}
    >
      {pending && <span className="icon-[svg-spinners--6-dots-scale-middle] mr-2" /> }
      登录
    </Button>
  )
}
