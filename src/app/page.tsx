"use client";

import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import Image from "next/image";
import images from "@/services/images";
import { customImageLoader } from "@/lib/imageLoader";
import { useEffect, useState } from "react";
import { handleGetSummary } from "@/services/api";

export default function Overview() {

  const [summaryCards, setSummaryCards] = useState([
    {
      title: "Total Users",
      value: "0",
      subtitle: "See who’s driving with us.",
      icon: images.Users,
    },
    {
      title: "Total Workshops",
      value: "0",
      subtitle: "Verified garages in our network.",
      icon: images.Workshops,
    },
    {
      title: "Scans",
      value: "0",
      subtitle: "Every scan makes a car smarter.",
      icon: images.Scan,
    },
    {
      title: "Complaints",
      value: "0",
      subtitle: "User voices help us improve.",
      icon: images.Complains,
    },
  ])

  const getAllSummary = async () => {
    try {
      const response = await handleGetSummary() as GetAllSummaryResponse
      if (response?.success) {
        const { total_complaints, total_scans, total_users, total_workshops } = response?.data
        setSummaryCards(prev => [
          {
            ...prev[0],
            value: total_users.toString(),
          },
          {
            ...prev[1],
            value: total_workshops.toString(),
          },
          {
            ...prev[2],
            value: total_scans.toString(),
          },
          {
            ...prev[3],
            value: total_complaints.toString(),
          },
        ]);
      } else {
        alert("Something went wrongasd.")
      }
    } catch (error) {
      alert("Something went wrong.")
    }
  }

  useEffect(() => {
    getAllSummary()
  }, [])

  return (
    <ProtectedRoute>
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader title="Overview" showFilter={false} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {summaryCards.map((item, i) => (
            <div
              key={i}
              className="bg-headerBG rounded-xl p-4 flex flex-col gap-2 shadow-sm"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="w-10 h-10 relative bg-lightOrange rounded-full flex items-center justify-center">
                  <Image
                    loader={customImageLoader}
                    src={item.icon}
                    alt={item.title}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl lg:text-3xl font-semibold text-black">{item.value}</h2>
              </div>
              <p className="text-lg sm:text-xl font-medium text-black font-semibold">
                {item.title}
              </p>
              <p className="text-xs sm:text-sm text-grey">{item.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-headerBG rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-sm text-anotherGrey">Scan</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                  Scan Activity Report
                </h3>
              </div>
              <div className="relative inline-block w-fit">
                <select className="appearance-none text-sm pl-3 pr-6 py-1.5 border border-grey rounded-lg bg-headerBG text-grey cursor-pointer">
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-grey">
                  ▾
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center overflow-x-auto">
              <Image
                loader={customImageLoader}

                src={images.barChart}
                width={800}
                height={100}
                className="object-contain max-w-full h-auto mt-5"
                alt="chart"
              />
            </div>
          </div>

          <div className="bg-headerBG rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <p className="text-sm text-anotherGrey">Total Users</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-black">
                  2,340
                </h3>
              </div>
              <div className="relative inline-block w-fit ">
                <select className="appearance-none text-sm pl-3 pr-6 py-1.5 border border-grey rounded-lg bg-headerBG text-grey cursor-pointer">
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-grey">
                  ▾
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center overflow-x-auto">
              <Image
                loader={customImageLoader}

                src={images.lineChart}
                width={800}
                height={100}
                className="object-contain max-w-full h-auto mt-5"
                alt="chart"
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
