const key = "auth_token";

export const storeAuthToken = (token: string) => {
  try {
    localStorage.setItem(key, token);
  } catch (error) {
    console.error("[tokens] Error storing auth token:", error);
    throw error;
  }
};

export const getAuthToken = () => {
  try {
    const token = localStorage.getItem(key);
    return token;
  } catch (error) {
    console.error("[tokens] Error fetching auth token:", error);
    return null;
  }
};

export const removeAuthToken = () => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("[tokens] Error removing auth token:", error);
    throw error;
  }
};
