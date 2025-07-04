class StarToken {
  private static key = "star_token";

  generate() {
    try {
      const starToken = `star-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(StarToken.key, starToken);
    } catch (error) {
      console.error("[StarToken] Error generating token:", error);
      throw error;
    }
  }

  get() {
    try {
      return localStorage.getItem(StarToken.key);
    } catch (error) {
      console.error("[StarToken] Error fetching token:", error);
      return null;
    }
  }

  remove() {
    try {
      localStorage.removeItem(StarToken.key);
    } catch (error) {
      console.error("[StarToken] Error removing token:", error);
      throw error;
    }
  }
}

const starToken = new StarToken();
export default starToken;
