import { Chart } from './chart'
import { NetdiskService } from '@/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export async function Overview() {
  const res = await NetdiskService.getQiniuBucketOverviewApi()
  console.log('res', res)
  return (
    <div className="flex flex-col">
      <div className="flex gap-2 justify-between">
        <Card className="w-full">
          <CardHeader>
            <span className="text-gray-600 text-[14px]"> 存储总量</span>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-[24px]">{res.spaceSize}</span>
              <span className="ml-1 text-gray-500">MB</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <span className="text-gray-600 text-[14px]">文件个数</span>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-[24px]">{res.fileCount}</span>
              <span className="ml-1 text-gray-500">个</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <span className="text-gray-600 text-[14px]">下载流量</span>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-[24px]">{res.flowSize}</span>
              <span className="ml-1 text-gray-500">Bytes</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <span className="text-gray-600 text-[14px]">GET请求次数</span>
          </CardHeader>
          <CardContent>
            <div>
              <span className="text-[24px]">{res.hits}</span>
              <span className="ml-1 text-gray-500">个</span>
            </div>
          </CardContent>
        </Card>

      </div>
      <Chart />
    </div>
  )
}
