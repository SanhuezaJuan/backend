import { ClientError } from "../utils/ClientError.js";
import { getAccesKey } from "../services/getAcessKey.js";
export const acesskey = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ClientError("Faltan campos en el cuerpo", 400);
  }

  const key = await getAccesKey(username, password);

  return res.status(200).json({
    error: false,
    key,
  });
};
