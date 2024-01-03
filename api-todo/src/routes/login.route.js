import express from "express";
import { middLogin } from "../middlewares/verifyLogin.js";
import { APis } from "../api/apis.js";
const appLogin = express();

appLogin.post("/api/v1/login", middLogin, APis.loginApi);

export { appLogin };
