export default async function UserPage(
  props: {
    searchParams: Promise<{ q: string, skip: string, take: string }>
  },
) {
  const searchParams = await props.searchParams
  return (
    <div>promission</div>
  )
}
