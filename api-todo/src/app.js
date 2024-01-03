import express from "express";
import cors from "cors";
import "dotenv/config.js";

import { connect } from "./config/coonectMongo.js";
import { ErrorResponse } from "./utils/ErrorResponse.js";
import { appRegister } from "./routes/Register.route.js";
import { appLogin } from "./routes/login.route.js";
import { appTodo } from "./routes/todos.route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
connect()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    next(err);
  });

// routes

app.use("/", appRegister);
app.use("/", appLogin);
app.use("/", appTodo);

//route for handled errors global

app.use(function (err, req, res, next) {
  const { message, statusCode } = err;

  ErrorResponse(message, res, statusCode);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
