import Link from 'next/link'

import { signIn } from '@/auth'

export default function LoginForm() {
  return (
    <form
      action={async (formData) => {
        'use server'
        const username = formData.get('username')
        const password = formData.get('password')
        await signIn('credentials', {
          username,
          password,
          // redirect: true,
          redirectTo: '/',
        })
      }}
      className="flex flex-col items-center gap-4 space-y-3"
    >
      <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md  md:w-96 dark:bg-zinc-950">
        <h1 className="mb-3 text-2xl font-bold">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="email"
            >
              用户名
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="username"
                name="username"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
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
        No account yet?
        {' '}
        <div className="font-semibold underline">Sign up</div>
      </Link>
    </form>
  )
}

function LoginButton() {
  return (
    <button
      className="my-4 flex h-10 w-full flex-row items-center justify-center rounded-md bg-zinc-900 p-2 text-sm font-semibold text-zinc-100 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      // aria-disabled={pending}
    >
      登录
      {/* {pending ? <span className="icon-svg-spinners:6-dots-scale-middle" /> : 'Log in'} */}
    </button>
  )
}
