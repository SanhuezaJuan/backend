import { Router } from "express";
import { Controllers } from "../controllers/index.js";

export const appLogin = Router();

appLogin.post("/simple/login_register", Controllers.loginRegister);
