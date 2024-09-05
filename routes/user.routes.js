const express = require("express");
const {
  userRegistration,
  verifyEmail,
  userLogin,
} = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/register", userRegistration);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/login", userLogin);

module.exports = userRouter;
