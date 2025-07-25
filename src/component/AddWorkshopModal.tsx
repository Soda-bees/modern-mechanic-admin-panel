// 'use client'

// import React, { useState } from 'react'
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { AnimatePresence, motion } from 'framer-motion';

// type Props = {
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export default function AddWorkshopModal({ setIsOpen }: Props) {
//   const [showModal, setShowModal] = useState(true)

//   const handleClose = () => {
//     setShowModal(false)
//     setTimeout(() => setIsOpen(false), 200)
//   }

//   return (
//     <AnimatePresence>
//       {showModal && (
//         <motion.div
//           className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]"
//           onClick={handleClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
//             onClick={(e) => e.stopPropagation()}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             transition={{ duration: 0.3, ease: 'easeOut' }}
//           >
//             <div className='flex flex-row items-center justify-between'>
//               <h2 className="text-xl font-semibold ">Add New Workshop</h2>
//               <motion.button
//                 onClick={handleClose}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }} className='bg-orange cursor-pointer rounded-md'>
//                 <XMarkIcon className="w-7 h-7 text-white" />
//               </motion.button>
//             </div>
//             <p className="mb-4">Form goes here</p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

"use client";

import React, { useState } from "react";
import { XMarkIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddWorkshopModal({ setIsOpen }: Props) {
  const [showModal, setShowModal] = useState(true);

  // Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    zipcode: "",
    website: "",
    address: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl w-full max-w-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Workshop</h2>
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 rounded-md p-1"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Upload Image Placeholder */}
            <div className="w-full flex justify-center mb-4">
              <div className="w-50 h-40 flex flex-col items-center justify-center rounded-2xl bg-headerBG cursor-pointer">
                <CloudArrowUpIcon className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload Image</p>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
                className="w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-grey"
              />
              <div className="flex space-x-3">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className="w-1/2 rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-grey"
                />
                <input
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  type="text"
                  placeholder="Number"
                  className="w-1/2 rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-grey"
                />
              </div>
              <div className="flex space-x-3">
                <input
                  name="zipcode"
                  value={form.zipcode}
                  onChange={handleChange}
                  type="text"
                  placeholder="Zip code"
                  className="w-1/2 rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-grey"
                />
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  type="text"
                  placeholder="Website Link"
                  className="w-1/2 rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-grey"
                />
              </div>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                placeholder="Address"
                className="w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none focus:ring-2 focus:ring-grey"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey h-24 resize-none focus:outline-none focus:ring-2 focus:ring-grey"
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-center">
              <button
                className="bg-orange text-white px-6 py-4 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 text-xl"
                onClick={handleClose}
              >
                Save Workshop
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
