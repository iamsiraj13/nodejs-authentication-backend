const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const sendEmailOtp = require("../utils/sendEmailOtp");
const otpModel = require("../models/otpModel");

// User Registration

const userRegistration = async (req, res) => {
  try {
    // extract users info from req.body
    const { name, email, password, password_confirmation } = req.body;
    // Check all fields are required
    if (!email || !name || !password || !password_confirmation) {
      return res.status(400).json({
        status: "Failed",
        message: "All fields are required",
      });
    }
    // Check if password and password_confirmation match
    if (password !== password_confirmation) {
      return res.status(400).json({
        status: "Failed",
        message: "Password doesn't match",
      });
    }
    // Check if user exist or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(404).json({
        status: "Failed",
        message: "Email already exist",
      });
    }
    // Generate hash password

    const salt = await bcrypt.genSalt(Number(10));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // send mail

    sendEmailOtp(newUser);
    // Send Success Message
    res.status(201).json({
      status: "Success",
      message: "User registraion success",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: "Unable to register, Please try again letter",
    });
  }
};

// User Email verification
const verifyEmail = async (req, res) => {
  try {
    // Extract request body parameters
    const { otp, email } = req.body;

    // Check if all required fields are provided

    if (!otp || !email) {
      return res.status(500).json({
        status: "Failed",
        message: "All fields are required !",
      });
    }

    // Check if email doesn't exist
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: "Failed",
        message: "User not foud with this email",
      });
    }
    // Check if email is already verified or not
    if (existingUser.is_verified) {
      return res.status(400).json({
        status: "Failed",
        message: "Email is already verified",
      });
    }

    // Check if there is a matching email verification otp

    const validOtp = await otpModel.findOne({ userId: existingUser._id, otp });
    if (!validOtp) {
      if (!existingUser.is_verified) {
        await sendEmailOtp(existingUser);
        return res.status(400).json({
          status: "Failed",
          message: "Invalid OTP, new OTP sent to your email",
        });
      }

      return res.status(400).json({
        status: "Failed",
        message: "Invalid OTP",
      });
    }

    // Check if OTP is expired
    const currentTime = new Date();
    const expireTime = new Date(validOtp.createdAt.getTime() + 15 * 60 * 1000);

    if (currentTime > expireTime) {
      // OTP expired , send new OTP
      await sendEmailOtp(existingUser);
      return res.status(400).json({
        status: "Failed",
        message: "OTP expired, new OTP sent to your email",
      });
    }
    // OTP is valid and not expired, mark email as verified
    existingUser.is_verified = true;
    await existingUser.save();

    // Delete email verification document

    await otpModel.deleteMany({ userId: existingUser._id });
    res.status(200).json({
      status: "Success",
      message: "Email Verified Successfull",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Unable to verify email, Please try again letter",
    });
  }
};
// User Login

// Access token and refresh token

// Change Password

// User login or profile

// Send reset password email

// User logout

module.exports = { userRegistration, verifyEmail };
