const express = require("express");
const {
  userRegistration,
  verifyEmail,
} = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/register", userRegistration);
userRouter.post("/verify-email", verifyEmail);

module.exports = userRouter;
