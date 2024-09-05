const transporter = require("../config/emailconfig");
const { EMAIL_FROM, FRONTEND_HOST } = require("../env");
const otpModel = require("../models/otpModel");

const sendEmailOtp = async (user) => {
  // Generate a random 4-digit number
  const otp = Math.floor(1000 + Math.random() * 9000);

  //   Save OTP in database
  await new otpModel({
    userId: user._id,
    otp: otp,
  }).save();

  //OTP verification link (optional usage)
  const otpVerificationLink = `${FRONTEND_HOST}/account/verify`;

  // Send OTP email
  await transporter.sendMail({
    from: EMAIL_FROM,
    to: user.email,
    subject: "OTP - Verify your account",
    html: `
        <h2>Dear ${user.name},</h2>
        <p>Thank you for signing up with our website. To complete your registration, please verify your email address by entering the following one-time password (OTP): <strong>${otp}</strong></p>
        <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>
        <p>You can also visit the following link to verify: <a href="${otpVerificationLink}">${otpVerificationLink}</a></p>
        <h3>Your OTP: ${otp}</h3>
      `,
  });
};

module.exports = sendEmailOtp;
