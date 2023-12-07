import morgan from "morgan";
import express from "express";
import { handleErrors } from "./utils/handlerErrors.js";
import "dotenv/config.js";
import { routes } from "./routes/routes.js";
import { MongoseConnection } from "./services/connection.js";
const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// rutas de la app
server.use("/api/v1/", routes.loginRoute);
server.use("/api/v1/", routes.acessKeyRoute);
server.use("/api/v1/", routes.getWeatherRoute);

// errores globales
server.use(function (err, req, res, next) {
  const { message, statusCode } = err;
  handleErrors(res, message, statusCode);
});

// server running

server.listen(process.env.PORT, () => {
  console.log("server running on port 3000");
});

// connection to db

new MongoseConnection(process.env.URI).connection();
