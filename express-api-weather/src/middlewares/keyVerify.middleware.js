import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import { ClientError } from "../utils/ClientError.js";

export const keyVerify = async (req, res, next) => {
  try {
    const { auth } = req.headers;

    const { payload } = jwt.decode(auth, { complete: true });

    const { username, city } = payload;
    const UserFound = await User.findOne({ username });
    if (!UserFound) {
      throw new ClientError("the key is incorrect");
    }

    req.user = {
      username,
      city,
    };

    next();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Key is invalid",
      errorMessage: error.message ?? "Error de clave",
    });
  }
};
