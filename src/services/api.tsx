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
    const response = await axiosInstance.get("admin/getAllUsers");
    return response;
  } catch (error) {
    return error;
  }
};

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
