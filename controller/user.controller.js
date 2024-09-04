const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
// User Registration

const userRegistration = async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body;
    // check if all field are required

    if ((!name || !email || !password, !password_confirmation)) {
      return res.status(400).json({
        status: "Failed",
        message: "All fields are required",
      });
    }

    // check is password and confirm password match

    if (password !== password_confirmation) {
      return res.status(400).json({
        status: "Failed",
        message: "Password didn't match",
      });
    }

    // check if email already exist
    const existingUser = await userModel.find({ email });
    if (!existingUser) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(Number(10));

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Send success response

    res.status(201).json({
      status: "Success",
      message: "Registration Success",
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
// User Email Verification

// User Login

// Get New Access Token OR Refresh Token

// Change Password

// Profile Or LoggedIn

// Send Password Reset Email

// Logout

module.exports = { userRegistration };
