import customAxios from "../../config/axiosInterceptor";
import { BASE_URI } from "../../config/config";
import { DEFAULT_PAGE_SIZE } from "../../helpers/helpers";

export const createNewChat = async (usersIdArray: any) => {
  const response = await customAxios.post(`${BASE_URI}/chat/new`, {
    users2: usersIdArray,
  });

  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
    // check this data access
  };
};

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

export const getChatByIdFromApi = async (chatId:any) => {
  const response = await customAxios.get(`${BASE_URI}/chat/get/${chatId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
