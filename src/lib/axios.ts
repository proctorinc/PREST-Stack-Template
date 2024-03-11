import Axios, { type InternalAxiosRequestConfig } from "axios";
import { API_URL } from "../config";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json";
  return config;
};

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: "*/*",
  },
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    return Promise.reject(message);
  },
);
