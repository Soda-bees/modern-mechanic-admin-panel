import { customImageLoader } from "@/lib/imageLoader";
import { handleGetComplaintDetail } from "@/services/api";
import images from "@/services/images";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default async function SingleQuerie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //   const querie = await handleGetComplaintDetail(id);

  // if (!querie) {
  //     return <div className="text-center mt-10">Complaint not found</div>;
  // }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="hidden sm:flex mb-4 border p-1 rounded-xl w-24 border-borderGray">
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
            <p className="text-sm text-lightGrey">July 17, 2025</p>
            <p className="font-medium text-black">Emily Richardson</p>
            <p className="text-sm text-lightGrey">emilyrichardson@gmail.com</p>

            <div className="mt-4">
              <p className="font-semibold text-black">Complaint Message:</p>
              <p className="text-black text-sm mt-1">
                I'm not satisfied with the scan results. The diagnostic
                indicated three issues with my engine, but my car was running
                perfectly fine before I brought it in.
              </p>
            </div>
          </div>

          <hr />
          <h2 className="text-2xl font-semibold mb-2 text-black mb-6">
            Workshop Information:
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src="/workshop.jpg"
              alt="Workshop"
              className="w-32 h-24 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-lg font-semibold text-black">
                AutoFix Garage
              </h2>
              <p className="text-sm text-black">
                Website:{" "}
                <span className="font-semibold">www.exampleworkshop.com</span>
              </p>
              <p className="text-sm text-black">
                Email: <span className="font-semibold">info@workshop.com</span>
              </p>
              <p className="text-sm text-black">
                <span className="font-semibold">Zipcode: 90125</span>
              </p>
            </div>
          </div>
          <p className="text-sm text-black mt-2 max-w-xl">
            Expert automotive repairs and diagnostics. Serving premium and
            performance cars with certified technicians and genuine parts.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-black">Scans</h2>

          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 space-y-1 shadow-sm bg-white"
            >
              <div className="flex items-center gap-2 text-orange-600 font-semibold">
                <span className="text-xl">🚗</span>
                <span className="text-sm">Vehicle info</span>
              </div>

              <h3 className="font-semibold text-black">Bugatti Chiron 2027</h3>
              <p className="text-sm text-black">
                DTC Code:{" "}
                <span className="text-orange font-medium font-semibold">P0025</span>
              </p>
              <p className="text-sm text-black">
                Issue:{" "}
                <span className="font-medium font-semibold text-black">
                  Exhaust Variable Camshaft Timing (Bank 2)
                </span>
              </p>
              {/* <p className="text-sm text-gray-800 font-medium">
                Estimated Cost: <br />
                <span className="font-semibold">From $1,500 to $15,000+</span>
              </p> */}
            </div>
          ))}
        </div>
      </div>
    </div>

    // <div className="max-w-7xl mx-auto px-4 py-6">
    //   <div className="hidden sm:flex mb-4 border p-1 rounded-xl w-20 border-borderGray">
    //     <Link
    //       href="/queries"
    //       className="text-base text-black ml-1 font-semibold"
    //     >
    //       〱 Back
    //     </Link>
    //   </div>

    //   <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mt-6">
    //     <div className="">
    //       <h4 className="text-sm font-medium text-black flex items-center gap-2">
    //         <span className="bg-black p-1.5 rounded-full bg-lightOrange">
    //           <UserIcon className="w-6 h-6 text-orange-500" />
    //         </span>
    //         User Information:
    //       </h4>
    //       <h1 className="text-3xl font-semibold text-black mt-5">
    //         {"complaint?.full_name"}
    //       </h1>
    //       <p className="mt-1 text-black">Email:</p>
    //       <span className="font-semibold text-black">{"complaint?.email"}</span>
    //       <p className="mt-1 text-black">Phone:</p>
    //       <span className="font-semibold text-black">
    //         {"complaint?.phone_number"}
    //       </span>
    //     </div>
    //     <div className="w-full sm:w-auto text-left sm:text-right mt-6 sm:mt-0">
    //       <p className="text-sm text-black font-semibold">Complaint</p>
    //       <p className="text-xs text-black mt-1">
    //         Submitted on{" "}
    //         <span className="font-semibold text-black">
    //           {new Date("complaint.created_at").toLocaleDateString("en-US", {
    //             year: "numeric",
    //             month: "long",
    //             day: "numeric",
    //           })}{" "}
    //           •{" "}
    //           {new Date("complaint.created_at").toLocaleTimeString("en-US", {
    //             hour: "2-digit",
    //             minute: "2-digit",
    //             hour12: false,
    //           })}
    //         </span>
    //       </p>
    //     </div>
    //   </div>

    //   <hr className="border-t my-10 border-gray-200" />

    //   <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
    //     <div className="w-full">
    //       <h4 className="text-sm font-medium text-black flex items-center gap-2">
    //         <span className="bg-lightOrange text-orange-600 p-2 rounded-full">
    //           <Image
    //             loader={customImageLoader}
    //             src={images.bugatti}
    //             alt="Car Logo"
    //             className="object-contain"
    //             height={20}
    //             width={20}
    //           />
    //         </span>
    //         Vehicle Info:
    //       </h4>
    //       <h1 className="text-xl font-semibold text-black my-4">
    //         {"complaint?.scan?.vehicle_info"}
    //       </h1>
    //       <p className="mt-1 text-sm text-black">
    //         DTC Code:{" "}
    //         <span className="text-orange font-semibold text-black">
    //           {"complaint?.scan?.dtc_code"}
    //         </span>
    //       </p>
    //       <p className="mt-1 text-sm text-black">
    //         Issue:
    //         <span className="font-semibold text-black">
    //           {" "}
    //           {"complaint?.scan?.description"}
    //         </span>
    //       </p>
    //     </div>

    //     <div className="max-w-2xl w-full">
    //       <h2 className="text-base text-black mb-1">Complaint Message:</h2>
    //       <p className="bg-headerBG p-4 rounded-lg text-sm leading-relaxed text-black font-semibold">
    //         {"complaint?.description"}
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
}
