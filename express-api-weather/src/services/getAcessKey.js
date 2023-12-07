import { User } from "../models/UserModel.js";
import { compare } from "bcrypt";
import "dotenv/config.js";
export const getAccesKey = async (username, password) => {
  try {
    const UserFound = await User.findOne({ username });

    if (!UserFound) {
      throw new Error("User not found in the registers of database");
    }

    // comprobacion de la password;

    let isMatch = compare(password, UserFound.password);

    if (!isMatch) {
      throw new Error("Password is incorrect");
    }

    return UserFound.key;
  } catch (error) {
    throw error;
  }
};
