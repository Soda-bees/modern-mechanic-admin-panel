import { customImageLoader } from "@/lib/imageLoader";
import { handleGetScanDetail } from "@/services/api";
import images from "@/services/images";
import Image from "next/image";
import Link from "next/link";

export default async function SingleScanResult({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const scan = await handleGetScanDetail(id)

  if (!scan) {
    return <div className="text-center mt-10">Scan not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="hidden sm:flex mb-4">
        <div className="inline-flex items-center border p-2 rounded-xl border-borderGray">
          <Link
            href="/scanresults"
            className="text-base text-black mr-1 font-semibold"
          >
            〱 Back
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:flex-1">
          <div className="flex items-center gap-2 text-orange font-medium mb-4">
            <div className="flex-shrink-0 bg-lightOrange text-orange-600 rounded-full p-2">
              <Image
                loader={customImageLoader}
                src={images.bugatti}
                alt="car"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <p className="text-lg text-black">Vehicle Scan Summary</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
            <div className="w-full sm:w-[300px]">
              <Image
                src={scan.vehicle_image}
                alt={scan.vehicle_info}
                width={350}
                height={350}
                className="rounded-lg object-cover"
                loader={customImageLoader}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl text-black sm:text-2xl font-semibold">
                {scan.vehicle_info}
              </h2>
              <p className="text-base text-black mt-2">
                DTC Code:{" "}
                <span className="text-orange font-semibold">
                  {scan.dtc_code}
                </span>
              </p>
              <p className="text-base text-black font-medium mt-1">
                Issue: <span className="font-semibold">{scan.description}</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-borderGray p-4 space-y-4">
            <p className="font-semibold text-lg text-black">Status Tags</p>

            <div className="flex flex-col sm:flex-row gap-6 border-t border-borderGray pt-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-base font-medium text-black">Urgency:</p>
                  <span 
                  // className="text-xs font-semibold text-white px-3 py-1 rounded-2xl"
                  className={
                    scan.urgency_color === "Yellow"
                      ? "text-black text-xs font-semibold px-3 py-1 rounded-2xl"
                      : "text-white text-xs font-semibold px-3 py-1 rounded-2xl"
                  } 
                  style={{background:scan.urgency_color}}
                  >
                    {scan.urgency_level}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1 text-black">
                  Urgency Details
                </p>
                <p className="text-xs font-semibold text-black">
                  What’s going on with your Bugatti?
                </p>
                <p className="text-xs text-black">How urgent is this issue?</p>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-base font-medium text-black">
                    Repair Difficulty:
                  </p>
                  <span 
                  // className="text-xs font-semibold text-white px-3 py-1 rounded-2xl"
                  className={
                    scan.difficulty_color === "Yellow"
                      ? "text-black text-xs font-semibold px-3 py-1 rounded-2xl"
                      : "text-white text-xs font-semibold px-3 py-1 rounded-2xl"
                  } 
                  style={{backgroundColor:scan.difficulty_color}}>
                    {scan.repair_difficulty}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1 text-black">
                  Difficulty Details
                </p>
                <p className="text-sm font-semibold mb-1 text-black">
                  How difficult is this repair?
                </p>
                <p className="text-xs text-black">
                  The Bugatti Chiron is an ultra-high-performance hypercar...
                  Only Bugatti-certified technicians should perform this repair
                  due to the complexity and specialized equipment needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-headerBG p-4 rounded-lg">
            <p className="text-base text-black mb-1 font-semibold">
              Your Observation
            </p>
            <p className="text-base font-medium text-black">
              {scan.user_notes}
            </p>
          </div>

          <div className="bg-white border border-borderGray rounded-lg p-4">
            <p className="font-semibold text-lg mb-2 text-black">
              Watch Tutorial
            </p>
            <p className="text-base text-black mb-2 border-t border-borderGray pt-2">
              <strong>Need help understanding this repair?</strong> <br />
              Watch: Step-by-step guide on resolving DTC {scan.dtc_code}
            </p>
            <div className="flex flex-col items-start mt-2">

              {
                scan.youtube_videos.map((item: string, index: number) => {
                  return (
                    <a
                      key={index}
                      href={item}
                      target="_blank"
                      className="text-blue-600 text-base hover:underline mt-1 cursor-pointer"
                    >
                      {item}
                    </a>
                  )
                })
              }
            </div>
          </div>

          <div className="bg-white border border-borderGray rounded-lg p-4">
            <p className="font-semibold text-lg mb-2 text-black">
              Cost Estimate
            </p>
            <p className="text-sm ">{scan.cost_estimate}</p>
            <p className="text-xs text-black mt-2">
              Prices reflect Bugatti dealership estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
