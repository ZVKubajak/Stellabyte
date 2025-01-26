import axios from "axios";
import {
  singleFileSchema,
  multiFileSchema,
  deleteFileSchema,
} from "../schema/fileSchema";

export const getAllFiles = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/files`);

    console.log(response);
    const parsedData = multiFileSchema.safeParse(response.data);
    console.log(parsedData);

    if (!parsedData.success) {
      console.error("Parsing Error:", parsedData.error);
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
    const response = await axios.get(
      `http://localhost:3001/api/files/user/${userId}`
    );

    console.log(response);
    const parsedData = multiFileSchema.safeParse(response.data);
    console.log(parsedData);

    if (!parsedData.success) {
      console.error("Parsing Error:", parsedData.error);
      return;
    }

    return parsedData.data;
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

    console.log(response);
    const parsedData = singleFileSchema.safeParse(response.data);
    console.log(parsedData);

    if (!parsedData.success) {
      console.error("Parsing Error:", parsedData.error);
      return;
    }

    return parsedData.data;
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

    console.log(response);
    const parsedData = singleFileSchema.safeParse(response.data);
    console.log(parsedData);

    if (!parsedData.success) {
      console.error("Parsing Error:", parsedData.error);
      return;
    }

    return parsedData.data;
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

    console.log(response);
    const parsedData = deleteFileSchema.safeParse(response.data);
    console.log(parsedData);

    if (!parsedData.success) {
      console.error("Parsing Error:", parsedData.error);
      return;
    }

    return parsedData.data;
  } catch (error) {
    console.error("Error removing file:", error);
    throw error;
  }
};
