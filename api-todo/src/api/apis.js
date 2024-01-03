import { CatchedAsync } from "../utils/CatchedAsync.js";
import { registerAPi } from "./register.api.js";
import { loginApi } from "./login.api.js";
import { createTask, deleteTask, getTasks, updateTask } from "./Todo.api.js";
export const APis = {
  registerAPi: CatchedAsync(registerAPi),
  loginApi: CatchedAsync(loginApi),
  createTask: CatchedAsync(createTask),
  deleteTask: CatchedAsync(deleteTask),
  getTasks: CatchedAsync(getTasks),
  updateTask: CatchedAsync(updateTask),
};
