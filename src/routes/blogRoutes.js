const express = require("express");
const {
  createBlogs,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} = require("../controllers/blogController");
const requireSignin = require("../middlewares/authTokenValidation");
const { validateBlogData } = require("../middlewares/blogValidation");

const blogRouter = express.Router();

blogRouter.get("/allblogs", getAllBlogs);

blogRouter.get("/blog:blogTitle", getSingleBlog);

blogRouter.post("/blog/create", requireSignin, validateBlogData, createBlogs);

blogRouter.put("/blog/update:blogId", requireSignin, updateBlog);

blogRouter.delete("/blog/delete:blogId", requireSignin, deleteBlog);

module.exports = blogRouter;
