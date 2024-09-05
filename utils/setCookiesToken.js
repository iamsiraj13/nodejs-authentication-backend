const setCookieToken = async (
  res,
  accessToken,
  refreshToken,
  accessTokenExp,
  refreshTokenExp
) => {
  const accessTokenAge =
    (accessTokenExp - Math.floor(Date.now() / 1000)) * 1000; // Convert to milliseconds
  const refreshTokenAge =
    (refreshTokenExp - Math.floor(Date.now() / 1000)) * 1000; // Convert to milliseconds

  // Set cookie for access token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false, // set to true if using https
    maxAge: accessTokenAge,
    // sameSite:'strict', // adjust according to your requirement
  });
  // Set cookie for access token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, // set to true if using https
    maxAge: refreshTokenAge,
    // sameSite:'strict', // adjust according to your requirement
  });
};

module.exports = setCookieToken;
