const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.methods.getJWTToken = function () {
  const payload = { role: this.role, id: this._id };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
