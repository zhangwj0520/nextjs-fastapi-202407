import { Title } from './title'
import { NetdiskService } from '@/client'

export default async function UserPage({
  searchParams,
}: {
  searchParams: { prefix: string }
}) {
  const prefix = searchParams.prefix ?? ''
  const res = await NetdiskService.getListFilesApi({ prefix })
  console.log('res', res)
  return (
    <div className="bg-card rounded-lg">
      <div className="flex justify-between border-b py-4 mx-4">
        <Title />
        <div>222</div>

      </div>
    </div>
  )
}
