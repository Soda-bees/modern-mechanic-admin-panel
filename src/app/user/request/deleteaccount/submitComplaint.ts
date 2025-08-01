// "use server";

// export async function submitComplaint(formData: FormData) {
//   //   const email = formData.get('email') ;
//   //   const password = formData.get('password') ;
//   const { email, password } = Object.fromEntries(formData.entries());
//   // You can now handle this data (e.g., save to DB, API call)
//   console.log("Complaint submitted:", { email, password });

//   return;
// }

"use server";

import { handleDeleteAccount, handleEmailVerification } from "@/services/api";

export async function verifyUser(formData: FormData) {
  const { email, password } = Object.fromEntries(formData.entries());
  console.log("Verifying:", typeof password);
  try {
    const body = { email, password };
    const response = (await handleEmailVerification(
      body
    )) as GetUserDeleteResponse;
    if (response?.data?.success) {
      return response?.data;
    } else {
      return response.data;
    }
  } catch (error) {
    return { success: false, message: "Something wents wrong!" };
  }
}

export async function deleteAccount(token: string | null) {
  try {
    const response = (await handleDeleteAccount(token)) as { data: any };
    console.log("deleteAccount", response?.data);
    if (response?.data?.success) {
      return { message: "Account deleted!", success: true };
    } else {
      return { message: "Something went wrong!", success: false };
    }
  } catch (error) {
    return { message: "Something went wrong!", success: true };
  }
  // Delete logic
  // return { success: true };
}
