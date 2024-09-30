import Demo from './stream'
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
          <CardTitle>千问</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <Demo />
        </CardContent>
      </Card>
    </div>
  )
}
