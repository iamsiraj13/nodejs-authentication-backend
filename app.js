const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { PORT, FRONTEND_HOST } = require("./env");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/connectDB");

// init
dotenv.config();

app.use(cookieParser());

const corsOption = {
  origin: FRONTEND_HOST,
  credentials: true,
  optionSuccessStatus: true,
};

app.use(cors(corsOption));
connectdb();

app.get("/health", (req, res) =>
  res.json({
    success: true,
    message: "Ok",
  })
);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
