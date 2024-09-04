const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { PORT, FRONTEND_HOST } = require("./env");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/connectDB");
const userRouter = require("./routes/user.routes");

// init
dotenv.config();

app.use(cookieParser());

const corsOption = {
  origin: FRONTEND_HOST,
  credentials: true,
  optionSuccessStatus: true,
};
app.use(express.json());
app.use(cors(corsOption));
connectdb();

// apis
app.use("/api/user", userRouter);

app.get("/health", (req, res) =>
  res.json({
    success: true,
    message: "Ok",
  })
);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
