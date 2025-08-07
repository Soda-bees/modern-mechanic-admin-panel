"use client";

import React, { useEffect, useState } from "react";
import { XMarkIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { handleAddWorkshop, handleEditWorkshop, uploadWorkshopImg } from "@/services/api";
import Loader from "./loader";
import SimpleButton from "./simpleButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { addNewWorkshopRedux, editWorkshopRedux } from "@/lib/features/adminData/adminDataSlice";

export default function AddWorkshopModal({ setIsOpen, workshop }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter()
  const dispatch = useAppDispatch()

  const value = searchParams.get('modal')

  const [showModal, setShowModal] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [uploadImgLoader, setUploadImgLoader] = useState<boolean>(false)
  const [isAdd, setIsAdd] = useState<boolean | null>(null)
  const [workshopId, setWorkshopId] = useState<string | null>(null);
  const [form, setForm] = useState<addWorkshopform>({
    name: "",
    email: "",
    phone_number: "",
    zipcode: "",
    website_link: "",
    address: "",
    description: "",
  });
  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    if (value === 'add') {
      setIsAdd(true)
    } else if (value === 'edit') {
      setIsAdd(false)
      if (workshop) {
        setImage(workshop?.image)
        setWorkshopId(workshop.id.toString())
        setForm({
          name: workshop.name || "",
          email: workshop.email || "",
          phone_number: workshop.phone_number || "",
          zipcode: workshop.zipcode || "",
          website_link: workshop.website_link || "",
          address: workshop.address || "",
          description: workshop.description || "",
        });
      } else {
        alert("Something went wrong. Please try again!")
      }
    }
  }, [searchParams])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadImgLoader(true)
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("imageUri", file);
      const response = await uploadWorkshopImg(formData) as uploadImg
      if (response?.data?.success) {
        setImage(response?.data?.url)
      } else {
        alert("Something went wrong!")
      }
    } catch (error) {
      alert("Something went wrong!")
    } finally {
      setUploadImgLoader(false)
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    if (!uploadImgLoader && !loader) {
      setIsAdd(null)
      router.back()
      setShowModal(false);
      setTimeout(() => setIsOpen(false), 200);
    }
  };

  function validateForm(form: addWorkshopform): string | null {
    if (!image) { return "Image is required" }
    // Name
    if (!form.name.trim()) return "Name is required";

    // Email
    if (!form.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Invalid email address";

    // Number
    if (!form.phone_number.trim()) return "Phone number is required";
    if (!/^\d{7,15}$/.test(form.phone_number)) return "Invalid phone number";

    // Zipcode
    if (!form.zipcode.trim()) return "Zipcode is required";
    if (!/^\d{4,10}$/.test(form.zipcode)) return "Invalid zipcode";

    // Website (optional format check)
    if (!form.website_link) {
      return ("Invalid website URL");
    }
    // Address
    if (!form.address.trim()) return "Address is required";

    // Description
    if (!form.description.trim()) return "Description is required";

    return null;
  }

  const handleContinue = async () => {
    try {
      setLoader(true)
      const error = validateForm(form);
      if (error) {
        alert(error);
        return;
      }
      const updatedForm = {
        ...form,
        image
      }
      const response = await handleAddWorkshop(updatedForm) as addWorkshopResponse
      if (response?.data?.success) {
        dispatch(addNewWorkshopRedux({ workshop: response?.data?.data }))
        alert('Workshop added successfully!')
        // if (getWorkshop) {
        //   getWorkshop()
        // }
        setIsOpen(false)
      } else {
        alert("Something went wrong. Please try again!")
      }
    } catch (error) {
      alert("Something went wrong. Please try again!")
    } finally {
      setLoader(false)
    }
  }

  const handleEdit = async () => {
    try {
      if (!workshopId) {
        alert("Something went wrong. Please try again!")
        return
      }
      setLoader(true)
      const error = validateForm(form);
      if (error) {
        alert(error);
        return;
      }
      const updatedForm = {
        ...form,
        image,
        id: workshopId
      }
      const response = await handleEditWorkshop(updatedForm) as addWorkshopResponse
      if (response?.data?.success) {
        dispatch(editWorkshopRedux({ workshop: response?.data?.data }))
        setForm
        alert('Workshop edit successfully!')
        setIsAdd(null)
        setShowModal(false)
        setTimeout(() => setIsOpen(false), 200);
        router.push(`/workshops/${workshopId}`)
      }
    } catch (error) {
      alert("Something went wrong. Please try again!")
    } finally {
      setLoader(false)
    }
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999] p-4"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl w-full max-w-xl shadow-lg max-h-[90vh] overflow-y-scroll scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {isAdd ? 'Add New Workshop' : 'Edit Workshop'}
              </h2>
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange rounded-md p-1 cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>
            <div className="w-full flex justify-center mb-4">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <div
                className="w-full sm:w-50 h-40 flex flex-col items-center justify-center rounded-2xl bg-headerBG cursor-pointer"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                {uploadImgLoader ? (
                  <Loader size="14" />
                ) : image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-2xl"
                  />
                ) : (
                  <>
                    <CloudArrowUpIcon className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload Image</p>
                  </>
                )}
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
                className="w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none"
              />
              <div className="flex space-x-3 flex-col sm:flex-row ">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className="sm:w-1/2 w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none"
                />
                <input
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  type="text"
                  placeholder="Number"
                  className="sm:w-1/2 w-full mt-2 sm:mt-0 rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none"
                />
              </div>
              <div className="flex space-x-3 flex-col sm:flex-row">
                <input
                  name="zipcode"
                  value={form.zipcode}
                  onChange={handleChange}
                  type="text"
                  placeholder="Zip code"
                  className="sm:w-1/2 w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none"
                />
                <input
                  name="website_link"
                  value={form.website_link}
                  onChange={handleChange}
                  type="text"
                  placeholder="Website Link"
                  className="sm:w-1/2 w-full mt-2 sm:mt-0 rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none"
                />
              </div>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                placeholder="Address"
                className="w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey focus:outline-none"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short Description"
                className="w-full rounded-md px-4 py-4 bg-headerBG text-black placeholder-grey h-24 resize-none focus:outline-none"
              />
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-center sm:w-[80%] md:w-[50%] mx-auto">
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange text-white px-6 py-4 rounded-lg font-semibold transition duration-300 text-xl cursor-pointer"
                onClick={handleContinue}
              >
                Save Workshop
              </motion.button> */}
              <SimpleButton title="Save Workshop" loader={loader} onClick={() => isAdd ? handleContinue() : handleEdit()} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
