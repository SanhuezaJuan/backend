import { Router } from "express";
import { APis } from "../api/apis.js";
import { middToken } from "../middlewares/verifyToken.js";

const appTodo = Router();

//rutas para exponer el front
appTodo.get("/todos", (req, res) => {
  res.sendFile("todos.html", { root: "./client" });
});

// rutas para interactuar con el backend
appTodo.get("/api/v1/todos/", middToken, APis.getTasks);
appTodo.post("/api/v1/todo/create", middToken, APis.createTask);
appTodo.put("/api/v1/todo/update/:id", middToken, APis.updateTask);
appTodo.delete("/api/v1/todo/delete/:id", middToken, APis.deleteTask);
export { appTodo };
