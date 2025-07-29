"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";
import { handleGetAllUser } from "@/services/api";
import Loader from "@/component/loader";
import { useSearch } from "@/context/SearchContext";

type Cars = {
  id: number;
  image: string;
  make: string;
  model: string;
  selected: boolean;
  transmission: string;
  user_id: number;
  year: number
}

type User = {
  id: number;
  user_name: string;
  email: string;
  zip_code: string;
  cars: Cars[];
  total_complaints: number;
  total_scans: number
};

type Response = {
  data: {
    message: string;
    success: boolean;
    data: User[]
  };
};

export default function Usersmanagement() {
  const { search } = useSearch()

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getUsers = async () => {
    try {
      const response = await handleGetAllUser() as Response
      console.log("get all user", response?.data);
      if (response?.data?.success) {
        setUsers(response?.data?.data)
      } else {
        alert("Something went wrong!")
      }
    } catch (error) {
      alert("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

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

  const filteredUser = users.filter((user) =>
    user.user_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className="w-full px-4 sm:px-6 py-6">
        <PageHeader
          title="Users Management"
          showFilter
        />
        <div className="mt-6">
          {loading ? (
            <Loader />
          ) : filteredUser.length > 0 ? (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-left text-sm text-grey">
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Zip code</th>
                      <th className="px-4 py-2">Vehicles</th>
                      <th className="px-4 py-2">Scans</th>
                      <th className="px-4 py-2">Complaints</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUser.map((user) => (
                      <tr
                        key={user.id}
                        className="bg-white rounded-xl shadow-sm text-sm text-gray-800 cursor-pointer"
                      >
                        <td className="px-4 py-4 rounded-l-xl">{
                        highlightText(user.user_name , search)
                        }</td>
                        <td className="px-4 py-4">{user.email}</td>
                        <td className="px-4 py-4">{user.zip_code}</td>
                        <td className="px-4 py-4">
                          {String(user.cars.length).padStart(2, "0")}
                        </td>
                        <td className="px-4 py-4">
                          {String(user.total_scans).padStart(2, "0")}
                        </td>
                        <td className="px-4 py-4 rounded-r-xl">
                          {String(user.total_complaints).padStart(2, "0")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-xl shadow-sm p-4 text-sm text-gray-800"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-base">{user.user_name}</div>
                    </div>
                    <div className="text-gray-600 text-sm mb-1">
                      {user.email}
                    </div>
                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                      <div>
                        <span className="text-gray-500">Zip:</span> {user.zip_code}
                      </div>
                      <div>
                        <span className="text-gray-500">Vehicles:</span>{" "}
                        {String(user.cars.length).padStart(2, "0")}
                      </div>
                      <div>
                        <span className="text-gray-500">Scans:</span>{" "}
                        {String(user.total_scans).padStart(2, "0")}
                      </div>
                      <div>
                        <span className="text-gray-500">Complaints:</span>{" "}
                        {String(user.total_complaints).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-sm text-gray-500 py-10">
              No users found.
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
