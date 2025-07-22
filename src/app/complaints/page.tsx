"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { useRouter } from "next/navigation";


export default function complaints() {
    const router = useRouter();

    return (
        <ProtectedRoute>
            <div className="w-full">
                <PageHeader title="Complaints" showFilter onFilterClick={() => alert('filter clicked!')} />
            </div>
        </ProtectedRoute>
    );
}
