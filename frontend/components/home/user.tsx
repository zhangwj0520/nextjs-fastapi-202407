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
import FetchClientConfig from '@/components/fetch-config/client'
import { UserService } from '@/client'

export async function User() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }
  const res = await UserService.getReadUsersMeApi()
  // console.log('res', res)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Image
              src={
                session?.user?.image
                ?? '/images/avatar.png'
              }
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
            <span className="sr-only">const [state, dispatch] = useReducer(first, second, third)</span>
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
      <FetchClientConfig session={session} />
    </>
  )
}
