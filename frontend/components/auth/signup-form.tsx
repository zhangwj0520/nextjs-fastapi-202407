'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SignupButton } from './auth-buttom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { UserService } from '@/client'

const FormSchema = z.object({
  username: z.string().min(3, {
    message: '用户名至少3个字符',
  }),
  email: z.string().email({ message: '请输入正确的Email地址' }).trim(),
  password: z
    .string()
    .min(8, { message: '密码至少8个字符' })
    .regex(/[a-z]/i, { message: '至少包含一个字母' })
    .regex(/\d/, { message: '至少包含一个数字' })
    .regex(/[^a-z0-9]/i, {
      message: '至少包含一个特殊字符',
    })
    .trim(),
  confirmPassword: z
    .string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: 'custom',
      message: '两次输入的密码不一致',
      path: ['confirmPassword'],
    })
  }
})

export default function SignupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: 'zhangsan',
      password: 'Qwer1234@@',
      confirmPassword: 'Qwer1234@@',
      email: 'zhangwj0520@hotmail.com',
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await UserService.postCreateUserApi({
      requestBody: data,
    })
    console.log('res', res)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 space-y-3">
        <div className="w-full flex-1 rounded-lg border bg-white px-6 pb-4 pt-8 shadow-md md:w-96 dark:bg-zinc-950">
          <h1 className="mb-4 text-2xl font-bold">注册</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="" required>邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="" required>用户名</FormLabel>
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
                <FormLabel className="" required>密码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="" required>确认密码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SignupButton />
        </div>
        <Link
          href="/"
          className="flex flex-row gap-1 text-sm text-zinc-400"
        >
          已有账户
          {' '}
          <div className="font-semibold underline text-primary">登录</div>
        </Link>

      </form>
    </Form>
  )
}
