import axios from "axios";
import { BASE_URI } from "../../config/config";
import customAxios from "../../config/axiosInterceptor";
import { DEFAULT_PAGE_SIZE } from "../../helpers/helpers";

export const getUserDetailsByTokenApi = async () => {
  const response = await customAxios.get(`${BASE_URI}/users/profile`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getPostsByUserIdFromApi = async (
  userId,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/post/user/${userId}`, {
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

export const getReelsByUserIdFromApi = async (
  userId,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/reel/user/${userId}`, {
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

export const getSavedPostsByUserIdFromApi = async (
  userId,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(
    `${BASE_URI}/post/saved/get/${userId}`,
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

export const followUnfollowUserFromApi = async (userId) => {
  const response = await customAxios.put(`${BASE_URI}/users/follow/${userId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const searchUser = async (
  query: string,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/users/search`, {
    params: {
      page,
      size,
      query,
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

export const getAllUserBySort = async (
  sortBy: string,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/users`, {
    params: {
      page,
      size,
      sortBy,
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

export const getUserById = async (userId: number) => {
  console.log(userId);

  const response = await customAxios.get(`${BASE_URI}/users/${userId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
