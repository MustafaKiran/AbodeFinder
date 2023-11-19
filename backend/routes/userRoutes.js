const express = require("express");
const userRouter = express.Router();

const {
  registerUser,
  registerAgent,
  loginUser,
  loginAgent,
} = require("../controllers/userControllers");

router.post("/register-user", registerUser);
router.post("/register-agent", registerAgent);
router.post("/login-user", loginUser);
router.post("/login-agent", loginAgent);

module.exports = userRouter;
