import { jwtDecode } from "jwt-decode";

class AuthService {
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem("id_token") || "";
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return true; // Treat as expired if decoding fails
    }
  }

  getProfile() {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      try {
        const decoded = jwtDecode<{ id: string; email: string, username: string }>(token);
        return decoded;
      } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
      }
    }
    return null;
  }

  login(idToken: string, isSignup = false) {
    localStorage.setItem("id_token", idToken);
    if (isSignup) {
      localStorage.setItem("isFirstSignup", "true");
    }
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }

  handleTokenExpiration() {
    const token = this.getToken();
    if (token && this.isTokenExpired(token)) {
      this.logout();
    }
  }
}

const authService = new AuthService();

export default authService;