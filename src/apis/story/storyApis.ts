import axios from "axios";
import { BASE_URI } from "../../config/config";
import customAxios from "../../config/axiosInterceptor";
import { StoryRequest } from "../../interfaces/story/storyInterfaces";
import { uploadDocs } from "../uploadDocs/uploadDocsApi";

export const getAllStoryForUserFromApi = async () => {
  const response = await customAxios.get(
    `${BASE_URI}/story/for/user`
  );
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getAllStoryOfUserFromApi = async (userId: number) => {
  const response = await customAxios.get(`${BASE_URI}/story/of/user/${userId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const createStoryFromApi = async (data: StoryRequest) => {
  if (data?.image && data?.image !== "") {
    const res = await uploadDocs(data.image);
    data["image"] = res?.data;
  }

  const response = await customAxios.post(`${BASE_URI}/story/create`, data);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
