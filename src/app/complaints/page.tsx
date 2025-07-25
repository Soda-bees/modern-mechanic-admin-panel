"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import images from "@/services/images";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { customImageLoader } from "@/lib/imageLoader";

export default function Complaints() {

  const complaints = Array(10)
    .fill(null)
    .map((_, index) => ({
      _id: `${index + 1}`, // You can use a more unique ID if needed
      name: "Emily Richardson",
      email: "emilyrichardson@gmail.com",
      phone: "+1234568799",
      date: "July 17, 2025",
      time: "16:45",
      vehicle: "Bugatti Chiron 2027",
      dtcCode: "P0025",
      issue: "Exhaust Variable Camshaft Timing (Bank 2)",
      urgency: "Soon",
      difficulty: "Specialist",
      cost: "From $1,500 to $15,000+",
      message:
        "I'm not satisfied with the scan results. The diagnostic indicated three issues with my engine, but my car was running perfectly fine before I brought it in. I’ve taken my vehicle to another mechanic who found no issues with the engine. I believe the scan results are incorrect and would like a refund for the diagnostic service.",
    }));

  return (
    <ProtectedRoute>
      <div className="w-full px-4 sm:px-6 md:px-10 py-6">
        <PageHeader
          title="Complaints"
          showFilter
          onFilterClick={() => alert("filter clicked!")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {complaints.map((complaint, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-semibold text-black">
                    Complaint
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted on {complaint.date} • {complaint.time}
                  </p>
                </div>
                <Link
                  href={`/complaints/${complaint._id}`}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 border rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center sm:space-x-2">
                    <Image
                      loader={customImageLoader}
                      src={images.document}
                      alt={'Document Logo'}
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
                  <h4 className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <span className="bg-gray-100 p-1.5 rounded-full bg-lightOrange">
                      <UserIcon className="w-4 h-4 text-orange-500" />
                    </span>{" "}
                    User Information:
                  </h4>
                  <p className="text-sm text-black">Name:</p>
                  <p className="text-sm text-black font-semibold">
                    {complaint.name}
                  </p>
                  <p className="text-sm text-black">Email:</p>
                  <p className="text-sm text-black font-semibold">
                    {complaint.email}
                  </p>
                  <p className="text-sm text-black">Phone:</p>
                  <p className="text-sm text-black font-semibold">
                    {complaint.phone}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <span className="bg-lightOrange text-orange-600 p-2 rounded-full">
                      <Image
                        loader={customImageLoader}
                        src={images.bugatti}
                        alt={'Car Logo'}
                        width={13}
                        height={13}
                        className="object-contain"
                      />
                    </span>{" "}
                    Scan Vehicle Info:
                  </h4>
                  <p className="text-sm text-black font-semibold">
                    {complaint.vehicle}
                  </p>
                  <p className="text-sm text-black">
                    DTC Code:{" "}
                    <span className="text-orange font-semibold">
                      {complaint.dtcCode}
                    </span>
                  </p>
                  <p className="text-sm text-black">
                    Issue:{" "}
                    <span className="font-semibold"> {complaint.issue}</span>
                  </p>
                  <p className="text-sm text-black">
                    Urgency:{" "}
                    <span className="font-semibold"> {complaint.urgency}</span>
                  </p>
                  <p className="text-sm text-black">
                    Repair Difficulty:{" "}
                    <span className="font-semibold">
                      {" "}
                      {complaint.difficulty}
                    </span>
                  </p>
                  <p className="text-sm text-black">
                    Estimated Cost:{" "}
                    <span className="font-semibold"> {complaint.cost}</span>
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">
                  Complaint Message:
                </p>
                <p className="text-xs font-semibold text-gray-700 mt-1 rounded-xl bg-gray-100 p-4">
                  {complaint.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}