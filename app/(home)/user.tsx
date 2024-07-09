import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation'

import { auth,signOut ,signIn} from '@/auth'
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';


export async function User() {

  const session = (await auth()) as Session

  if (!session) {
    redirect('/login')
  }
  let user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user?.usename}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <form
              action={async () => {
                'use server';
                await signOut({redirect:true,});
              }}
            >
              <button type="submit">登出</button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            {/* <Link href="/login">Sign In</Link> */}
            <form
            action={async () => {
              "use server"
              await signIn()
            }}
          >
               <button type="submit">Sign In</button>
    </form>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
