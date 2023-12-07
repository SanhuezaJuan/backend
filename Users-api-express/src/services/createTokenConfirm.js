import jwt from "jsonwebtoken";

export async function createTokenConfirm(id, email) {
  try {
    if (!id || !email) throw new Error("Los parametros son requeridos");
    let tokenConfirm = jwt.sign({ sub: id, email }, "token_de_confirmacion", {
      expiresIn: "2h",
    });

    if (!tokenConfirm)
      throw new Error("Error al crear el token de confirmacion");

    return {
      tokenConfirm,
    };
  } catch (err) {
    throw err;
  }
}
