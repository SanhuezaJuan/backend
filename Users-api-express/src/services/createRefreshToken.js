import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export async function createRefreshToken(id) {
  try {
    let RefreshToken = String(
      jwt.sign(
        { sub: id, accesMaterial: false, tokenType: "RefreshToken" },
        process.env.Refresh_Token_Secret,
        {
          expiresIn: "8d",
        }
      )
    );

    return {
      RefreshToken,
    };
  } catch (err) {
    throw err;
  }
}
