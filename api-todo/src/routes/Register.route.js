import { Router } from "express";
import { controllers } from "../controllers/controllers.js";
import { APis } from "../api/apis.js";
import { validations } from "../validations/fieldsValidate.js";

const appRegister = Router();

appRegister.get("/register", controllers.registerController);
appRegister.post("/api/v1/register", validations, APis.registerAPi);
export { appRegister };
