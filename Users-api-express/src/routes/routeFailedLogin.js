import express from "express";

const appFailedLogin = express.Router();

appFailedLogin.post("/failedLogin", (req, res) => {
  return res.status(404).json({
    msg: "Failed to login, please try to login again",
    Authenticate: false,
  });
});

export { appFailedLogin };
