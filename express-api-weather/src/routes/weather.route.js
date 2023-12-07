import { Router } from "express";
import { keyVerify } from "../middlewares/keyVerify.middleware.js";
import { Controllers } from "../controllers/index.js";
export const appWeather = Router();

appWeather.get("/weather/", keyVerify, Controllers.getWeather);
