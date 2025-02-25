import customAxios from "../../config/axiosInterceptor";
import { BASE_URI } from "../../config/config";
import { DEFAULT_PAGE_SIZE } from "../../helpers/helpers";

export const getAllChatsForCurrUserFromApi = async (
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/chat/user/get`, {
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

export const getChatByIdFromApi = async (chatId) => {
  const response = await customAxios.get(`${BASE_URI}/chat/get/${chatId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
