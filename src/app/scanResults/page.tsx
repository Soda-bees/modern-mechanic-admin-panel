"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { useEffect, useState } from "react";
import images from "@/services/images";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";

type Scan = {
    id: number;
    vehicle: string;
    dtcCode: string;
    issue: string;
    urgency: string;
    urgencyColor: string;
    repairDifficulty: string;
    repairDifficultyColor: string;
    estimatedCost: string;
};

export default function Scanresults() {
    const { search } = useSearch()
    const [scans, setScans] = useState<Scan[]>([]);

    useEffect(() => {
        const data: Scan[] = Array(24)
            .fill(null)
            .map((_, i) => ({
                id: i + 1,
                vehicle: "Bugatti Chiron 2027",
                dtcCode: "P0025",
                issue: "Exhaust Variable Camshaft Timing (Bank 2)",
                urgency: "Soon",
                urgencyColor: "#F96D37",
                repairDifficulty: "Specialist",
                repairDifficultyColor: "#E22529",
                estimatedCost: "From $1,500 to $15,000+",
            }));
        setScans(data);
    }, []);

    const filteredScans = scans.filter((scan) =>
        scan.vehicle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <ProtectedRoute>
            <div className="w-full px-4 sm:px-6 py-6">
                <PageHeader
                    title="Scans"
                    showFilter
                // onFilterClick={() => alert("filter clicked!")}
                />

                {filteredScans.length === 0 ? (
                    <p className="text-center text-gray-500 mt-8">No vehicles found.</p>
                ) : (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredScans.map((scan) => (
                            <div
                                key={scan.id}
                                className="border rounded-xl bg-white p-4 shadow-sm flex flex-col justify-between"
                            >
                                <div className="flex items-start gap-2 mb-4">
                                    <div className="flex-shrink-0 bg-lightOrange text-orange-600 rounded-full p-2">
                                        <img
                                            src={images.bugatti}
                                            alt="Car Logo"
                                            className="h-4 w-4 object-contain"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-black">Vehicle</p>
                                        <h2 className="text-sm font-semibold text-black">
                                            {scan.vehicle}
                                        </h2>
                                    </div>
                                </div>

                                <div className="text-sm space-y-2 text-gray-700">
                                    <p>
                                        <span className="font-medium text-gray-600">DTC Code:</span>{" "}
                                        <span className="text-orange font-semibold">
                                            {scan.dtcCode}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-600">Issue:</span>{" "}
                                        <span className="font-semibold">{scan.issue}</span>
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-600">Urgency:</span>{" "}
                                        <span
                                            className="text-white px-4 py-1 text-xs rounded-full font-semibold ml-3"
                                            style={{ backgroundColor: scan.urgencyColor }}
                                        >
                                            {scan.urgency}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-medium text-gray-600">
                                            Repair Difficulty:
                                        </span>{" "}
                                        <span
                                            className="text-white px-5 py-1 text-xs rounded-full font-semibold ml-3"
                                            style={{ backgroundColor: scan.repairDifficultyColor }}
                                        >
                                            {scan.repairDifficulty}
                                        </span>
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">
                                    <div>
                                        <p className="text-gray-600 font-medium">Estimated Cost</p>
                                        <p className="text-gray-800 text-base font-semibold">
                                            {scan.estimatedCost}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/scanresults/${scan.id}`}
                                        className="px-4 py-2 sm:px-5 sm:py-2.5 border rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100">
                                        <div className="flex items-center sm:space-x-2">
                                            <img
                                                src={images.document}
                                                alt="Car Logo"
                                                className="h-4 w-4 object-contain"
                                            />
                                            <span className="hidden sm:flex text-xs sm:text-base font-medium text-black cursor-pointer">
                                                View Full Details
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
