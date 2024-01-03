import { User } from "../models/User.model.js";
import { hash } from "bcrypt";
const registerAPi = async (req, res, next) => {
  const { username, password } = req.body;

  const isExistUser = await User.findOne({ username });

  if (isExistUser) {
    return res.status(400).json({
      error: true,
      msg: "User already exist in the db",
      code: 400,
    });
  }

  const passHash = await hash(password, 10);

  const newUser = new User({
    username,
    password: passHash,
  });

  await newUser.save();

  return res.status(201).json({
    error: false,
    msg: "User created successfully",
    code: 201,
  });
};

export { registerAPi };
