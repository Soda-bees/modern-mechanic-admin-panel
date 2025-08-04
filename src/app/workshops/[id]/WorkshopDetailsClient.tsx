"use client";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConformationModal from "@/component/conformationModal";
import { customImageLoader } from "@/lib/imageLoader";
import Image from "next/image";
import Link from "next/link";
import { deleteWorkshop } from "@/services/api";
import { useRouter } from "next/navigation";
import AddWorkshopModal from "@/component/AddWorkshopModal";

export default function WorkshopDetailsClient({ workshop }: { workshop: IWorkshop }) {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

    const handleDeleteWorkshop = async () => {
        try {
            const response = await deleteWorkshop(workshop.id.toString()) as DeleteWorkshopResponse
            if (response?.success) {
                setIsModalOpen(false)
                alert("Workshop deleted successfully.");
                router.push("/workshops");
            } else {
                alert("Something went wrong.Try again!");
            }
        } catch (error) {
            alert("Something went wrong.Try again!")
        }
    }

    const handleOpenModal = async () => {
        router.push("?modal=edit");
        setTimeout(() => {
            setIsEditModalVisible(true);
          }, 600);
    }

    return (
        <div className="flex flex-col items-center px-4 py-6">
            <div className="w-full max-w-5xl mb-4 ">
                <div className="hidden sm:flex justify-start">
                    <div className="border p-1 rounded-xl w-24 border-borderGray">
                        <Link href="/workshops" className="text-base text-black font-semibold flex justify-center">
                            〱 Back
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center w-full max-w-5xl mt-10">
                <Image
                    loader={customImageLoader}
                    src={workshop.image}
                    alt="Workshop Logo"
                    width={300}
                    height={300}
                    className="border border-borderGray rounded-3xl mb-4 sm:mb-0 p-6 object-contain"
                />

                <div className="sm:ml-6 w-full sm:w-auto text-black">
                    <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                        {workshop.name}
                    </h2>
                    <p>Website: <a className="font-semibold cursor-pointer hover:underline text-blue-600" href={workshop.website_link} target="_blank">{workshop.website_link}</a></p>
                    <p>Email: <span className="font-semibold">{workshop.email}</span></p>
                    <p>Zipcode: <span className="font-semibold">{workshop.zipcode}</span></p>
                    <p>Phone: <span className="font-semibold">{workshop.phone_number}</span></p>
                    <p>Address: <span className="font-semibold">{workshop.address}</span></p>
                </div>
            </div>

            <div className="mt-6 w-full max-w-5xl">
                <h3 className="text-base font-medium text-black mb-1">Short Description:</h3>
                <p className="text-lg font-semibold text-black">{workshop.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-6 border-t border-borderGray w-full max-w-5xl pt-4">
                <button
                    onClick={handleOpenModal}
                    className="flex items-center px-4 py-2 rounded-lg border border-borderGray w-auto cursor-pointer">
                    <PencilIcon className="h-4 w-4 text-black" />
                    <p className="text-black ml-2 text-sm">Edit Shop</p>
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center px-4 py-2 rounded-lg bg-orange w-auto cursor-pointer"
                >
                    <TrashIcon className="h-4 w-4 text-white" />
                    <p className="text-white ml-2 text-sm">Delete</p>
                </button>
            </div>
            {isModalOpen && <ConformationModal onClick={handleDeleteWorkshop}
                setOpen={setIsModalOpen} open={isModalOpen} title="Delete Workshop"
                description="Are you sure you want to delete this workshop? All data will be permanently removed. This action cannot be undone." />}
            {isEditModalVisible && <AddWorkshopModal setIsOpen={setIsEditModalVisible} workshop={workshop} />}
        </div>
    );
}
