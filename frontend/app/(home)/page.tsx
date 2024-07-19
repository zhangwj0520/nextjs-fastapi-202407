import { File, PlusCircle } from 'lucide-react'

import { toast } from 'sonner'
import { UserList } from './user-list'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q: string, offset: string }
}) {
  const search = searchParams.q ?? ''
  const offset = searchParams.offset ?? 0
  // const { products, newOffset, totalProducts } = await getProducts(
  //   search,
  //   Number(offset)
  // );

  return (
    <div className="bg-card">
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

          {/* <div className="h-[500px] bg-red-300">1111</div>
          <div className="h-[500px] bg-green-400">1111</div> */}
          {/* <UserList /> */}
          {/* <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        /> */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
