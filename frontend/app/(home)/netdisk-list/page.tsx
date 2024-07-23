import { Icon } from '@/components/icon'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export default async function UserPage({
  searchParams,
}: {
  searchParams: { q: string, skip: string, take: string }
}) {
  return (
    <div className="bg-card rounded-lg">
      <div className="flex justify-between border-b py-4 mx-4">
        <div className="flex items-center">
          <Icon name="ant-design:folder-outlined" className="text-16 mr-2"></Icon>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                {/* <BreadcrumbLink href="/">Home</BreadcrumbLink> */}
                <div className="text-primary hover:cursor-pointer hover:bg-gray-100 m-1">根目录</div>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <div className="text-primary hover:cursor-pointer hover:bg-gray-100 p-1">Components</div>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div>222</div>

      </div>
    </div>
  )
}
