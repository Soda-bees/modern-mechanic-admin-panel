"use client";
import { selectComplaints } from "@/lib/features/adminData/adminDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { customImageLoader } from "@/lib/imageLoader";
import images from "@/services/images";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

export default function ComplaintDetailclient({ id }: { id: string }) {
    const complaints = useAppSelector(selectComplaints)
    const complaint = complaints.find((item: Complaint) => item.id === Number(id)) || null;

    if (!complaint) {
        return <div className="text-center mt-10">Complaint not found</div>;
      }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="hidden sm:flex mb-4 border p-1 rounded-xl w-20 border-borderGray">
          <Link
            href="/complaints"
            className="text-base text-black ml-1 font-semibold cursor-pointer"
          >
            〱 Back
          </Link>
        </div>
  
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mt-6">
          <div className="">
            <h4 className="text-sm font-medium text-black flex items-center gap-2">
              <span className="bg-black p-1.5 rounded-full bg-lightOrange">
                <UserIcon className="w-6 h-6 text-orange-500" />
              </span>
              User Information:
            </h4>
            <h1 className="text-3xl font-semibold text-black mt-5">
              {complaint?.full_name}
            </h1>
            <p className="mt-1 text-black">Email:</p>
            <span className="font-semibold text-black">{complaint?.email}</span>
            <p className="mt-1 text-black">Phone:</p>
            <span className="font-semibold text-black">
              {complaint?.phone_number}
            </span>
          </div>
          <div className="w-full sm:w-auto text-left sm:text-right mt-6 sm:mt-0">
            <p className="text-sm text-black font-semibold">Complaint</p>
            <p className="text-xs text-black mt-1">
              Submitted on{" "}
              <span className="font-semibold text-black">
                {new Date(complaint.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                •{" "}
                {new Date(complaint.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </p>
          </div>
        </div>
  
        <hr className="border-t my-10 border-gray-200" />
  
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="w-full">
            <h4 className="text-sm font-medium text-black flex items-center gap-2">
              <span className="bg-lightOrange text-orange-600 p-2 rounded-full">
                <Image
                  loader={customImageLoader}
                  src={images.bugatti}
                  alt="Car Logo"
                  className="object-contain"
                  height={20}
                  width={20}
                />
              </span>
              Vehicle Info:
            </h4>
            <h1 className="text-xl font-semibold text-black my-4">
              {complaint?.scan?.vehicle_info}
            </h1>
            <p className="mt-1 text-sm text-black">
              DTC Code:{" "}
              <span className="text-orange font-semibold text-black">
                {complaint?.scan?.dtc_code}
              </span>
            </p>
            <p className="mt-1 text-sm text-black">
              Issue:
              <span className="font-semibold text-black">
                {" "}
                {complaint?.scan?.description}
              </span>
            </p>
          </div>
  
          <div className="max-w-2xl w-full">
            <h2 className="text-base text-black mb-1">Complaint Message:</h2>
            <p className="bg-headerBG p-4 rounded-lg text-sm leading-relaxed text-black font-semibold">
              {complaint?.description}
            </p>
          </div>
        </div>
      </div>
    )
}