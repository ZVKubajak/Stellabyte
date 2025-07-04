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
}

const authToken = new AuthToken();
export default authToken;
