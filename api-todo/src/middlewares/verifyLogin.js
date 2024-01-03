import { compare } from "bcrypt";
import { User } from "../models/User.model.js";

const middLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const isExistUser = await User.findOne({ username });

    if (!isExistUser) {
      throw new Error("User not exist in the database");
    }

    const isMatchPassword = await compare(password, isExistUser.password);

    if (!isMatchPassword) {
      throw new Error("Password does not match");
    }

    req.user = { username, id: isExistUser._id };
    next();
  } catch (err) {
    res.status(400).json({
      error: true,
      statusText: err.message ?? "Ocurrio un error",
      statusCode: 410,
    });
  }
};

export { middLogin };
