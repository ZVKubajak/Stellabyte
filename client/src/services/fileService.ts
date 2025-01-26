import axios from "axios";
import { singleFileSchema, multiFileSchema } from "../schema/fileSchema";

export const getAllFiles = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/files`);

    return response.data;
  } catch (error) {
    console.error("Error fetching all files:", error);
    throw error;
  }
};

export const getUserFiles = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/files/user/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching files by userId:", error);
    throw error;
  }
};

export const getFileById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/files/id/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching file by id:", error);
    throw error;
  }
};

export const uploadFile = async (file: File, userId: string) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("userId", userId);

    const response = await axios.post(`http://localhost:3001/api/files`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const removeFile = async (id: string, userId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/files/${id}`,
      {
        data: { userId },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error removing file:", error);
    throw error;
  }
};
