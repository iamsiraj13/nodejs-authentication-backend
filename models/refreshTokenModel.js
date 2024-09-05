const mongoose = require("mongoose");

const { Schema, model } = mongoose;

// defining schema
const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  blacklisted: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5d",
  },
});

// model
const refreshTokenModel = model("Token", refreshTokenSchema);

module.exports = refreshTokenModel;
