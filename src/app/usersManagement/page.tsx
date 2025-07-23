"use client";

import { useEffect, useState } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import ProtectedRoute from "@/component/ProtectedRoute";
import PageHeader from "@/component/PageHeader";

type User = {
  id: number;
  name: string;
  email: string;
  zip: string;
  vehicles: number;
  scans: number;
  complaints: number;
};

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data: User[] = await new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              Array(10)
                .fill(null)
                .map((_, i) => ({
                  id: i + 1,
                  name: "Jordan",
                  email: "jordan124@gmail.com",
                  zip: "21564",
                  vehicles: 3,
                  scans: 13,
                  complaints: 13,
                }))
            );
          }, 500)
        );
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="w-full px-4 sm:px-6 py-6">
        <PageHeader
          title="Users Management"
          showFilter
          // onFilterClick={() => alert("filter clicked!")}
        />

        <div className="mt-6">
          {loading ? (
            <div className="text-center text-sm text-gray-500 py-10">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-10">
              No users found.
            </div>
          ) : (
            <>
              {/* Desktop View */}
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
                      {/* <th className="px-4 py-2">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="bg-white rounded-xl shadow-sm text-sm text-gray-800 cursor-pointer"
                      >
                        <td className="px-4 py-4 rounded-l-xl">{user.name}</td>
                        <td className="px-4 py-4">{user.email}</td>
                        <td className="px-4 py-4">{user.zip}</td>
                        <td className="px-4 py-4">
                          {String(user.vehicles).padStart(2, "0")}
                        </td>
                        <td className="px-4 py-4">{user.scans}</td>
                        <td className="px-4 py-4 rounded-r-xl">{user.complaints}</td>
                        {/* <td className="px-4 py-3 rounded-r-xl">
                          <button className="p-1 rounded hover:bg-gray-100">
                            <EllipsisVerticalIcon className="w-4 h-4" />
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-white rounded-xl shadow-sm p-4 text-sm text-gray-800"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold text-base">{user.name}</div>
                      {/* <button className="p-1 rounded hover:bg-gray-100">
                        <EllipsisVerticalIcon className="w-4 h-4" />
                      </button> */}
                    </div>
                    <div className="text-gray-600 text-sm mb-1">
                      {user.email}
                    </div>
                    <div className="grid grid-cols-2 gap-y-1 text-sm">
                      <div>
                        <span className="text-gray-500">Zip:</span> {user.zip}
                      </div>
                      <div>
                        <span className="text-gray-500">Vehicles:</span>{" "}
                        {String(user.vehicles).padStart(2, "0")}
                      </div>
                      <div>
                        <span className="text-gray-500">Scans:</span>{" "}
                        {user.scans}
                      </div>
                      <div>
                        <span className="text-gray-500">Complaints:</span>{" "}
                        {user.complaints}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
