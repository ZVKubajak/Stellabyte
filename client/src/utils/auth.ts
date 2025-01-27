import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import { tokenSchema } from "../schema/authSchema";

type TTokenSchema = z.infer<typeof tokenSchema>;

class AuthService {
  login(idToken: TTokenSchema) {
    localStorage.setItem("id_token", idToken);
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  getToken(): TTokenSchema {
    return localStorage.getItem("id_token") || "";
  }

  isTokenExpired(token: TTokenSchema): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true;
    }
  }

  getProfile() {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      try {
        const decoded = jwtDecode<{ id: string; email: string }>(token);
        return decoded;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  handleTokenExpiration() {
    const token = this.getToken();
    if (token && this.isTokenExpired(token)) {
      this.logout();
    }
  }
}

const auth = new AuthService();

export default auth;
