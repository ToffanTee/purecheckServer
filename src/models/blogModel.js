const mongoose = require("mongoose");

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}
    content: { type: String, required: true },
    author: {
      email: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    comments: [
      {
        user: { userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" } },
        body: String,
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
