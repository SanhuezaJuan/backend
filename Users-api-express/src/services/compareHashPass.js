import bcrypt from "bcrypt";

export async function compareHashPass(password, hashPassword) {
  try {
    let result = await bcrypt.compare(password, hashPassword);
    if (!result) return false;

    return true;
  } catch (err) {
    throw err;
  }
}
