"use client";

import { selectQueries } from "@/lib/features/adminData/adminDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { customImageLoader } from "@/lib/imageLoader";
import Image from "next/image";
import Link from "next/link";


export default function QueryDetailclient({ id }: { id: string }) {
    const queries = useAppSelector(selectQueries)
    const query = queries.find((item: Queries) => item.query_id === Number(id)) || null;

    if (!query) {
        return <div className="text-center mt-10">Query not found</div>;
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="hidden sm:flex mb-4 border p-1 rounded-xl w-24 border-borderGray cursor-pointer">
                <Link
                    href="/queries"
                    className="text-base text-black ml-1 font-semibold"
                >
                    〱 Back
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-2 text-black">
                            Query Information:
                        </h2>
                        <p className="text-sm text-lightGrey">
                            {new Date(query.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <p className="font-medium text-black">{query.full_name}</p>
                        <p className="text-sm text-lightGrey">{query.email}</p>

                        <div className="mt-4">
                            <p className="font-semibold text-black">Complaint Message:</p>
                            <p className="text-black text-sm mt-1">
                                {query.description}
                            </p>
                        </div>
                    </div>

                    <hr />
                    <h2 className="text-2xl font-semibold mb-2 text-black mb-6">
                        Workshop Information:
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Image
                            loader={customImageLoader}
                            src={query.workshop.image}
                            alt="Workshop"
                            className="object-contain rounded-lg"
                            height={110}
                            width={110}
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-black">
                                {query.workshop.name}
                            </h2>
                            <p className="text-sm text-black">
                                Website:{" "}
                                <a href={query.workshop.website_link} target="_blank" className="font-semibold cursor-pointer text-blue-500">{query.workshop.website_link}</a>
                            </p>
                            <p className="text-sm text-black">
                                Email: <span className="font-semibold">{query.workshop.email}</span>
                            </p>
                            <p className="text-sm text-black">
                                <span className="font-semibold">Zipcode: {query.workshop.zipcode}</span>
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-black mt-2 max-w-xl">
                        {query.workshop.description}
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-black">Scans</h2>

                    {query.scans.map((scan: Scan, idx: number) => (
                        <div
                            key={idx}
                            className="border rounded-xl p-4 space-y-1 shadow-sm bg-white"
                        >
                            <div className="flex items-center gap-2 text-orange-600 font-semibold">
                                <span className="text-xl">🚗</span>
                                <span className="text-sm">{scan.vehicle_info}</span>
                            </div>

                            <h3 className="font-semibold text-black">{ }</h3>
                            <p className="text-sm text-black">
                                DTC Code:{" "}
                                <span className="text-orange font-medium font-semibold">{scan.dtc_code}</span>
                            </p>
                            <p className="text-sm text-black">
                                Issue:{" "}
                                <span className="font-medium font-semibold text-black">
                                   {scan.description}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}