// "use client";

// import ProtectedRoute from "@/component/ProtectedRoute";
// import PageHeader from "@/component/PageHeader";
// import { useRouter } from "next/navigation";


// export default function support() {
//     const router = useRouter();

//     return (
//         <ProtectedRoute>
//             <div className="w-full">
//                 <PageHeader title="Support" showFilter onFilterClick={() => alert('filter clicked!')} />
//             </div>
//         </ProtectedRoute>
//     );
// }


"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";

const dummyMessages = new Array(8).fill({
  date: "July 17, 2025",
  name: "Emily Richardson",
  email: "emilyrichardson@gmail.com",
  message:
    "I'm not satisfied with the scan results. The diagnostic indicated three issues with my engine, but my car was running perfectly fine before I brought it in.",
});

export default function Support() {
  return (
    <ProtectedRoute>
      <div className="px-4">
        <PageHeader title="Support" showFilter={false} />

        <p className="text-sm text-grey mt-2">
          Here’s what your users are saying. Stay ahead. Stay helpful.
        </p>

        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {dummyMessages.map((msg, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-4 shadow-sm text-left hover:shadow-md transition duration-200"
            >
              <p className="text-xs text-lightGrey">{msg.date}</p>
              <h2 className="text-xl font-semibold text-gray-800 mt-1">
                {msg.name}
              </h2>
              <p className="text-sm text-lightGrey mb-2 break-words">{msg.email}</p>

              <p className="text-sm text-lightGrey mb-1">Message</p>
              <p className="text-sm text-black break-words font-medium">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
