import QueryDetailclient from "./queryDetail";

export default async function SingleQuerie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <QueryDetailclient id={id} />

}
