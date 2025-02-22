import axios from "axios";
import { BASE_URI } from "../../config/config";
import customAxios from "../../config/axiosInterceptor";

export const createReelByApi = async (data) => {
  const headers = { "Content-Type": "multipart/form-data" };
  const response = await customAxios.post(`${BASE_URI}/reel/create`, data, {
    headers,
  });
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getAllReelsFromApi = async () => {
  const response = await customAxios.get(`${BASE_URI}/reel/all`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
