export default async function SingleScanResulf({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params
    return <div>My scan result: {id}</div>
  }