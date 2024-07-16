'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import LoginButton from './login-buttom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const FormSchema = z.object({
  username: z.string().min(3, {
    message: '用户名至少3个字符',
  }),
  password: z.string().min(5, {
    message: '密码至少5个字符',
  }),
  email: z.string().email({ message: '请输入正确的Email地址' }).trim(),
})

export default function SignupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 space-y-3">
        <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md md:w-96 dark:bg-zinc-950">
          <h1 className="mb-3 text-2xl font-bold">注册</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="">邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel className="">用户名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">密码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-zinc-400"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border bg-zinc-50 px-2 py-[9px] text-sm outline-none placeholder:text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950"
                  id="email"
                  type="email"
                  name="email"
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
          </div> */}
          <LoginButton />
          {/* <Button type="submit" className="w-full">Submit</Button> */}
        </div>

      </form>
    </Form>
  )
}
