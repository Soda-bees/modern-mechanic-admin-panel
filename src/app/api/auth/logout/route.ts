import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'; 

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete('token')

    return Response.json({ success: true, message: 'Logged out' });
}
