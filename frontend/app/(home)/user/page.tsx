import { File, PlusCircle } from 'lucide-react'
import { UserTable } from './user-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { UserService } from '@/client'

export default async function UserPage({
  searchParams,
}: {
  searchParams: { q: string, skip: string, take: string }
}) {
  const search = searchParams.q ?? ''
  const skip = searchParams.skip ?? 0
  const take = searchParams.take ?? 3
  // const { list, total, newOffset } = await getUserList()
  // const { list, total, newSikp } = await UserService.getListUsersApi({
  //   take: 3,
  //   skip: Number(skip),
  // })

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        {/* <UserTable
          users={list}
          skip={newSikp ?? 0}
          take={Number(take) ?? 0}
          total={total}
        /> */}
      </TabsContent>
    </Tabs>
  )
}
