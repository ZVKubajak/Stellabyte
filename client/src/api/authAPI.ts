import axios from "axios";
import { z } from "zod";
import { signUpSchema, loginSchema } from "../schema/authSchema";

type TSignUpSchema = z.infer<typeof signUpSchema>;
type TLoginSchema = z.infer<typeof loginSchema>;

const signUp = async (userInfo: TSignUpSchema) => {
  try {
    const response = await axios.post(`http://localhost:3001/api/auth/signup`, {
      email: userInfo.email,
      password: userInfo.password,
    });

    return response.data;
  } catch (error) {
    console.log("Error signing up user:", error);
    throw error;
  }
};

const login = async (userInfo: TLoginSchema) => {
  try {
    const response = await axios.post("http://localhost:3001/api/auth/login", {
      email: userInfo.email,
      password: userInfo.password,
    });

    return response.data;
  } catch (error) {
    console.log("Error logging in user: ", error);
    throw error;
  }
};

export { signUp, login };
