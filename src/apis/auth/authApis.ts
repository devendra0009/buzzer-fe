import {
  AuthResponse,
  LoginRequest,
} from "./../../interfaces/auth/authInterfaces";
import axios from "axios";
import { BASE_URI } from "../../config/config";
import { RegisterRequest } from "../../interfaces/auth/authInterfaces";
import { ApiResponse } from "../../interfaces/global/globalSuccessResponse";
import customAxios from "../../config/axiosInterceptor";
export const registerUser = async (
  requestData: RegisterRequest
): Promise<ApiResponse<AuthResponse | null>> => {
  const response = await customAxios.post(
    `${BASE_URI}/auth/register`,
    requestData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};

export const loginUser = async (
  requestData: LoginRequest
): Promise<ApiResponse<AuthResponse | null>> => {
  const response = await customAxios.post(
    `${BASE_URI}/auth/login`,
    requestData
  );
  return {
    status: response.status,
    success: true,
    message: response.data.message,
    data: response.data,
  };
};
