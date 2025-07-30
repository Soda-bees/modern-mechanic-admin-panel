import { cookies } from "next/headers";

export const dynamic = "force-dynamic"; // prevent static export

export async function GET() {
  const cookieStore = await cookies(); // ✅ No await
  const token = cookieStore.get("token")?.value || null;
  return Response.json({ token });
}
