const express = require("express");
const userRouter = express.Router();

const {
  registerUser,
  registerAgent,
  loginUser,
  loginAgent,
} = require("../controllers/userControllers");

userRouter.post("/register-user", registerUser);
userRouter.post("/register-agent", registerAgent);
userRouter.post("/login-user", loginUser);
userRouter.post("/login-agent", loginAgent);

module.exports = userRouter;
