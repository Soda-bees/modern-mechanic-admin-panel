import { axiosInstance } from "@/lib/axios"

export const handleLogin = async (body: ILogin) => {
    try {
        const response = await axiosInstance.post('admin/login', body)
        return response
    } catch (error) {
        return error
    }
}

export const handleGetAllUser = async () => {
    try {
        const response = await axiosInstance.get('admin/getAllUsers')
        return response
    } catch (error) {
        return error
    }
}