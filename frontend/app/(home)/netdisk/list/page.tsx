import { redirect } from 'next/navigation'
import { NetdiskTable } from './table'

import { Icon } from '@/components/icon'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default async function UserPage(
  props: {
    searchParams: Promise<{ prefix: string }>
  },
) {
  const searchParams = await props.searchParams
  const prefix = searchParams.prefix ?? ''
  const pathList = prefix.split('/').filter(Boolean)
  return (
    <div className="bg-card rounded-lg">
      <div className="border-b py-4 mx-4">
        <div className="flex items-center">
          <Icon name="ant-design:folder-outlined" className="text-16 mr-2"></Icon>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <form
                  action={async () => {
                    'use server'
                    redirect(`/netdisk/list`)
                  }}
                  className="w-full"
                >
                  <button
                    type="submit"
                    className="text-primary"
                  >
                    根目录
                    {/* <div className="text-primary hover:cursor-pointer hover:bg-gray-100 m-1"></div> */}
                  </button>
                </form>
              </BreadcrumbItem>
              {pathList.map((item, index) => (
                <span className="flex items-center" key={item}>
                  <BreadcrumbSeparator className="mr-2" />
                  <BreadcrumbItem>
                    {index === pathList.length - 1
                      ? (
                          <span>
                            {item}
                          </span>
                        )
                      : (
                          <form
                            action={async () => {
                              'use server'
                              const path = pathList.slice(0, index + 1).map(item => `${item}/`).join()
                              redirect(`/netdisk/list?prefix=${path}`)
                            }}
                            className="w-full"
                          >
                            <button
                              type="submit"
                              className="text-primary"
                            >
                              {item}
                            </button>
                          </form>
                        )}
                  </BreadcrumbItem>
                </span>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <NetdiskTable prefix={prefix} />
      </div>
    </div>
  )
}
