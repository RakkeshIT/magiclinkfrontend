// lib/coreAPI.ts
import axios from "axios";

const baseURL = process.env.NODE_ENV == 'development' ? process.env.NEXT_PUBLIC_BASE_URL_DEVELOPMENT : process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const coreAPI = {
  post: (route: string, data?: any, config = {}) =>
    axiosInstance.post(route, data, config),

  get: (route: string, config = {}) =>
    axiosInstance.get(route, config),

  put: (route: string, data?: any, config = {}) =>
    axiosInstance.put(route, data, config),

  delete: (route: string, config = {}) =>
    axiosInstance.delete(route, config),
};

export default axiosInstance;