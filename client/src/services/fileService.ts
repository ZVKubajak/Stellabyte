import axios from "axios";
import {
  fileSchema,
  fileArraySchema,
  deleteFileSchema,
} from "../schema/fileSchema";

export const getAllFiles = async () => {
  try {
    const response = await axios.get(`/api/files`);

    const parsedData = fileArraySchema.safeParse(response.data);
    if (!parsedData.success) {
      return;
    }

    return parsedData.data;
  } catch (error) {
    console.error("Error fetching all files:", error);
    throw error;
  }
};

export const getUserFiles = async (userId: string) => {
  try {
    const response = await axios.get(`/api/files/user/${userId}`);

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
    const response = await axios.get(`/api/files/id/${id}`);

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
    const data = new FormData();
    data.append("file", file);
    data.append("userId", userId);

    const response = await axios.post(`/api/files`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
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
    const response = await axios.delete(`/api/files/${id}`, {
      data: { userId },
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
