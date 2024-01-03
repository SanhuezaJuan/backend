import jwt from "jsonwebtoken";
import "dotenv/config.js";
const loginApi = async (req, res) => {
  const { id, username } = req.user;

  //generate token for auth
  const token = jwt.sign({ id, username }, process.env.SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({
    error: false,
    msg: "User logged with sucess",
    data: { id, username },
    token,
    code: 200,
    expiresIn: "7d",
  });
};

export { loginApi };
