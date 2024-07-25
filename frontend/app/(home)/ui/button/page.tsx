import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icon'

export default function ButtonDemo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Button</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Button>Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="outline" size="icon">
            <Icon name="radix-icons:chevron-right" className="h-4 w-4" />
          </Button>

          <Button disabled>Button</Button>
        </div>

      </CardContent>
    </Card>

  )
}
