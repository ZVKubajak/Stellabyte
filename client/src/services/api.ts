import axios, {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosError,
} from "axios";
import { getAuthToken } from "../tokens/authToken";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 60000,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default api;
