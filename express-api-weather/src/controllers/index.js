import { CatchedAsync } from "../utils/CatchedAsync.js";
import { login_register } from "./login_register.controller.js";
import { acesskey } from "./acessKey.controller.js";
import { weatherController } from "./getWeather.controller.js";
export const Controllers = {
  loginRegister: CatchedAsync(login_register),
  getAcessKey: CatchedAsync(acesskey),
  getWeather: CatchedAsync(weatherController),
};
