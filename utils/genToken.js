const jwt = require("jsonwebtoken");
const { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = require("../env");
const refreshTokenModel = require("../models/refreshTokenModel");

const genToken = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };

    // Generate access token with expiration time

    const accessTokenExp = Math.floor(Date.now() / 1000) + 100; // Set expiration to 100 secons from now

    const accessToken = jwt.sign({
      ...payload,
      exp: accessTokenExp,
      JWT_ACCESS_SECRET_KEY,
    });

    // Generate refresh token with expiration time
    const refreshTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5; // Set expiration to 5 days from now

    const refreshToken = jwt.sign({
      ...payload,
      exp: refreshTokenExp,
      JWT_REFRESH_SECRET_KEY,
    });

    const userRefreshToken = await refreshTokenModel.findOne({
      userId: user._id,
    });

    if (userRefreshToken) {
      await userRefreshToken.remove();
    }

    // Save new Refresh token
    await new refreshTokenModel({
      userId: user._id,
      token: refreshToken,
    }).save();

    return Promise.resolve({
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = genToken;
