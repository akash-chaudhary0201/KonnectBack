const express = require("express");

const router = express.Router();

const { addComment } = require("../controller/commentController");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/comment/:id", isAuthenticated, addComment);

module.exports = router;
