import { File, PlusCircle } from 'lucide-react'

import { toast } from 'sonner'
import { UserList } from './user-list'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
// import { ProductsTable } from './products-table';

// import { OpenAPI, setClientConfig } from '@/client/core/OpenAPI'

// OpenAPI.interceptors.response.use(async (req) => {
//   if (req.status === 400) {
//     const res = await req.clone().json()
//     toast.error(res.detail)
//   }
//   return req
// })
// setClientConfig({
//   BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
//   TOKEN: () => {
//     return Promise.resolve('11111')
//     // return Promise.resolve(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
//   },
// })

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

        {/* <div>1111</div> */}
        <UserList />
        {/* <ProductsTable
          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        /> */}
      </TabsContent>
    </Tabs>
  )
}
