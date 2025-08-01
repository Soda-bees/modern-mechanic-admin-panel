"use server";

export async function submitComplaint(formData: FormData) {
  //   const email = formData.get('email') ;
  //   const password = formData.get('password') ;
  const { email, password } = Object.fromEntries(formData.entries());
  // You can now handle this data (e.g., save to DB, API call)
  console.log("Complaint submitted:", { email, password });

  return;
}
