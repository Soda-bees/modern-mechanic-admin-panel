export async function generateStaticParams() {
  // Example: return all possible IDs
  const ids = Array.from({ length: 24 }, (_, i) => (i + 1).toString());// ideally fetch from an API or database
  return ids.map((id) => ({ id }));
}

export default async function SingleScanResulf({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params
    return <div>My scan result: {id}</div>
  }