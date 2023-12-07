import jwt from "jsonwebtoken";

export async function verifyConfirmToken(confirmToken) {
  try {
    let verify = jwt.verify(confirmToken, "token_de_confirmacion");

    if (!verify) throw new Error("No se a podido verificar el token");

    let { sub: id, email } = verify;

    return {
      validToken: true,
      id,
      email,
    };
  } catch (err) {
    return {
      validToken: false,
      err,
    };
  }
}
