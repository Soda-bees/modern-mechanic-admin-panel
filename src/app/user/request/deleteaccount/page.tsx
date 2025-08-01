// "use client";
// import { useState } from "react";
// import { submitComplaint } from "./submitComplaint";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// export default function DeleteUserAccount() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   return (
//     <form action={submitComplaint}>
//       <div className="min-h-screen flex flex-col">
//         <div className="bg-orange py-6 flex justify-center">
//           <h1 className="text-3xl font-bold text-white flex items-center gap-2">
//             <span role="img" aria-label="logo">
//               😊
//             </span>{" "}
//             Modern Mechanic
//           </h1>
//         </div>

//         <div className="mt-20 flex items-center justify-center px-4">
//           <div className="w-full max-w-4xl text-center">
//             <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4">
//               We’re Sad to See You Go <span className="text-xl">☹️</span>
//             </h2>
//             <p className="text-base md:text-lg text-black mb-8 px-2">
//               Deleting your account will permanently erase all your data,
//               including your profile, connections, messages, and preferences. If
//               you’re experiencing any issues or need help, our support team is
//               here for you. Before making this final decision, feel free to
//               reach out or explore other options like pausing your account.
//             </p>

//             <div className="mb-4 relative w-full max-w-lg mx-auto text-black">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 required
//                 className="w-full px-12 py-3 border border-gray-300 rounded-full focus:outline-none"
//               />
//               <span className="absolute left-4 top-3 text-gray-400">👤</span>
//             </div>

//             <div className="mb-6 relative w-full max-w-lg mx-auto text-black">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 required
//                 className="w-full px-12 py-3 border border-gray-300 rounded-full focus:outline-none"
//               />
//               <span className="absolute left-4 top-3 text-gray-400">🔒</span>
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-3 text-gray-500"
//               >
//                 {showPassword ? (
//                   <EyeIcon className="h-5 w-5" />
//                 ) : (
//                   <EyeSlashIcon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>

//             <button
//               className="px-10 max-w-md mx-auto px-10 bg-orange text-white font-semibold py-3 rounded-md cursor-pointer"
//               onClick={() => setShowConfirmModal(true)}
//             >
//               Delete My Account
//             </button>
//           </div>
//         </div>
//         {showConfirmModal && (
//           <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
//               <h2 className="text-xl font-semibold mb-4 text-black">
//                 Are you sure you want to delete your account permanently?
//               </h2>
//               <p className="text-sm text-gray-600 mb-6">
//                 This action cannot be undone.
//               </p>

//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => setShowConfirmModal(false)}
//                   className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   //   onClick={handleDelete}
//                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition cursor-pointer"
//                 >
//                   Yes, Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </form>
//   );
// }

// {
//   /* <div>
//   <label>email</label>
//   <input type="text" name="email" required />
// </div>
// <div>
//   <label>password</label>
//   <textarea name="password" required />
// </div>
// <button type="submit">Submit</button> */
// }

"use client";
import { useState, useRef } from "react";
import { verifyUser, deleteAccount } from "./submitComplaint";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function DeleteUserAccount() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [token, setToken] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleFirstSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const res = await verifyUser(formData);
    console.log("res=-=-=->", res);
    if (res?.success && res?.token) {
      setToken(res.token);
      setFormValues(values);
      setShowConfirmModal(true);
    } else {
      alert(res?.message);
    }
  };

  const handleDeleteConfirmed = async () => {
    const res = await deleteAccount(token);
    if (res?.success) {
      setShowConfirmModal(false);
      alert(res?.message);
    } else {
      setShowConfirmModal(false);
      alert(res?.message);
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleFirstSubmit}>
        <div className="min-h-screen flex flex-col">
          <div className="bg-orange py-6 flex justify-center">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <span role="img" aria-label="logo">
                😊
              </span>{" "}
              Modern Mechanic
            </h1>
          </div>

          <div className="mt-20 flex items-center justify-center px-4">
            <div className="w-full max-w-4xl text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-black mb-4">
                We’re Sad to See You Go <span className="text-xl">☹️</span>
              </h2>
              <p className="text-base md:text-lg text-black mb-8 px-2">
                Deleting your account will permanently erase all your data. If
                you’re experiencing any issues, feel free to reach out.
              </p>

              <div className="mb-4 relative w-full max-w-lg mx-auto text-black">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-12 py-3 border border-gray-300 rounded-full focus:outline-none placeholder-black"
                />
                <span className="absolute left-4 top-3 text-gray-400">👤</span>
              </div>

              <div className="mb-6 relative w-full max-w-lg mx-auto text-black">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-12 py-3 border border-gray-300 rounded-full focus:outline-none placeholder-black"
                />
                <span className="absolute left-4 top-3 text-gray-400">🔒</span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-gray-500"
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="px-10 max-w-md mx-auto bg-orange text-white font-semibold py-3 rounded-md"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </form>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Are you sure you want to delete your account permanently?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
