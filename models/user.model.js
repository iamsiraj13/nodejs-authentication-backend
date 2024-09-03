const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      enum: ["user", "admin"],
      default: ["user"],
    },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

module.exports = userModel;
