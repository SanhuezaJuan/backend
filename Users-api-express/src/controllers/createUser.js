import { User } from "../schema/model.js";

/**
 *
 * @param {Object} dataUser
 * @param {string} dataUser.username
 * @param {string} dataUser.email
 * @param {string} dataUser.password
 * @param {string} [dataUser.role] -> role del usuario (opcional)  - defecto user
 * @param {boolean} [dataUser.Premiun] -> si el usuario es premiun (opcional) - defecto false
 * @param {string} [dataUser.refreshToken] -> token de refresco actualizado automaticamente
 *  @example   createUser({ username: "usernameUser", email: "example@gmail.com", password: "password1243" });
 */
export async function createUser(dataUser) {
  try {
    if (!dataUser.email || !dataUser.username || !dataUser.password)
      throw new Error("Faltan algunos campos obligatorios");

    let Users = new User({
      username: dataUser.username,
      email: dataUser.email,
      password: dataUser.password,
      role: dataUser.role || "user",
      premiun: dataUser.Premiun || false,
      refreshToken: dataUser.refreshToken || "Nada",
    });

    let data = await Users.save();

    return {
      data,
      UserCreate: true,
    };
  } catch (err) {
    throw err;
  }
}
