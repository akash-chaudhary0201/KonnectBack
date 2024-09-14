const express = require("express");

const router = express.Router();

const { getAllPost, createPost } = require("../controller/postController");
const { isAuthenticated } = require("../middlewares/auth");

// route to create a new post :-
router.post("/teacher/createPost", isAuthenticated, createPost);

// route to get all the post :-
router.get("/feed", getAllPost);

module.exports = router;
