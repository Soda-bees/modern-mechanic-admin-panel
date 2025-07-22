// export default function workshops() {
//     return <div className="text-2xl font-bold ">This is the workshops</div>;
// }

"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { useRouter } from "next/navigation";


export default function workshops() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="w-full">
        <PageHeader title="Workshops" showFilter onFilterClick={() => alert('filter clicked!')} />
      </div>
    </ProtectedRoute>
  );
}
