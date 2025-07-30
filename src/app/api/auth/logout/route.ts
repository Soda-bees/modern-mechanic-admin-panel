import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'; // prevent static export

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'token',
        value: '',
        maxAge: 0,       // expire immediately
        path: '/',       // match original path
        httpOnly: true,  // keep same security flags
        secure: true,
        sameSite: 'lax',
    });

    return Response.json({ success: true, message: 'Logged out' });
}
