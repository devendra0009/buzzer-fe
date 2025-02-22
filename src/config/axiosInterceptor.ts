import axios from "axios";
import { BASE_URI } from "./config";
import { getTokenFromLocalStorage } from "../helpers/helpers";

// Create an Axios instance
const customAxios = axios.create({
  baseURL: BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
customAxios.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = getTokenFromLocalStorage();

    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
customAxios.interceptors.response.use(
  (response) => {
    // If the response is successful, simply return it
    return response;
  },
  (error) => {
    // Handle token expiration or unauthorized responses (401)
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Example: Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default customAxios;
