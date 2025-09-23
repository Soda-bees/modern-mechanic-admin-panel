"use client";

import PageHeader from "@/component/PageHeader";
import { useEffect, useState } from "react";
import AddWorkshopModal from "@/component/AddWorkshopModal";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import Loader from "@/component/loader";
import Image from "next/image";
import { customImageLoader } from "@/lib/imageLoader";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchWorkshops, selectLoadings, selectWorkshops } from "@/lib/features/adminData/adminDataSlice";

export default function Workshops() {
  const dispatch = useAppDispatch()
  const router = useRouter();
  const searchParams = useSearchParams();

  const workshops = useAppSelector(selectWorkshops)
  const { loadingWorkshop } = useAppSelector(selectLoadings)
  const { search, setPlaceholder } = useSearch()

  useEffect(() => {
    setPlaceholder('Search workshops by name...');
    return () => {
      setPlaceholder("Search...");
    };
  }, [setPlaceholder])

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false)
  const [selectedZips, setSelectedZips] = useState<string[]>([]);
  const uniqueZipcodes = Array.from(new Set(workshops.map((w) => w.zipcode)));

  const value = searchParams.get('modal')

  useEffect(() => {
    if (value === "add") {
      setVisibleModal(true);
    }
  }, [value]);

  const getWorkshop = async () => {
    if (!loadingWorkshop) {
      dispatch(fetchWorkshops())
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow", fontWeight: 'bold', fontSize: 21 }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const highlightFilters = (text: string, zips: string[]) => {
    if (!zips.length) return text;
    const regex = new RegExp(`(${zips.join("|")})`, "gi");
    return String(text).split(regex).map((part, i) =>
      zips.some((z) => part.toLowerCase() === z.toLowerCase()) ? (
        <span key={i} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredWorkshop = workshops.filter((workshop) => {
    // search only by name
    const nameMatch = (workshop.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
  
    // zip filtering only from selectedZips
    const workshopZip = String(workshop.zipcode || "");
    const zipSelected =
      selectedZips.length === 0 || selectedZips.includes(workshopZip);
  
    return nameMatch && zipSelected;
  });
  

  const handleOpenModal = async () => {
    router.push("?modal=add");
  }

  return (
    <div className="w-full px-4 sm:px-6 py-6">
      <PageHeader
        title="Workshops"
        showReload showFilter
        addShowButton
        buttonTitle="+ Add Workshop"
        onAddShowClick={handleOpenModal}
        isLoading={loadingWorkshop}
        onReloadClick={getWorkshop}
        zipcodes={uniqueZipcodes}
        selectedZips={selectedZips}
        onZipSelect={setSelectedZips}
      />
      <div className="mt-6">
        {loading ? (
          <Loader />
        ) : filteredWorkshop.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-6">
              {filteredWorkshop.map((shop, index) => (
                <div
                  key={index}
                  className="bg-headerBG rounded-xl shadow-sm border border-gray-100 p-3 text-start "
                >
                  <div className="bg-white w-full rounded-xl flex flex-col items-center justify-center p-8 h-[250px]">
                    <Image
                      loader={customImageLoader}
                      src={shop.image}
                      alt={shop.name}
                      width={200}
                      height={200}
                      className="object-contain rounded-t-xl"
                    />
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-black truncate">
                    {highlightText(shop.name, search)}
                    {/* {shop.name} */}
                  </h3>
                  <p className="text-xs sm:text-sm text-black mt-1 font-semibold truncate">
                    <span className="font-medium">Website:</span> {shop.website_link}
                  </p>
                  <p className="text-xs sm:text-sm text-black font-semibold truncate">
                    <span className="font-medium">Email:</span> {shop.email}
                  </p>
                  <p className="text-xs sm:text-sm text-black mb-3 font-semibold truncate">
                    <span className="font-medium">Zipcode:</span>
                    {highlightFilters(shop.zipcode, selectedZips)}
                  </p>
                  <Link href={`/workshops/${shop.id}`}>
                    <p className="text-black bg-white rounded-xl w-full py-3 text-xs sm:text-sm hover:bg-headerBG transition font-semibold flex justify-center">
                      Shop Details
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-sm text-gray-500 py-10">
            No workshop found.
          </div>
        )}
      </div>
      {visibleModal && <AddWorkshopModal setIsOpen={setVisibleModal} />}
    </div>
  );
}
