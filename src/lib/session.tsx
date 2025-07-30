import { cookies } from 'next/headers'

export async function getCookies() {
    const cookie = (await cookies()).get('session')?.value
    return cookie
}