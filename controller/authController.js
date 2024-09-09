const User = require("../models/user");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");
const Post = require("../models/post");

// controller to register new user :-
exports.registerUser = async (req, res) => {
  const { name, email, password, role, about } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      about,
      password: hashedPassword,
      role,
    });
    sendToken(user, 200, res, "Registration Successfully");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// controller to login the user :-
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    sendToken(user, 200, res, "Login Successfull");
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};

// Controller to logout the user :-
exports.userLogout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

// Controller by which user can access his/her profile :-
exports.getUsersProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }

  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const postCount = await Post.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      user,
      totalPost: postCount,
      message: "User profile fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
