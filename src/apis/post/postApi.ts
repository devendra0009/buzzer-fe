import axios from "axios";
import { BASE_URI } from "../../config/config";
import customAxios from "../../config/axiosInterceptor";
import { DEFAULT_PAGE_SIZE } from "../../helpers/helpers";

export const getAllPostsFromApi = async (
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/post/all`, {
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

export const getPostByPostIdFromApi = async (postId) => {
  const response = await customAxios.get(`${BASE_URI}/post/${postId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const createPostByApi = async (data) => {
  const headers = { "Content-Type": "multipart/form-data" };
  const response = await customAxios.post(`${BASE_URI}/post/create`, data, {
    headers,
  });
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const liketPostByApi = async (postId) => {
  const response = await customAxios.post(`${BASE_URI}/post/like/${postId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const savePostByApi = async (postId) => {
  const response = await customAxios.post(`${BASE_URI}/post/save/${postId}`);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const commentOnPostByApi = async (data) => {
  const response = await customAxios.post(`${BASE_URI}/comment`, data);
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const likeACommentByApi = async (commentId) => {
  const response = await customAxios.post(
    `${BASE_URI}/comment/like/${commentId}`,
    {}
  );
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
export const getAllCommentsByPostByApi = async (
  postId,
  page: number = 0,
  size: number = DEFAULT_PAGE_SIZE
) => {
  const response = await customAxios.get(`${BASE_URI}/comment/post/${postId}`, {
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
