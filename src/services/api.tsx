import { axiosInstance } from "@/lib/axios"

export const handleLogin = async (body: ILogin) => {
    try {
        const response = await axiosInstance.post('admin/login', body)
        return response
    } catch (error) {
        return error
    }
}