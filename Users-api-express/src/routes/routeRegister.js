import express from "express";
import { validations } from "../Validations/validations.js";
import { validationResult } from "express-validator";
import { controllers } from "../controllers/controllers.js";
import { services } from "../services/services.js";
import { createSendEmail } from "../nodeMailer/createSendEmail.js";
let { createUser, SearchUserByUsername, SearchUserByEmail } = controllers;
let { hashPassword, createTokenConfirm } = services;
const appRegister = express.Router();

appRegister.post("/register", validations, async (req, res) => {
  try {
    let resultValidate = validationResult(req);
    if (!resultValidate.isEmpty()) throw new Error("Error en algunos campos");

    let { username, email, password } = req.body;

    let user = await SearchUserByUsername(username);
    if (user) throw new Error("Username is already in use");

    let userEmail = await SearchUserByEmail(email);

    if (userEmail) throw new Error("Email is already in use");
    password = await hashPassword(password, true);

    let response = await createUser({
      username,
      email: "example@gmail.com",
      password,
    });

    console.log(response);

    let { tokenConfirm } = await createTokenConfirm(response.data._id, email);

    let sendEmail = await createSendEmail(email, tokenConfirm);

    await sendEmail()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return res.status(200).json({
      msg: "User created successfully",
      data: response,
      Authenticate: false,
    });
  } catch (err) {
    return res.status(400).json({
      msg: "El usuario o el email ya se encuentra en uso",
      otherMsg: "Intenta nuevamente",
    });
  }
});

export { appRegister };
