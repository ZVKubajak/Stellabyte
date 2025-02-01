import axios from "axios";
import {
  userSchema,
  userArraySchema,
  deleteUserSchema,
} from "../schema/userSchema";

export const getUsers = async () => {
  try {
    const response = await axios.get(`/api/users`);

    const parsedData = userArraySchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`/api/users/id/${id}`);

    const parsedData = userSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`/api/users/email/${email}`);

    const parsedData = userSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`/api/users`, {
      email,
      password,
    });

    const parsedData = userSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  id: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.put(`/api/users/${id}`, {
      email,
      password,
    });

    const parsedData = userSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(`/api/users/${id}`);

    const parsedData = deleteUserSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    console.log(parsedData.data);
    return parsedData.data;
  } catch (error) {
    throw error;
  }
};
