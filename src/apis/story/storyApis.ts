import axios from "axios";
import { BASE_URI } from "../../config/config";
import customAxios from "../../config/axiosInterceptor";
import { StoryRequest } from "../../interfaces/story/storyInterfaces";
import { uploadDocs } from "../uploadDocs/uploadDocsApi";
import { DEFAULT_PAGE_SIZE } from "../../helpers/helpers";

export const getAllStoryForUserFromApi = async (
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/story/for/user`, {
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

export const getAllStoryOfUserFromApi = async (
  userId: number,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(
    `${BASE_URI}/story/of/user/${userId}`,
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
