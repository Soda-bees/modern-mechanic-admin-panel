import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; 

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return Response.json({ token });
}
