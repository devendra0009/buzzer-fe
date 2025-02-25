import axios from "axios";
import { BASE_URI } from "../../config/config";
import customAxios from "../../config/axiosInterceptor";
import { DEFAULT_PAGE_SIZE } from "../../helpers/helpers";

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

export const getAllReelsFromApi = async (
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/reel/all`, {
    params: {
      page,
      size,
    },
  });
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data.data.data,
  };
};
//shubham
