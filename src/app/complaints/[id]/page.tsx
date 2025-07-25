export async function generateStaticParams() {
  // Example: return all possible IDs
  const ids = Array.from({ length: 10 }, (_, i) => (i + 1).toString()); // ideally fetch from an API or database
  return ids.map((id) => ({ id }));
}

export default async function SingleComplaint({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <div>My Post: {id}</div>
}