import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";

/**
 *
 * @param {string} refreshToken
 *
 */
export async function verifyRefreshToken(refreshToken) {
  try {
    refreshToken = refreshToken.replace("Bearer ", "");

    let decodedToken = jwt.verify(
      refreshToken,
      process.env.Refresh_Token_Secret
    );

    let id = decodedToken.sub;

    if (!id) throw new Error("El id no se a encontrado");

    return {
      id,
      validToken: true,
    };
  } catch (err) {
    throw err;
  }
}
