import axios from "axios";
import {
  userSchema,
  userArraySchema,
  deleteUserSchema,
} from "../schema/userSchema";

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(`http://localhost:3001/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(`http://localhost:3001/api/users/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const getUserByEmail = async (email: string) => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(`http://localhost:3001/api/users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const createUser = async (email: string, password: string) => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.post(
      `http://localhost:3001/api/users`,
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.put(
      `http://localhost:3001/api/users/${id}`,
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.delete(`http://localhost:3001/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedData = deleteUserSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};
