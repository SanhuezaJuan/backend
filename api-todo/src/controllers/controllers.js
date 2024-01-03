import { CatchedAsync } from "../utils/CatchedAsync.js";
import { homeController } from "./Home.controller.js";
import { registerController } from "./Register.controller.js";
export const controllers = {
  homeController: CatchedAsync(homeController),
  registerController: CatchedAsync(registerController),
};
