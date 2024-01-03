import jwt from "jsonwebtoken";
import "dotenv/config.js";
export const middToken = async (req, res, next) => {
  try {
    const [type, token] = req.headers.authorization?.split(" ") || [];

    if (type !== "Bearer") {
      throw new Error("token type is not correct");
    }
    if (!type) {
      throw new Error("token type is empty");
    }

    if (!token) {
      throw new Error("token is empty");
    }

    const { id, username } = jwt.verify(token, process.env.SECRET);

    req.user = { id, username };

    next();
  } catch (error) {
    res.status(400).json({
      error: true,
      msg: error.message ?? "Ocurrio un error",
      code: 400,
    });
  }
};
