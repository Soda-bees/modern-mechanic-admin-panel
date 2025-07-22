"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function ScanResults() {
    const router = useRouter();
    const { logout } = useAuth();

    return (
        <ProtectedRoute>
            <div className="w-full">
                <PageHeader title="Scans" showFilter onFilterClick={() => alert('filter clicked!')} />
            </div>
        </ProtectedRoute>
    );
}
