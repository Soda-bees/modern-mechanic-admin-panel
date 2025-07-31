import { customImageLoader } from "@/lib/imageLoader";
import { handleGetComplaintDetail } from "@/services/api";
import images from "@/services/images";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default async function SingleComplaint({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const complaint = await handleGetComplaintDetail(id)
  
  if (!complaint) {
    return <div className="text-center mt-10">Complaint not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="hidden sm:flex mb-4 border p-1 rounded-xl w-20 border-borderGray">
        <Link
          href="/complaints"
          className="text-base text-black ml-1 font-semibold"
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
            Emily Richardson
          </h1>
          <p className="mt-1">Email:</p>
          <span className="font-semibold">emilyrichardson@gmail.com</span>
          <p className="mt-1">Phone:</p>
          <span className="font-semibold">+1234568799</span>
        </div>
        <div className="w-full sm:w-auto text-left sm:text-right mt-6 sm:mt-0">
          <p className="text-sm text-black font-semibold">Complaint</p>
          <p className="text-xs text-black mt-1">
            Submitted on
            <span className="font-semibold text-black">
              {" "}
              July 17, 2025 • 16:45
            </span>
          </p>
        </div>
      </div>

      <hr className="border-t my-10 border-gray-200" />

      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="w-full">
          <h4 className="text-sm font-medium text-gray-600 flex items-center gap-2">
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
            Bugatti Chiron 2027
          </h1>
          <p className="mt-1 text-sm">
            DTC Code: <span className="text-orange font-semibold">P0025</span>
          </p>
          <p className="mt-1 text-sm">
            Issue:
            <span className="font-semibold">
              {" "}
              Exhaust Variable Camshaft Timing (Bank 2)
            </span>
          </p>
          <p className="mt-4 text-sm">Estimated Cost:</p>
          <span className="font-semibold">From $1,500 to $15,000+</span>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-base text-black mb-1">Complaint Message:</h2>
          <p className="bg-headerBG p-4 rounded-lg text-sm leading-relaxed text-black font-semibold">
            I am not satisfied with the scan results. The diagnostic indicated
            three issues with my engine, but my car was running perfectly fine
            before I brought it in. I have taken my vehicle to another mechanic
            who found no issues with the engine. I believe the scan results are
            incorrect and would like a refund for the diagnostic service.
          </p>
        </div>
      </div>
    </div>
  );
}
