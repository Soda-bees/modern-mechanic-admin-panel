"use client";

import { motion } from "framer-motion";
import HoverAnimation from "./hoverAnimation";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const PageHeader = ({
  title,
  showFilter = false,
  onFilterClick,
  showReload = false,
  onReloadClick,
  addShowButton = false,
  buttonTitle,
  onAddShowClick,
  isLoading,
  zipcodes = [],
  selectedZips = [],
  onZipSelect,
}: PageHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden"; // stop scrolling
    } else {
      document.body.style.overflow = "auto"; // enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup on unmount
    };
  }, [isFilterOpen]);

  const toggleZip = (zip: string) => {
    if (selectedZips.includes(zip)) {
      onZipSelect?.(selectedZips.filter((z) => z !== zip)); // remove
    } else {
      onZipSelect?.([...selectedZips, zip]); // add
    }
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-grey w-full ">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-black">{title}</h1>
        {addShowButton && (
          <motion.button
            onClick={onAddShowClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-orange rounded-2xl px-4 py-2 text-xs sm:text-sm cursor-pointer font-semibold curson-pointer ml-4"
          >
            {buttonTitle}
          </motion.button>
        )}
        {showReload && (
          <div className="ml-2 mt-1">
            <HoverAnimation onClick={onReloadClick} >
              <ArrowPathIcon className={`w-6 cursor-pointer text-black ${isLoading ? "animate-spin" : ""}`} />
            </HoverAnimation>
          </div>
        )}
      </div>

      {showFilter && (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="flex items-center justify-center cursor-pointer"
          >
            <AdjustmentsHorizontalIcon className="w-5 mr-1 mb-1" />
            {
              selectedZips.length > 0 &&
              <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 left-0"></div>
            }
            <div className="text-xl font-semibold">Filter</div>
          </motion.button>

          {isFilterOpen && (
            <>
              {/* backdrop */}
              <div
                className="fixed inset-0 bg-black/80 z-40"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* filter popup */}
              <div className="absolute right-0 mt-2 w-68 bg-white rounded-lg shadow-lg p-4 z-50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Filter</h2>
                  <motion.button
                    onClick={() => setIsFilterOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange rounded-md p-1 cursor-pointer"
                  >
                    <XMarkIcon className="w-4 h-4 text-white" />
                  </motion.button>
                </div>

                {/* zipcode chips */}
                <div className="mb-2 border-b border-darkGrey">Zipcode</div>
                <div className="flex flex-wrap gap-2">
                  {zipcodes.map((zip) => {
                    const zipStr = String(zip); // ✅ ensure always string
                    return (
                      <button
                        key={zipStr}
                        onClick={() => toggleZip(zipStr)}
                        className={`px-3 py-1 rounded-full border cursor-pointer ${selectedZips.includes(zipStr)
                          ? "bg-orange text-white border-orange"
                          : "bg-gray-100 hover:bg-gray-200"
                          }`}
                      >
                        {zipStr}
                      </button>
                    );
                  })}
                </div>

                {/* actions */}
                <div className="flex justify-end space-x-3">
                  {
                    selectedZips.length > 0 && (
                      <button
                        onClick={() => {
                          onZipSelect?.([]);
                          setIsFilterOpen(false);
                        }}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 w-full cursor-pointer mt-6"
                      >
                        Reset Filters
                      </button>
                    )
                  }
                </div>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
};

export default PageHeader;
