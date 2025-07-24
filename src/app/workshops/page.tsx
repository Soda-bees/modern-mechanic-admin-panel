"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddWorkshopModal from "./add/page";


export default function workshops() {
  const router = useRouter();
  const pathname = usePathname()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(pathname === '/workshops/add')
  }, [pathname])

  return (
    <ProtectedRoute>
      <div className="w-full">
        <PageHeader title="Workshops" showFilter
        // onFilterClick={() => alert('filter clicked!')} 
        />
        <Link href="/workshops/add">Add Workshop</Link>
        {showModal && (
          <AddWorkshopModal />
        )}
      </div>
    </ProtectedRoute>
  );
}

