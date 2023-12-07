import { appLogin } from "./login_register.route.js";
import { appKey } from "./getAcessKey.js";
import { appWeather } from "./weather.route.js";
export const routes = {
  loginRoute: appLogin,
  acessKeyRoute: appKey,
  getWeatherRoute: appWeather,
};
