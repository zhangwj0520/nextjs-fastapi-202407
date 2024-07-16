// 'use server'

import { UserService } from '../../client'

export async function getUserList(): Promise<any> {
  const list = await UserService.getListUsersApi()
  console.log('list', list)
  return list
}
