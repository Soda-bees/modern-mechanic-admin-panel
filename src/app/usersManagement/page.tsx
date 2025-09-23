"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/component/PageHeader";
import Loader from "@/component/loader";
import { useSearch } from "@/context/SearchContext";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchUsers, selectLoadings, selectUsers } from "@/lib/features/adminData/adminDataSlice";

export default function Usersmanagement() {
  const { loadingUser } = useAppSelector(selectLoadings)
  const { search, setPlaceholder } = useSearch()
  const dispatch = useAppDispatch()

  const users = useAppSelector(selectUsers)

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedZips, setSelectedZips] = useState<string[]>([]);
  const uniqueZipcodes = Array.from(new Set(users.map((u) => u.zip_code)));

  useEffect(() => {
    setPlaceholder('Search users by name...');
    return () => {
      setPlaceholder("Search...");
    };
  }, [setPlaceholder])

  const getUsers = async () => {
    if (!loadingUser) {
      dispatch(fetchUsers());
    }
  }

  // const highlightText = (text: string, query: string) => {
  //   if (!query) return text;

  //   const regex = new RegExp(`(${query})`, "gi");
  //   const parts = text.split(regex);

  //   return parts.map((part, index) =>
  //     part.toLowerCase() === query.toLowerCase() ? (
  //       <span key={index} style={{ backgroundColor: "yellow", fontWeight: 'bold', fontSize: 16 }}>
  //         {part}
  //       </span>
  //     ) : (
  //       part
  //     )
  //   );
  // };

  const highlightText = (text: string, queries: string | string[]) => {
    if (!queries || (Array.isArray(queries) && queries.length === 0)) return text;

    const list = Array.isArray(queries) ? queries : [queries];
    const regex = new RegExp(`(${list.join("|")})`, "gi");

    const parts = String(text).split(regex);

    return parts.map((part, index) =>
      list.some((q) => part.toLowerCase() === q.toLowerCase()) ? (
        <span
          key={index}
          style={{ backgroundColor: "yellow", fontWeight: "bold", fontSize: 16 }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };


  // const filteredUser = users.filter((user) =>
  //   user.user_name.toLowerCase().includes(search.toLowerCase())
  // );


  const filteredUser = users.filter((user) => {
    const nameMatch = (user.user_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const zipMatch = String(user.zip_code || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    // check against selected zips
    const userZip = String(user.zip_code || "");
    const zipSelected =
      selectedZips.length === 0 || selectedZips.includes(userZip);

    return (nameMatch || zipMatch) && zipSelected;
  });

  return (
    <div className="w-full px-4 sm:px-6 py-6">
      <PageHeader
        title="Users Management"
        showReload showFilter
        onReloadClick={getUsers}
        isLoading={loadingUser}
        zipcodes={uniqueZipcodes}
        selectedZips={selectedZips}   // ✅ fix here
        onZipSelect={setSelectedZips}
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
                        highlightText(user.user_name, search)
                      }</td>
                      <td className="px-4 py-4">{user.email}</td>
                      <td className="px-4 py-4">  {highlightText(user.zip_code, selectedZips)}</td>
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
          <div className="text-center text-sm text-gray-500 py-10 text-xl">
            We couldn’t find any users for this name.
          </div>
        )}
      </div>
    </div>
  );
}
