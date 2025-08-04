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

export const handleGetAllWorkshop = async () => {
  try {
    const response = await axiosInstance.get("admin/adminGetAllWorkshops");
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
  console.log("workshop id" , body.id);
  
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

export const handleQueries = async () => {
  try {
    const response = await axiosInstance.get("admin/get_admin_workshop_queries");
    return response.data
  } catch (error) {
    return error;
  }
};
