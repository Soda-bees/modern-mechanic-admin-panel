"use client";

import { ReactNode } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import HoverAnimation from "./hoverAnimation";

const PageHeader = ({
  title,
  showFilter = false,
  onFilterClick,
  addShowButton = false,
  buttonTitle,
  onAddShowClick,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-grey w-full">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-black">{title}</h1>
        {addShowButton && (
          <motion.button
            onClick={onAddShowClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-orange rounded-2xl px-4 py-2 text-xs sm:text-sm cursor-pointer font-semibold curson-pointer ml-4"
          >
            {buttonTitle}
          </motion.button>
        )}
      </div>

      {showFilter && (
        <HoverAnimation onClick={onFilterClick}>
          <AdjustmentsHorizontalIcon className="w-8 cursor-pointer text-black" />
        </HoverAnimation>
      )}
    </div>
  );
};

export default PageHeader;
