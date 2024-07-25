import { columns } from './columns'
import { DataTable } from './data-table'

import type { Person } from './make-data'
import { makeData } from './make-data'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

async function getData(): Promise<Person[]> {
  return makeData(20)
}
export default async function ButtonDemo() {
  const data = await getData()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Table</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} rowCount={1000} />
      </CardContent>
    </Card>

  )
}
