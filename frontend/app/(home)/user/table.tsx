import { UserTable } from './user-table'
import { UserService } from '@/client'

export async function Table({ skip, take }: { q: string, skip: number, take: number }) {
  const { list, total, newSikp } = await UserService.getListUsersApi({
    skip,
    take,
  })

  return (
    <UserTable
      users={list}
      skip={newSikp ?? 0}
      take={Number(take) ?? 0}
      total={total}
    />
  )
}
