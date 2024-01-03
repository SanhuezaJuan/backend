import { Router } from "express";
import { controllers } from "../controllers/controllers.js";

const appHome = Router();

appHome.get("/", controllers.homeController);

export { appHome };
