import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
let round = Number(process.env.SALT_ROUND);

export async function hashPassword(password, devolvPass) {
  try {
    let passHash = await bcrypt.hash(password, round);

    if (!passHash) throw new Error("Ocurrio un error al hashear la contraseña");
    if (!devolvPass) return true;

    return passHash;
  } catch (err) {
    throw err;
  }
}
