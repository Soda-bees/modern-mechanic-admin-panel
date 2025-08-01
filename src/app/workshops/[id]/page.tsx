// import ConformationModal from "@/component/conformationModal";
// import { customImageLoader } from "@/lib/imageLoader";
// import { handleGetWorkshopDetail } from "@/services/api";
// import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// export default async function WorkshopShowcase({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;

//   const workshop = await handleGetWorkshopDetail(id)

//   if (!workshop) {
//     return <div className="text-center mt-10">Workshop not found</div>;
//   }

//   return (
//     <div className="flex flex-col items-center px-4 py-6">
//       <div className="w-full max-w-5xl mb-4 ">
//         <div className="hidden sm:flex justify-start">
//           <div className="border p-1 rounded-xl w-24 border-borderGray">
//             <Link
//               href="/workshops"
//               className="text-base text-black font-semibold flex justify-center">
//               〱 Back
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row items-center w-full max-w-5xl mt-10">
//         <Image
//           loader={customImageLoader}
//           src={workshop.image}
//           alt="Workshop Logo"
//           width={300}
//           height={300}
//           className="border border-borderGray rounded-3xl mb-4 sm:mb-0 p-6 object-contain"
//         />

//         <div className="sm:ml-6 w-full sm:w-auto">
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
//             {workshop.name}
//           </h2>
//           <p>
//             Website:
//             <span className="font-semibold"> {workshop.website_link}</span>
//           </p>
//           <p>
//             Email:
//             <span className="font-semibold"> {workshop.email}</span>
//           </p>
//           <p>
//             Zipcode:
//             <span className="font-semibold"> {workshop.zipcode}</span>
//           </p>
//           <p>
//             Phone:
//             <span className="font-semibold"> {workshop.phone_number}</span>
//           </p>
//           <p>
//             Address:
//             <span className="font-semibold"> {workshop.address}</span>
//           </p>
//         </div>
//       </div>

//       <div className="mt-6 w-full max-w-5xl">
//         <h3 className="text-base font-medium text-black mb-1">
//           Short Description:
//         </h3>
//         <p className="text-lg font-semibold">{workshop.description}</p>
//       </div>

//       <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-6 border-t border-borderGray w-full max-w-5xl pt-4">
//         <button className="flex items-center px-4 py-2 rounded-lg border border-borderGray w-auto">
//           <PencilIcon className="h-4 w-4" />
//           <p className="text-black cursor-pointer ml-2 text-sm">Edit Shop</p>
//         </button>
//         <button className="flex items-center px-4 py-2 rounded-lg bg-orange w-auto cursor-pointer">
//           <TrashIcon className="h-4 w-4 text-white" />
//           <p className="text-white ml-2 text-sm">Delete</p>
//         </button>
//       </div>
//       <ConformationModal />
//     </div>

//   );
// }

import { handleGetWorkshopDetail } from "@/services/api";
import WorkshopDetailsClient from "./WorkshopDetailsClient";

export default async function WorkshopShowcase({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workshop = await handleGetWorkshopDetail(id);

  if (!workshop) {
    return <div className="text-center mt-10">Workshop not found</div>;
  }

  return <WorkshopDetailsClient workshop={workshop} />;
}


