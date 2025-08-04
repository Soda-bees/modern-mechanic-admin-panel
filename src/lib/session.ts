import 'server-only'
import { cookies } from 'next/headers'

export async function createSession(token: string) {
    const cookieStore = await cookies()
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}