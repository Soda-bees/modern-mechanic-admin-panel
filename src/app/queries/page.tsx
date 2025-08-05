"use client";

import PageHeader from "@/component/PageHeader";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";
import { handleQueries } from "@/services/api";
import Loader from "@/component/loader";
import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import images from "@/services/images";
import { customImageLoader } from "@/lib/imageLoader";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchQueries, selectLoadings, selectQueries } from "@/lib/features/adminData/adminDataSlice";

export default function Queries() {
  const { search } = useSearch();
  const queries = useAppSelector(selectQueries)
  const dispatch = useAppDispatch()
  const {loadingQuery} = useAppSelector(selectLoadings)

  // const [queries, setQueries] = useState<Queries[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getQueries = async () => {
    if(!loadingQuery){
      dispatch(fetchQueries())
    }
    // try {
    //   const response = await handleQueries() as GetQueriesResponse;
    //   console.log("response gueries", response);
    //   if (response?.data?.success) {
    //     setQueries(response?.data?.queries);
    //   } else {
    //     alert("Something went wrong!");
    //   }
    // } catch (error) {
    //   alert("Something went wrong!");
    // } finally {
    //   setLoading(false);
    // }
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

  const filteredqueries = queries.filter((querie) =>
    querie.workshop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="w-full px-4 sm:px-6 py-6">
        <PageHeader
          title="Queries"
          showFilter
          onFilterClick={getQueries}
          isLoading={loadingQuery}
        />
        {loading ? (
          <div className="mt-6">
            <Loader />
          </div>
        ) : filteredqueries.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">No Queries found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {filteredqueries.map((querie: Queries, index: number) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base font-semibold text-black">
                      Querie
                    </p>
                    <p className="text-sm text-lightGrey">
                      Submitted on{" "}
                      {new Date(querie.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}{" "}
                      •{" "}
                      {new Date(querie.created_at).toLocaleTimeString(
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
                  href={`/queries/${querie.query_id}`}
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
                      {querie.full_name}
                    </p>
                    <p className="text-sm text-black">Email:</p>
                    <p className="text-sm text-black font-semibold">
                      {querie.email}
                    </p>
                    <p className="text-sm text-black">Phone:</p>
                    <p className="text-sm text-black font-semibold">
                      {querie.phone_number}
                    </p>
                  </div>

                  {/* <div className="space-y-1">
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
                      {highlightText(querie.workshop.name, search)}
                    </p>
                    <p className="text-sm text-black">
                      DTC Code:{" "}
                      <span className="text-orange font-semibold">
                        {querie.workshop.email}
                      </span>
                    </p>
                    <p className="text-sm text-black">
                      Issue:{" "}
                      <span className="font-semibold">
                        {" "}
                        {querie.workshop.zipcode}
                      </span>
                    </p>
                    <p className="text-sm text-black">
                      Urgency:{" "}
                      <span className="font-semibold">
                        {" "}
                        {querie.workshop.website_link}
                      </span>
                    </p>
                  </div> */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-black flex items-center gap-2">
                      <span className="p-1.5 rounded-full bg-lightOrange">
                        {/* <UserIcon className="w-4 h-4 text-orange" /> */}
                        <Image
                          src={images.Workshops}
                          alt="workshop"
                          loader={customImageLoader}
                          width={15}
                          height={15}
                        />
                      </span>{" "}
                      Workshop Information:
                    </h4>
                    <p className="text-sm text-black">Name:</p>
                    <p className="text-sm text-black font-semibold">
                      {querie.workshop.name}
                    </p>
                    <p className="text-sm text-black">Email:</p>
                    <p className="text-sm text-black font-semibold">
                      {querie.workshop.email}
                    </p>
                    <p className="text-sm text-black">Phone:</p>
                    <p className="text-sm text-black font-semibold">
                      {querie.workshop.phone_number}
                    </p>
                  </div>
                </div>

                {/* <div>
                  <p className="text-sm font-medium text-black">
                    Complaint Message:
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mt-1 rounded-xl bg-gray-100 p-4">
                    {complaint.description}
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
  );
}
