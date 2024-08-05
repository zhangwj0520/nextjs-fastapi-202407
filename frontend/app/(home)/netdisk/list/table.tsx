import { MoreHorizontal } from 'lucide-react'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NetdiskService } from '@/client'

export async function NetdiskTable({ prefix }: { prefix: string }) {
  const list = await NetdiskService.getListFilesApi({ prefix })

  return (
    <Table className="mt-4">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">文件名</TableHead>
          <TableHead>大小</TableHead>
          <TableHead>上传时间</TableHead>
          <TableHead className="text-right">
            <span className="sr-only">操作</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(item => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">

              {item.type === 'dir'
                ? (
                    <form
                      action={async () => {
                        'use server'
                        redirect(`/netdisk/list?prefix=${item.path}`)
                      }}
                      className="w-full"
                    >
                      <button
                        type="submit"
                        className="text-primary"
                      >
                        {item.name}
                      </button>
                    </form>
                  )
                : <span>{item.name}</span>}
            </TableCell>
            <TableCell>
              {item.fsize ? `${item.fsize} KB` : '-'}
            </TableCell>
            <TableCell>{dayjs(item.putTime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
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
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
