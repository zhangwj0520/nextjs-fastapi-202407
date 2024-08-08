import TongyiDemo from './stream'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default async function VercelPage() {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>流对象生成</CardTitle>
        </CardHeader>
        <CardContent>
          <TongyiDemo />
        </CardContent>
      </Card>
    </div>
  )
}
