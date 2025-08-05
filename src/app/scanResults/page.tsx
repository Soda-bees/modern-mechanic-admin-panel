"use client";

import PageHeader from "@/component/PageHeader";
import { useState } from "react";
import images from "@/services/images";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import Loader from "@/component/loader";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchScans, selectLoadings, selectScans } from "@/lib/features/adminData/adminDataSlice";

export default function Scanresults() {
  const { loadingScan } = useAppSelector(selectLoadings)
  const { search } = useSearch();
  const dispatch = useAppDispatch()

  const scans = useAppSelector(selectScans)

  const [loading, setLoading] = useState<boolean>(false);

  const getScanResult = async () => {
    if (!loadingScan) {
      dispatch(fetchScans())
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredScans = scans.filter((scan) =>
    scan.dtc_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-4 sm:px-6 py-6">
      <PageHeader title="Scans" showFilter onFilterClick={getScanResult} isLoading={loadingScan} />
      {loading ? (
        <div className="mt-6">
          <Loader />
        </div>
      ) : filteredScans.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No vehicles found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredScans.map((scan) => (
            <div
              key={scan.id}
              className="border rounded-xl bg-white p-4 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-2">
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
                      {scan.vehicle_info}
                    </h2>
                  </div>
                </div>

                <div className="sm:hidden ml-auto px-4 py-2 border rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100">
                  <Link href={`/scanresults/${scan.id}`} className="">
                    <img
                      src={images.document}
                      alt="Car Logo"
                      className="h-4 w-4 object-contain flex items-center"
                    />
                  </Link>
                </div>
              </div>

              <div className="text-sm space-y-2 text-gray-700">
                <p>
                  <span className="font-medium text-gray-600">DTC Code:</span>{" "}
                  <span className="text-orange font-semibold">
                    {highlightText(scan.dtc_code, search)}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">Issue:</span>{" "}
                  <span className="font-semibold">{scan.description}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">Urgency:</span>{" "}
                  <span
                    className={
                      scan.urgency_color === "Yellow"
                        ? "text-black px-5 py-1 text-xs rounded-full font-semibold ml-3"
                        : "text-white px-5 py-1 text-xs rounded-full font-semibold ml-3"
                    }
                    style={{ backgroundColor: scan.urgency_color }}
                  >
                    {scan.urgency_level}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-gray-600">
                    Repair Difficulty:
                  </span>{" "}
                  <span
                    className={
                      scan.difficulty_color === "Yellow"
                        ? "text-black px-5 py-1 text-xs rounded-full font-semibold ml-3"
                        : "text-white px-5 py-1 text-xs rounded-full font-semibold ml-3"
                    }
                    style={{ backgroundColor: scan.difficulty_color }}
                  >
                    {scan.repair_difficulty}
                  </span>
                </p>
              </div>

              <div className="mt-4 border-t pt-3 text-sm hidden sm:block">
                <div className="flex justify-center">
                  <Link
                    href={`/scanresults/${scan.id}`}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 border rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 w-full max-w-[220px]"
                  >
                    <div className="flex items-center justify-center sm:space-x-2">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
