// 'use client'
import { Icon } from '@/components/icon'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export function Title({ prefix }: { prefix: string }) {
  const pathList = prefix.split('/').filter(Boolean)
  console.log('pathList', pathList)
  return (
    <div className="flex items-center">
      <Icon name="ant-design:folder-outlined" className="text-16 mr-2"></Icon>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {/* <BreadcrumbLink href="/netdisk-list">根目录</BreadcrumbLink> */}
            <div className="text-primary hover:cursor-pointer hover:bg-gray-100 m-1">根目录</div>
          </BreadcrumbItem>
          {pathList.map((item, index) => (
            <span className="flex items-center" key={item}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* <BreadcrumbLink href={`/netdisk-list?prefix=${pathList.slice(index).join('/')}`}>{item}</BreadcrumbLink> */}
                <span className="text-primary hover:cursor-pointer hover:bg-gray-100 p-1">{item}</span>
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
