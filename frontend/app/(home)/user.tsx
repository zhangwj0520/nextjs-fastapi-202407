import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

import { auth } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@/components/auth-components'

export async function User() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          {/* <Image
            src={
              session?.user?.image
              ?? '/placeholder-user.jpg'
            }
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          /> */}
          <img
            src={
              session?.user?.image
              ?? 'placeholder-user.jpg'
            }
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session?.user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>用户信息</DropdownMenuItem>
        <DropdownMenuItem>设置</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
