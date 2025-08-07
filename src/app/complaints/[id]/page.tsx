import ComplaintDetailclient from "./complaintDetail";

export default async function SingleComplaint({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ComplaintDetailclient id={id} />
}
