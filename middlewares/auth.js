const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log("Token from cookies:", token); // Debugging

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedToken.id).exec();
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    next();
  } catch (error) {
    console.error("Error verifying token:", error); // Debugging
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// handeling user roles :-
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          success: false,
          message: `Role (${req.user.role}) is not authorized to access this resource`,
        })
      );
    }
    next();
  };
};
