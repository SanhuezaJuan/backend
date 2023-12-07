import { User } from "../models/UserModel.js";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
export const createUser = async (username, pass, city) => {
  try {
    const UserFound = await User.findOne({ username });

    if (UserFound) throw new Error("User already exist");

    const user = new User({
      password: await hash(pass, 10),
      username,
      city,
      key: jwt.sign({ username, city }, process.env.SECRET, {
        expiresIn: "7d",
      }),
    });

    const { _doc } = await user.save();

    const { password, ...result } = _doc;

    return result;
  } catch (error) {
    throw error;
  }
};
