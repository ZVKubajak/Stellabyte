import axios from "axios";
import { z } from "zod";
import { signUpSchema, loginSchema, tokenSchema } from "../schema/authSchema";

type TSignUpSchema = z.infer<typeof signUpSchema>;
type TLoginSchema = z.infer<typeof loginSchema>;

const signUp = async (userInfo: TSignUpSchema) => {
  try {
    const response = await axios.post(`/api/auth/signup`, {
      email: userInfo.email,
      password: userInfo.password,
    });
    const parsedData = tokenSchema.safeParse(response.data);

    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

const login = async (userInfo: TLoginSchema) => {
  try {
    const response = await axios.post("/api/auth/login", {
      email: userInfo.email,
      password: userInfo.password,
    });

    const parsedData = tokenSchema.safeParse(response.data);

    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export { signUp, login };
