const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const sendEmailOtp = require("../utils/sendEmailOtp");

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

// User Login

// Access token and refresh token

// Change Password

// User login or profile

// Send reset password email

// User logout

module.exports = { userRegistration };
