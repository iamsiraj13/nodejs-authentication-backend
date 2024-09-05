const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const otpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "15m",
  },
});

const otpModel = model("Otp", otpSchema);

module.exports = otpModel;
