export async function generateStaticParams() {
  // Example: return all possible IDs
  const ids = Array.from({ length: 10 }, (_, i) => (i + 1).toString());// ideally fetch from an API or database
  return ids.map((id) => ({ id }));
}
import React from "react";
import Image from "next/image";
import Link from "next/link";
import images from "@/services/images";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { customImageLoader } from "@/lib/imageLoader";
export default async function WorkshopShowcase({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workshop = {
    name: "AutoFix Garage",
    website: "www.exampleworkshop.com",
    email: "info@workshop.com",
    zipcode: "90125",
    phone: "15634/89564",
    address: "1234 Elm Street Springfield, IL 62704",
    description:
      "Expert automotive repairs and diagnostics. Serving premium and performance cars with certified technicians and genuine parts.",
    // carImge: "/logo.png", // place your workshop logo in public/logo.png or replace with URL
  };
  return (
    <div className="flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-5xl mb-4 ">
        <div className="hidden sm:flex justify-start">
          <div className="border p-1 rounded-xl w-24 border-borderGray">
            <Link
              href="/workshops"
              className="text-base text-black font-semibold flex justify-center"
            >
              〱 Back
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center w-full max-w-5xl mt-10">
        <Image
        loader={customImageLoader}
          src={images.workshopImage}
          alt="Workshop Logo"
          width={300}
          height={300}
          className="border border-borderGray rounded-3xl mb-4 sm:mb-0"
        />

        <div className="sm:ml-6 w-full sm:w-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
            {workshop.name}
          </h2>
          <p>
            Website:
            <span className="font-semibold"> {workshop.website}</span>
          </p>
          <p>
            Email:
            <span className="font-semibold"> {workshop.email}</span>
          </p>
          <p>
            Zipcode:
            <span className="font-semibold"> {workshop.zipcode}</span>
          </p>
          <p>
            Phone:
            <span className="font-semibold"> {workshop.phone}</span>
          </p>
          <p>
            Address:
            <span className="font-semibold"> {workshop.address}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 w-full max-w-5xl">
        <h3 className="text-base font-medium text-black mb-1">
          Short Description:
        </h3>
        <p className="text-lg font-semibold">{workshop.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-6 border-t border-borderGray w-full max-w-5xl pt-4">
        <button className="flex items-center px-4 py-2 rounded-lg border border-borderGray w-auto">
          <PencilIcon className="h-4 w-4" />
          <p className="text-black cursor-pointer ml-2 text-sm">Edit Shop</p>
        </button>
        <button className="flex items-center px-4 py-2 rounded-lg bg-orange w-auto">
          <TrashIcon className="h-4 w-4 text-white" />
          <p className="text-white cursor-pointer ml-2 text-sm">Delete</p>
        </button>
      </div>
    </div>
  );
}
