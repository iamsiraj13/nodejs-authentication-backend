require("dotenv").config();

const PORT = process.env.PORT;
const FRONTEND_HOST = process.env.FRONTEND_HOST;
const DB_URL = process.env.DB_URL;

// Email

const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_FROM = process.env.EMAIL_FROM;

module.exports = {
  PORT,
  FRONTEND_HOST,
  DB_URL,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
};
