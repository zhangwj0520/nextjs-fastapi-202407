import GeneratingText from './text'
import GeneratingStreamText from './steam-text'
import GeneratingObject from './object'
import GeneratingStreamObject from './stream-object'
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
          <CardTitle>Generating Text</CardTitle>
          <CardDescription>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://sdk.vercel.ai/examples/next-app/basics/generating-text#generate-text"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              生成文本
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GeneratingText />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stream Text Generation</CardTitle>
          <CardDescription>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://sdk.vercel.ai/examples/next-app/basics/streaming-text-generation"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              流文本生成
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GeneratingStreamText />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>结构化数据</CardTitle>
          <CardDescription>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://sdk.vercel.ai/examples/next-app/basics/streaming-text-generation"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              对象生成
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GeneratingObject />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>流对象生成</CardTitle>
          <CardDescription>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://sdk.vercel.ai/examples/next-app/basics/streaming-object-generation"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              streaming object generation
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GeneratingStreamObject />
        </CardContent>
      </Card>
    </div>
  )
}
