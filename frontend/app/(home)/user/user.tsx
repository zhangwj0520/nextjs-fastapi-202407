import Image from 'next/image'
import { MoreHorizontal } from 'lucide-react'
// import { deleteUser } from './actions'
// import { redirect, useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import type { UserWihoutPassword } from '@/client'
import { UserService } from '@/client'

export function User({ user }: { user: UserWihoutPassword }) {
  // const router = useRouter()
  async function handleDeleteUser() {
    console.log('handleDeleteUser', user)
    const res = await UserService.deleteDeleteUserApi({
      userId: user.id,
    })
    // router.refresh()
    console.log('res', res)
  }
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={user.image || 'https://avatars.githubusercontent.com/u/60835477?v=4'}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{user.username}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {user.disabled ? '禁用' : '激活'}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
      <TableCell className="hidden md:table-cell">
        {user.createdAt}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              {/* <form action={handleDeleteUser}>
                <button type="submit">Delete</button>
              </form> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}
