import { z } from "zod";
import { starTokenSchema } from "../schema/authSchema";

type TStarTokenSchema = z.infer<typeof starTokenSchema>;

class StarService {
  generateStarToken() {
    const starToken: TStarTokenSchema = `star-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("star_token", starToken);
  }

  getStarToken(): TStarTokenSchema {
    return localStorage.getItem("star_token") || "";
  }

  deleteStarToken() {
    localStorage.removeItem("star_token");
  }
}

const starAuth = new StarService();

export default starAuth;
