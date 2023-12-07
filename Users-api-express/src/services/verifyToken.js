import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export async function verifyAccessToken(token) {
  try {
    token = token.replace("Bearer ", "");
    let decodedToken = jwt.verify(token, process.env.Access_Token_Secret);
    let id = decodedToken.sub;
    if (!id) throw new Error("No se a encontrado el id");

    return {
      id,
      validToken: true,
    };
  } catch (err) {
    throw err;
  }
}
