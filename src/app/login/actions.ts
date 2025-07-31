'use server'

import { handleLogin } from "@/services/api"
import { cookies } from "next/headers"

export async function loginUser({ email, password }: ILogin) {
    try {
        const cookieStore = await cookies()
        const body = { email, password }
        const response = await handleLogin(body) as LoginResponse
        if (response?.data?.success) {
            const token = response?.data?.token
            cookieStore.set('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'lax',
                path: '/',
            })
            return { success: true , token:response?.data?.token}
        } else {
            return { success: false, message: 'response error' }
        }
    } catch (error) {
        return { success: false, message: 'error', error }
    }
}