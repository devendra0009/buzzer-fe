import customAxios from "../../config/axiosInterceptor";
import { BASE_URI } from "../../config/config";

export const getAllChatsForCurrUserFromApi = async () => {
    const response = await customAxios.get(`${BASE_URI}/chat/user/get`);
    return {
      status: response.status,
      success: true,
      message: response.data.message,
      data: response.data,
    };
  };
  

export const getChatByIdFromApi = async (chatId) => {
    const response = await customAxios.get(`${BASE_URI}/chat/get/${chatId}`);
    return {
      status: response.status,
      success: true,
      message: response.data.message,
      data: response.data,
    };
  };
  