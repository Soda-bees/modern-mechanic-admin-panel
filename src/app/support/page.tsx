"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { useRouter } from "next/navigation";


export default function Support() {
    const router = useRouter();

    return (
        <ProtectedRoute>
            <div className="w-full">
                <PageHeader title="Support" showFilter onFilterClick={() => alert('filter clicked!')} />
            </div>
        </ProtectedRoute>
    );
}
