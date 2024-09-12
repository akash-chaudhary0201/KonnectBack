const Post = require("../models/post");
const User = require("../models/user");
const Like = require("../models/like");
const Comment = require("../models/comment");

// Controller to create a post :- /tk/teacher/createPost
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new post
    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    const user = await User.findById(req.user.id);
    user.posts.push(post._id);
    await user.save();

    const populatedPost = await Post.findById(post._id).populate("author");

    res.status(201).json({
      success: true,
      message: "Post created and added to user",
      post: populatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to get all the posts :- /tk/feed
exports.getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "_id name")
      .populate("likes");

    res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Route to get a specific post :- /tk/feed/:id
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name")
      .populate("likes")
      .populate({
        path: "comments",
        populate: { path: "author", select: "name" },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      message: "Single post fetched successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
