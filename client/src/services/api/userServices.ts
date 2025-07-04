import api from "../api";
import { User, UpdateUser } from "../../schema/userSchema";

export const getUserById = async (id: string) => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("[services] getUserById Error:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await api.get<User>(`/users/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("[services] getUserByEmail Error:", error);
    throw error;
  }
};

export const updateUser = async (data: UpdateUser) => {
  try {
    const response = await api.put<User>(`/users/`, {
      email: data.newEmail,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    console.error("[services] updateUser Error:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("[services] deleteUser Error:", error);
    throw error;
  }
};
