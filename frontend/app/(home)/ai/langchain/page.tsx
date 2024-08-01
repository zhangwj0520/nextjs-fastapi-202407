import Chat from '@/components/ai/chat'

export default async function LangChainPage() {
  return (
    <div className="w-full min-w-[600px] flex flex-col gap-4">
      <p className="text-[28px] text-center font-medium">
        Generative UI with
        <a
          href="https://github.com/langchain-ai/langchainjs"
          target="blank"
          className="text-blue-600 hover:underline hover:underline-offset-2"
        >
          LangChain Python 🦜🔗
        </a>
      </p>
      <Chat />
    </div>
  )
}
