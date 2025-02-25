import customAxios from "../../config/axiosInterceptor";
import { BASE_URI } from "../../config/config";
import { DEFAULT_PAGE_SIZE } from "../../helpers/helpers";
import { uploadDocs } from "../uploadDocs/uploadDocsApi";

export const getAllMessagesByChatIdFromApi = async (
  chatId: number,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(
    `${BASE_URI}/message/get/chat/${chatId}`,
    {
      params: {
        page,
        size,
      },
    }
  );
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data.data.data,
  };
};
//shubham

export const createMessageForChatFromApi = async (reqData) => {
  const { chatId, ...restData } = reqData?.data;

  if (restData?.image && restData?.image !== "") {
    const res = await uploadDocs(restData.image);
    restData["image"] = res?.data;
  }

  const response = await customAxios.post(
    `${BASE_URI}/message/new/chat/${chatId}`,
    restData
  );
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
