import { Router } from "express";
import { Controllers } from "../controllers/index.js";
export const appKey = Router();

appKey.post("/acess_key/", Controllers.getAcessKey);
