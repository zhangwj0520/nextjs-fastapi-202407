import { redirect } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { User } from './user'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { UserWihoutPassword } from '@/client'

export function UserTable({
  users,
  skip,
  take,
  total,
}: {
  users: UserWihoutPassword[]
  skip: number
  take: number
  total: number
}) {
  async function prevPage() {
    'use server'
    const newSikp = skip - 2 * take
    if (newSikp <= 0) {
      redirect(`/user`)
    } else {
      redirect(`/user?skip=${newSikp}`)
    }
  }

  async function nextPage() {
    'use server'
    redirect(`/user?skip=${skip}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>用户列表</CardTitle>
        <CardDescription>
          管理用户
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="hidden md:table-cell">邮箱</TableHead>
              <TableHead className="hidden md:table-cell">
                创建时间
              </TableHead>
              <TableHead>
                <span className="sr-only">操作</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <User key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            共
            <strong>{total}</strong>
            条数据
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={skip - take <= 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={skip >= total}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
