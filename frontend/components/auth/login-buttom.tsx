'use client'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      className="my-4 flex w-full"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? <span className="icon-svg-spinners:6-dots-scale-middle" /> : '登录'}
    </Button>
  )
}
