import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'
import { columns } from './columns'
import { DataTable } from './data-table'

import type { Person } from './make-data'
import { fetchData } from './make-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FakerService } from '@/client'

async function getData({ pageIndex, pageSize }: PaginationState) {
  return await FakerService.getFakerUserListApi({ pageIndex, pageSize })
}
// export async function getStaticProps(context) {
//   const { pageIndex, pageSize } = context.params

//   const { rows, rowCount } = await fetchData({ pageIndex, pageSize })

//   return {
//     props: {
//       data: rows,
//       rowCount,
//     },
//   }
// }

export default async function DataTableDemo(
  props: {
    searchParams: Promise<{ q: string, pageIndex: string, pageSize: string }>
  },
) {
  const searchParams = await props.searchParams
  // props: {"params":{},"searchParams":{}}

  const queryClient = new QueryClient()

  const search = searchParams.q ?? ''
  const pageIndex = Number(searchParams.pageIndex ?? 0)
  const pageSize = Number(searchParams.pageSize ?? 10)
  // const dataQuery = await getData({ pageIndex, pageSize })

  await queryClient.prefetchQuery({
    queryKey: ['data-table'],
    queryFn: () => FakerService.getFakerUserListApi({ pageIndex, pageSize }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Card>
        <CardHeader>
          <CardTitle>Data Table</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable />
        </CardContent>
      </Card>
    </HydrationBoundary>

  )
}
