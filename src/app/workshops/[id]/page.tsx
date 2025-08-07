import { handleGetWorkshopDetail } from "@/services/api";
import WorkshopDetailsClient from "./WorkshopDetailsClient";

export default async function WorkshopShowcase({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // const workshop = await handleGetWorkshopDetail(id);

  // if (!workshop) {
  //   return <div className="text-center mt-10">Workshop not found</div>;
  // }

  return <WorkshopDetailsClient id={id} />;
}


