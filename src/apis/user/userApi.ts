import axios from "axios";
import { BASE_URI } from "../../config/config";
import customAxios from "../../config/axiosInterceptor";

export const getUserDetailsByTokenApi = async () => {
  const response = await customAxios.get(`${BASE_URI}/users/profile`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getPostsByUserIdFromApi = async (userId) => {
  const response = await customAxios.get(`${BASE_URI}/post/user/${userId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getReelsByUserIdFromApi = async (userId) => {
  const response = await customAxios.get(`${BASE_URI}/reel/user/${userId}`);
  // debugger;
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getSavedPostsByUserIdFromApi = async (userId) => {
  const response = await customAxios.get(
    `${BASE_URI}/post/saved/get/${userId}`
  );
  // debugger;
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const followUnfollowUserFromApi = async (userId) => {
  const response = await customAxios.put(`${BASE_URI}/users/follow/${userId}`);
  // debugger;
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const searchUser = async (query: string, page = 0, size = 5) => {
  const response = await customAxios.get(
    `${BASE_URI}/users/search?page=${page}&size=${size}&query=${query}`
  );
  // debugger;
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getAllUserBySort = async (sortBy: string, page = 0, size = 5) => {
  const response = await customAxios.get(
    `${BASE_URI}/users?page=${page}&size=${size}&sortBy=${sortBy}`
  );
  // debugger;
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const getUserById = async (userId: number) => {
  console.log(userId);

  const response = await customAxios.get(`${BASE_URI}/users/${userId}`);
  // debugger;
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
