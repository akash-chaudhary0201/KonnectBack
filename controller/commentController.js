const Comment = require("../models/comment");
const Post = require("../models/post");

// Route to add comment to a post :- /tk/comments/:id
exports.addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(500).json({
        success: true,
        message: "Post Not Found",
      });
    }
    console.log("Content to be saved :- ", content);

    const comment = await Comment.create({
      content,
      author: req.user.id,
      post: req.params.id,
    });
    console.log("Created comment :- ", comment);

    post.comments.push(comment);
    await post.save();
    res.status(201).json({
      success: true,
      message: "Comment Addedd Successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
