const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  userLogout,
  getUsersProfile,
} = require("../controller/authController");
const { isAuthenticated } = require("../middlewares/auth");

// route to user registration :-
router.post("/register", registerUser);

// route to user login :-
router.post("/login", loginUser);

// route to user logout :-
router.get("/logout", userLogout);

// Route for user to get his/her profile details :-
router.get("/me", isAuthenticated, getUsersProfile);

module.exports = router;
