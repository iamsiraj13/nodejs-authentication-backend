const express = require("express");
const { userRegistration } = require("../controller/user.controller");
const userRouter = express.Router();

userRouter.post("/register", userRegistration);

module.exports = userRouter;
