import { EndpointsContext } from './agent'

export default function LangChainLayput({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EndpointsContext>{children}</EndpointsContext>
  )
}
