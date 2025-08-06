
import ScanDetailclient from "./scanDetail";

export default async function SingleScanResult({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ScanDetailclient id={id} />
}
