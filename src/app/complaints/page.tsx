"use client";

import PageHeader from "@/component/PageHeader";
import images from "@/services/images";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { customImageLoader } from "@/lib/imageLoader";
import { useState } from "react";
import Loader from "@/component/loader";
import { useSearch } from "@/context/SearchContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchComplaints, selectComplaints, selectLoadings } from "@/lib/features/adminData/adminDataSlice";

export default function Complaints() {
  const { search } = useSearch();
  const dispatch = useAppDispatch()

  const complaints = useAppSelector(selectComplaints)
  const {loadingComplaint} = useAppSelector(selectLoadings)

  const [loading, setLoading] = useState<boolean>(false);

  const getComplaints = async () => {
    if(!loadingComplaint){
      dispatch(fetchComplaints())
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

  const filteredComplaint = complaints.filter((complaint) =>
    complaint.scan.dtc_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="w-full px-4 sm:px-6 py-6">
        <PageHeader
          title="Complaints"
          showFilter
          onFilterClick={getComplaints}
          isLoading={loadingComplaint}
        />
        {loading ? (
          <div className="mt-6">
            <Loader />
          </div>
        ) : filteredComplaint.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No complaint found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {filteredComplaint.map((complaint, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base font-semibold text-black">
                      Complaint
                    </p>
                    <p className="text-sm text-lightGrey">
                      Submitted on{" "}
                      {new Date(complaint.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}{" "}
                      •{" "}
                      {new Date(complaint.created_at).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </p>
                  </div>
                  <Link
                    href={`/complaints/${complaint.id}`}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 border rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center sm:space-x-2">
                      <Image
                        loader={customImageLoader}
                        src={images.document}
                        alt={"Document Logo"}
                        width={15}
                        height={15}
                        className="object-contain"
                      />
                      <span className="hidden sm:flex text-xs sm:text-base font-medium text-black ">
                        View Full Details
                      </span>
                    </div>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-black flex items-center gap-2">
                      <span className="p-1.5 rounded-full bg-lightOrange">
                        <UserIcon className="w-4 h-4 text-orange" />
                      </span>{" "}
                      User Information:
                    </h4>
                    <p className="text-sm text-black">Name:</p>
                    <p className="text-sm text-black font-semibold">
                      {complaint.full_name}
                    </p>
                    <p className="text-sm text-black">Email:</p>
                    <p className="text-sm text-black font-semibold">
                      {complaint.email}
                    </p>
                    <p className="text-sm text-black">Phone:</p>
                    <p className="text-sm text-black font-semibold">
                      {complaint.phone_number}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-black flex items-center gap-2">
                      <span className="bg-lightOrange text-orange-600 p-2 rounded-full">
                        <Image
                          loader={customImageLoader}
                          src={images.bugatti}
                          alt={"Car Logo"}
                          width={13}
                          height={13}
                          className="object-contain"
                        />
                      </span>{" "}
                      Scan Vehicle Info:
                    </h4>
                    <p className="text-sm text-black font-semibold">
                      {complaint.scan.vehicle_info}
                    </p>
                    <p className="text-sm text-black">
                      DTC Code:{" "}
                      <span className="text-orange font-semibold">
                        {highlightText(complaint.scan.dtc_code, search)}
                      </span>
                    </p>
                    <p className="text-sm text-black">
                      Issue:{" "}
                      <span className="font-semibold">
                        {" "}
                        {complaint.scan.description}
                      </span>
                    </p>
                    <p className="text-sm text-black">
                      Urgency:{" "}
                      <span className="font-semibold">
                        {" "}
                        {complaint.scan.urgency_level}
                      </span>
                    </p>
                    <p className="text-sm text-black">
                      Repair Difficulty:{" "}
                      <span className="font-semibold">
                        {" "}
                        {complaint.scan.repair_difficulty}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-black">
                    Complaint Message:
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mt-1 rounded-xl bg-gray-100 p-4">
                    {complaint.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
