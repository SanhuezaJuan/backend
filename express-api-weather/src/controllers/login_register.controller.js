import { ClientError } from "../utils/ClientError.js";
import { createUser } from "../services/createUser.js";
export const login_register = async (req, res) => {
  const { username, password, city } = req.body;

  if (!username || !password || !city) {
    throw new ClientError("Faltan campos en el cuerpo de la solicitud", 400);
  }

  const { key, ...result } = await createUser(username, password, city);

  return res.status(201).json({
    error: false,
    Key_api: key,
    data: result,
  });
};
