import express from "express";
import { services } from "../services/services.js";
import { controllers } from "../controllers/controllers.js";
let { verifyConfirmToken } = services;
let { SearchUserByIdAndUpdate } = controllers;
const appConfirm = express.Router();

const middlewareConfirmToken = async (req, res, next) => {
  try {
    console.log(req.query.token);
    let { id, email, validToken } = await verifyConfirmToken(req.query.token);

    if (!validToken) throw new Error("El token es invalido");

    console.log(validToken, id, email);
    let User = await SearchUserByIdAndUpdate(id, "email", email);
    console.log(User);
    if (!User)
      return res.json({
        msg: "Error al actualizar el usuario",
      });

    next();
  } catch (err) {
    console.log(err);
    return res.json({
      msg: "El token a expirado",
      otherMsg: "Pide nuevamente el token de acceso",
    });
  }
};

appConfirm.get("/confirm", middlewareConfirmToken, (req, res) => {
  return res.json({
    msg: "Cuenta confirmada, inicia sesion ahora",
  });
});

export { appConfirm };
