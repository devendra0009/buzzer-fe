import customAxios from "../../config/axiosInterceptor";
import { BASE_URI } from "../../config/config";

export const uploadDocs = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // Make the POST request with FormData
  const response = await customAxios.post(`${BASE_URI}/upload/file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
