require("dotenv").config();

const PORT = process.env.PORT;
const FRONTEND_HOST = process.env.FRONTEND_HOST;
const DB_URL = process.env.DB_URL;

module.exports = { PORT, FRONTEND_HOST, DB_URL };
