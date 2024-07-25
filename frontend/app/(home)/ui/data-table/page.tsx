import {
  QueryClient,
  QueryClientProvider,
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

async function getData({ pageIndex, pageSize }: PaginationState) {
  return await fetchData({ pageIndex, pageSize })
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

export default async function DataTableDemo({
  searchParams,
}: {
  searchParams: { q: string, pageIndex: string, pageSize: string }
}) {
  // props: {"params":{},"searchParams":{}}

  const search = searchParams.q ?? ''
  const pageIndex = Number(searchParams.pageIndex ?? 0)
  const pageSize = Number(searchParams.pageSize ?? 10)
  const dataQuery = await getData({ pageIndex, pageSize })

  // const dataQuery = useQuery({
  //   queryKey: ['data', pageIndex, pageSize],
  //   queryFn: () => fetchData({
  //     pageIndex,
  //     pageSize,
  //   }),
  //   placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  // })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Table</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={dataQuery?.rows || []}
          rowCount={dataQuery?.rowCount}
          // pagination={{
          //   pageIndex,
          //   pageSize,
          // }}
        />
      </CardContent>
    </Card>

  )
}
