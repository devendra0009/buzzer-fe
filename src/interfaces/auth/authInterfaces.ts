import { User, UserState } from "../user/userInterfaces";

export interface AuthState {
  token: string;
  loading: boolean;
  loggedInUser: UserState;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  profileImg: any; //Change type to file
  email: string;
  password: string;
  userName: string;
  gender: GenderEnum;
  firstName: string;
  lastName: string;
  phone: string;
}

export enum GenderEnum {
  MALE,
  FEMALE,
}
