export default async function DocumentPage(
  props: {
    searchParams: Promise<{ q: string, skip: string, take: string }>
  },
) {
  const searchParams = await props.searchParams
  return (
    <div>DocumentPage</div>
  )
}
