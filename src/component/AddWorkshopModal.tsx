'use client'

import React, { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddWorkshopModal({ setIsOpen }: Props) {
  const [showModal, setShowModal] = useState(true)

  const handleClose = () => {
    setShowModal(false)
    setTimeout(() => setIsOpen(false), 200)
  }

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
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className='flex flex-row items-center justify-between'>
              <h2 className="text-xl font-semibold ">Add New Workshop</h2>
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} className='bg-orange cursor-pointer rounded-md'>
                <XMarkIcon className="w-7 h-7 text-white" />
              </motion.button>
            </div>
            <p className="mb-4">Form goes here</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
