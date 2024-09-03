const mongoose = require("mongoose");
const { DB_URL } = require("../env");

const connectdb = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
