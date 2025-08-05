import { axiosInstance } from "@/lib/axios";
import { APIError } from "@/types/error";
import axios from "axios";

export const handleLogin = async (body: ILogin) => {
  try {
    const response = await axiosInstance.post("admin/login", body);
    return response;
  } catch (error) {
    return error;
  }
};

export const handleGetAllUser = async (): Promise<GetAllUserResponse> => {
  try {
    const response = await axiosInstance.get<GetAllUserResponse>("admin/getAllUsers")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as APIError;
    }
    throw new Error("Unexpected error occurred");
  }
};

export const uploadWorkshopImg = async (data: FormData) => {
  try {
    const response = await axiosInstance.post("user/upload_image", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const handleAddWorkshop = async (body: addWorkshopform) => {
  try {
    const response = await axiosInstance.post(
      "admin/adminCreateWorkshop",
      body
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const handleGetAllWorkshop = async ():Promise<getAllWorkshopResponse> => {
  try {
    const response = await axiosInstance.get<getAllWorkshopResponse>("admin/adminGetAllWorkshops");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as APIError;
    }
    throw new Error("Unexpected error occurred");
  }
};

export const handleScanResult = async (): Promise<GetAllScanResponse> => {
  try {
    const response = await axiosInstance.get<GetAllScanResponse>("admin/getAllScans");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as APIError;
    }
    throw new Error("Unexpected error occurred");
  }
};

export const handleComplaints = async (): Promise<GetAllComplaintsResponse> => {
  try {
    const response = await axiosInstance.get<GetAllComplaintsResponse>("admin/getAllComplaints");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as APIError;
    }
    throw new Error("Unexpected error occurred");
  }
};

export const handleGetWorkshopDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`admin/workshop/${id}`);
    if (response?.data?.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const handleGetComplaintDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`admin/complaint/${id}`);
    if (response?.data?.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const handleGetScanDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`admin/scan/${id}`);
    if (response?.data?.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const handleGetSummary = async () => {
  try {
    const response = await axiosInstance.get("admin/summary");
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteWorkshop = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`admin/delete_workshop/${id}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const handleEditWorkshop = async (body: addWorkshopform) => {
  console.log("workshop id", body.id);

  try {
    const response = await axiosInstance.put(`admin/edit_workshop/${body.id}`, body)
    return response
  } catch (error) {
    return error
  }
}


export const handleEmailVerification = async (body: {
  email: FormDataEntryValue | string;
  password: FormDataEntryValue | string;
}) => {
  try {
    const response = await axiosInstance.post("auth/user_authentication", body);
    return response;
  } catch (error) {
    return error;
  }
};

export const handleDeleteAccount = async (token: string | null) => {
  try {
    const response = await axiosInstance.delete("auth/delete_user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const handleQueries = async (): Promise<GetQueriesResponse> => {
  try {
    const response = await axiosInstance.get<GetQueriesResponse>("admin/get_admin_workshop_queries");
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error as APIError;
    }
    throw new Error("Unexpected error occurred");
  }
};
