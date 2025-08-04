'use server';

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import { handleLogin } from "@/services/api";

export async function login({ email, password }: ILogin) {
    try {
        const cookieStore = await cookies()
        const body = { email, password }
        const response = await handleLogin(body) as LoginResponse
        if (response?.data?.success) {
            const token = response?.data?.token
            await createSession(token)
            return { success: true , token:response?.data?.token}
        } else {
            return { success: false, message: 'response error' }
        }
    } catch (error) {
        return { success: false, message: 'error', error }
    }
}

export async function logout() {
    await deleteSession()
    redirect('/login')
}