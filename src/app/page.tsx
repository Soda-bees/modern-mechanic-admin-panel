"use client";

import PageHeader from "@/component/PageHeader";
import Image from "next/image";
import images from "@/services/images";
import { customImageLoader } from "@/lib/imageLoader";
import { useState } from "react";
import ScanBarChart from "@/component/BarChart";
import LineChartComponent from "@/component/LineChart";
import { useAppSelector } from "@/lib/hooks";
import { selectAdminData } from "@/lib/features/adminData/adminDataSlice";

export default function Overview() {
  const { users, scans, complaints, workshops } =
    useAppSelector(selectAdminData);

  const [summaryCards, setSummaryCards] = useState([
    {
      title: "Total Users",
      value: users?.length || 0,
      subtitle: "See who’s driving with us.",
      icon: images.Users,
    },
    {
      title: "Total Workshops",
      value: workshops?.length || 0,
      subtitle: "Verified garages in our network.",
      icon: images.Workshops,
    },
    {
      title: "Scans",
      value: scans?.length || 0,
      subtitle: "Every scan makes a car smarter.",
      icon: images.Scan,
    },
    {
      title: "Complaints",
      value: complaints?.length || 0,
      subtitle: "User voices help us improve.",
      icon: images.Complains,
    },
  ]);

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader title="Overview" showFilter-={false} />

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
              <h2 className="text-2xl lg:text-3xl font-semibold text-black">
                {item.value}
              </h2>
            </div>
            <p className="text-lg sm:text-xl font-medium text-black font-semibold">
              {item.title}
            </p>
            <p className="text-xs sm:text-sm text-grey">{item.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 overflow-hidden">
        <div className="bg-headerBG rounded-xl sm:p-6 shadow-sm p-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-3">
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
          <div className="mt-5 w-full overflow-x-auto">
            <div className="min-w-[600px]">
              <ScanBarChart />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-headerBG rounded-xl p-4 sm:p-6 shadow-sm">
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
          <div className="w-full overflow-x-auto mt-5">
            <div className="min-w-[600px]">
              <LineChartComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
