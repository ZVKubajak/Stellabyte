import api from "../api";
import { File as FileType } from "../../schema/fileSchema";

export const getUserFiles = async (userId: string) => {
  try {
    const response = await api.get<FileType[]>(`/files/userId/${userId}`);
    return response.data;
  } catch (error) {
    console.error("[services] getUserFiles Error:", error);
    throw error;
  }
};

export const getFileById = async (id: string) => {
  try {
    const response = await api.get<FileType>(`/files/${id}`);
    return response.data;
  } catch (error) {
    console.error("[services] getFileById Error:", error);
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const data = new FormData();
    data.append("file", file);

    const response = await api.post<FileType>(`/files/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("[services] uploadFile Error:", error);
    throw error;
  }
};

export const downloadFile = async (id: string, fileName: string) => {
  try {
    const response = await api.get(`/files/download/${id}`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"] || "application/octet-stream",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("[services] downloadFile Error:", error);
    throw error;
  }
};

export const removeFile = async (id: string) => {
  try {
    await api.delete(`/files/${id}`);
  } catch (error) {
    console.error("[services] removeFile Error:", error);
    throw error;
  }
};
