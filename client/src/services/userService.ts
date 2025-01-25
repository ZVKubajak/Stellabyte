import axios from "axios";

export const getUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/users`);

    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/users/id/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/users/email/${email}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const createUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:3001/api/users`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id: string, email: string) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/users/${id}`, {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/api/users/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
