"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { useRouter } from "next/navigation";


export default function UsersManagement() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="w-full">
        <PageHeader title="Users Management" showFilter onFilterClick={() => alert('filter clicked!')} />
      </div>
    </ProtectedRoute>
  );
}
