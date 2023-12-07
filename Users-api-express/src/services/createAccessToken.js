import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export async function createAccessToken(id) {
  try {
    let AccesToken = String(
      jwt.sign(
        { sub: id, accesMaterial: true, tokenType: "AccessToken" },
        process.env.Access_Token_Secret,
        {
          expiresIn: "1d",
        }
      )
    );

    return {
      AccesToken,
    };
  } catch (err) {
    throw err;
  }
}
