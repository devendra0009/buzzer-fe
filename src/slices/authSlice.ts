import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginRequest,
  RegisterRequest,
} from "../interfaces/auth/authInterfaces";
import { loginUser, registerUser } from "../apis/auth/authApis";
import {
  removeTokenFromLocalStorage,
  setTokenInLocalStorage,
} from "../helpers/helpers";

const initialState: AuthState = {
  token: "",
  loading: false,
  error: null,
};

// Thunks
export const register = createAsyncThunk(
  "authRegister",
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await registerUser(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const login = createAsyncThunk(
  "authLogin",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      // debugger;
      const response = await loginUser(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenInitially: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.data?.token || "";
      })
      .addCase(register.rejected, (state, action) => {
        state.token = "";
        state.loading = false;
        state.error = action.payload as string;
        removeTokenFromLocalStorage();
      })
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.data?.token || "";
        setTokenInLocalStorage(state.token);
        
      })
      .addCase(login.rejected, (state, action) => {
        state.token = "";
        state.loading = false;
        state.error = action.payload as string;
        removeTokenFromLocalStorage();
      });
  },
});

export const { logout, setTokenInitially } = authSlice.actions;

export default authSlice;
