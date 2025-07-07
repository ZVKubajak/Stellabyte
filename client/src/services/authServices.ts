import axios, { AxiosInstance } from "axios";
import { Signup, Login } from "../schema/authSchema";
import authToken from "../tokens/authToken";

const auth: AxiosInstance = axios.create({
  // baseURL: "https://stellabyte-production.up.railway.app/auth",
  baseURL: "http://localhost:3001/auth",
  timeout: 30000,
});

export const signup = async (data: Signup) => {
  try {
    const response = await auth.post<string>("/signup", data);
    authToken.store(response.data);
  } catch (error) {
    console.error("[services] signup Error:", error);
    throw error;
  }
};

export const login = async (data: Login) => {
  try {
    const response = await auth.post<string>("/login", data);
    authToken.store(response.data);
  } catch (error) {
    console.error("[services] login Error:", error);
    throw error;
  }
};

export const logout = () => {
  try {
    authToken.remove();
  } catch (error) {
    console.error("[services] logout Error:", error);
    throw error;
  }
};
