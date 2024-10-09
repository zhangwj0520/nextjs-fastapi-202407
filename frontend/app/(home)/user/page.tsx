import { File, PlusCircle } from 'lucide-react'
import { Table } from './table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export default async function UserPage(
  props: {
    searchParams: Promise<{ q: string, skip: string, take: string }>
  },
) {
  const searchParams = await props.searchParams

  const {
    q,
    skip,
    take,
  } = searchParams

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
        <Table q={q} skip={Number(skip || 0)} take={Number(take || 3)} />
      </TabsContent>
    </Tabs>
  )
}
