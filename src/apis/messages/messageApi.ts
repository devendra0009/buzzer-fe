import customAxios from "../../config/axiosInterceptor";
import { BASE_URI } from "../../config/config";
import { uploadDocs } from "../uploadDocs/uploadDocsApi";

export const getAllMessagesByChatIdFromApi = async (chatId: number) => {
  const response = await customAxios.get(
    `${BASE_URI}/message/get/chat/${chatId}`
  );
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

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
