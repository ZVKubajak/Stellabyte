import axios from "axios";
import {
  fileSchema,
  fileArraySchema,
  deleteFileSchema,
} from "../schema/fileSchema";

export const getAllFiles = async () => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(`/api/files`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedData = fileArraySchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const getUserFiles = async (userId: string) => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(
      `/api/files/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedData = fileArraySchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const getFileById = async (id: string) => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.get(`/api/files/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedData = fileSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const uploadFile = async (file: File, userId: string) => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const data = new FormData();
    data.append("file", file);
    data.append("userId", userId);

    const response = await axios.post(`/api/files`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedData = fileSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};

export const removeFile = async (id: string, userId: string) => {
  try {
    const token = localStorage.getItem("id_token");
    if (!token) {
      throw new Error("Authorization token is missing.");
    }

    const response = await axios.delete(`/api/files/${id}`, {
      data: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedData = deleteFileSchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    throw error;
  }
};
