// export default function workshops() {
//     return <div className="text-2xl font-bold ">This is the workshops</div>;
// }

// "use client";

// import ProtectedRoute from "@/component/ProtectedRoute";
// import PageHeader from "@/component/PageHeader";
// import { useRouter } from "next/navigation";

// export default function workshops() {
//   const router = useRouter();

//   return (
//     <ProtectedRoute>
//       <div className="w-full">
//         <PageHeader title="Workshops" showFilter onFilterClick={() => alert('filter clicked!')} />
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import Image from "next/image";
import { image } from "framer-motion/client";
import images from "@/services/images";

export default function Workshops() {
  const dummyWorkshops = Array(10).fill({
    name: "AutoFix Garage",
    website: "www.exampleworkshop.com",
    email: "info@workshop.com",
    zipcode: "90125",
    logo: images.workshopImage,
  });

  return (
    <ProtectedRoute>
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Workshops"
          showFilter
          addShowButton
          buttonTitle="+ Add Workshop"
          onFilterClick={() => alert("filter clicked!")}
        />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
          {dummyWorkshops.map((shop, index) => (
            <div
              key={index}
              className="bg-headerBG rounded-xl shadow-sm border border-gray-100 p-3 text-start"
            >
              <div className="bg-white w-full rounded-xl">
                <img
                  src={shop.logo}
                  alt="Workshop Logo"
                  className="w-full h-42 object-contain rounded-t-xl"
                />
              </div>
              <h3 className="mt-2 text-base sm:text-lg font-semibold text-black truncate">
                {shop.name}
              </h3>
              <p className="text-xs sm:text-sm text-black mt-1 font-semibold truncate">
                <span className="font-medium">Website:</span> {shop.website}
              </p>
              <p className="text-xs sm:text-sm text-black font-semibold truncate">
                <span className="font-medium">Email:</span> {shop.email}
              </p>
              <p className="text-xs sm:text-sm text-black mb-3 font-semibold truncate">
                <span className="font-medium">Zipcode:</span> {shop.zipcode}
              </p>
              <button className="text-black bg-white rounded-xl w-full py-3 text-xs sm:text-sm hover:bg-headerBG transition font-semibold">
                Shop Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
