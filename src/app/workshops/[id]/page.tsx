import WorkshopDetailsClient from "./WorkshopDetailsClient";

export default async function WorkshopShowcase({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <WorkshopDetailsClient id={id} />;
}


