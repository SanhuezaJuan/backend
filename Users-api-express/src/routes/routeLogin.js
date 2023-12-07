import express from "express";
import passport from "passport";
import { services } from "../services/services.js";
import { controllers } from "../controllers/controllers.js";
const appLogin = express.Router();
let { createAccessToken, createRefreshToken } = services;
let { SearchUserByUsername } = controllers;

const middlewareConfirmAccount = async (req, res, next) => {
  try {
    let user = await SearchUserByUsername(req.body.username);
    if (!user) throw new Error("El usuario no se a encontrado");

    if (user.email === "example@gmail.com")
      throw new Error("La cuenta no a sido confirmada");

    next();
  } catch (err) {
    return res.status(400).json({
      msg: "Ocurrio un error",
      otherMsg: "Probablemente la cuenta no a sido confirmada",
    });
  }
};

appLogin.post(
  "/login",
  middlewareConfirmAccount,
  passport.authenticate("local", { failureRedirect: "/api/v1/failedLogin" }),
  async (req, res) => {
    try {
      let user = await SearchUserByUsername(req.body.username);
      let { AccesToken } = await createAccessToken(user._id);
      let { RefreshToken } = await createRefreshToken(user._id);
      return res.status(200).json({
        Authenticate: true,
        AccesToken,
        RefreshToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        msg: err,
        Authenticate: false,
      });
    }
  }
);

export { appLogin };
