import { AxiosError, AxiosResponse } from "axios";

export interface ErrorResponse extends AxiosError {
  response?: AxiosResponse<{
    success: boolean;
    message: string;
    status: string;
  }>;
}
