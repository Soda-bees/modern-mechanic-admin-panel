"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="w-full">
        <PageHeader title="Overview" showFilter={false} onFilterClick={() => alert('filter clicked!')}/>
          <div onClick={logout}>
            logout
          </div>
      </div>
    </ProtectedRoute>
  );
}
