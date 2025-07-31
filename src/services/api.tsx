import { axiosInstance } from "@/lib/axios";

export const handleLogin = async (body: ILogin) => {
  try {
    const response = await axiosInstance.post("admin/login", body);
    return response;
  } catch (error) {
    return error;
  }
};

export const handleGetAllUser = async () => {
    try {
        const response = await axiosInstance.get('admin/getAllUsers')
        return response
    } catch (error) {
        return error
    }
}

export const uploadWorkshopImg = async (data: FormData) => {
    try {
        const response = await axiosInstance.post('user/upload_image', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response
    } catch (error) {
        return error
    }
}

export const handleAddWorkshop = async (body: addWorkshopform) => {
    try {
        const response = await axiosInstance.post('admin/adminCreateWorkshop', body)
        return response
    } catch (error) {
        return error
    }
}

export const handleGetAllWorkshop = async () => {
    try {
        const response = await axiosInstance.get('admin/adminGetAllWorkshops')
        return response
    } catch (error) {
        return error
    }
}

export const handleScanResult = async () => {
  try {
    const response = await axiosInstance.get("admin/getAllScans");
    return response;
  } catch (error) {
    return error;
  }
};


export const handleComplaints = async () => {
  try {
    const response = await axiosInstance.get("admin/getAllComplaints");
    return response;
  } catch (error) {
    return error;
  }
};
