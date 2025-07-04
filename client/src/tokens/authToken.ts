import { jwtDecode } from "jwt-decode";

class AuthToken {
  private static key = "auth_token";

  store(token: string) {
    try {
      localStorage.setItem(AuthToken.key, token);
    } catch (error) {
      console.error("[AuthToken] Error storing token:", error);
      throw error;
    }
  }

  get() {
    try {
      return localStorage.getItem(AuthToken.key);
    } catch (error) {
      console.error("[AuthToken] Error fetching token:", error);
      return null;
    }
  }

  remove() {
    try {
      localStorage.removeItem(AuthToken.key);
    } catch (error) {
      console.error("[AuthToken] Error removing token:", error);
      throw error;
    }
  }

  getProfile() {
    try {
      const token = this.get();
      if (!token) throw new Error("Token not found.");
      return jwtDecode<{ userId: string; email: string }>(token);
    } catch (error) {
      console.error("[AuthToken] Error fetching user ID:", error);
      return null;
    }
  }
}

const authToken = new AuthToken();
export default authToken;
