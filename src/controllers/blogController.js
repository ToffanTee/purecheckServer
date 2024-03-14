// Import the Blog model and getCurrentUser function
const Blog = require("../models/blogModel"); // Importing the Blog model for interacting with blog data
const { getCurrentUser } = require("../services/userServices"); // Importing a function to retrieve user information

// Retrieve all blogs
const getAllBlogs = async (req, res) => {
  try {
    // Find all blogs in the database
    const blogs = await Blog.find({}); // Using Mongoose to find all blog documents

    if (blogs.length <= 0) {
      // If no blogs are found, return a 401 error
      return res.status(401).json({ error: "No blogs found" });
    }

    // If blogs are found, return them as a JSON response with a 200 status code
    return res.status(200).json(blogs);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    return res.status(500).json({ error: "Internal sever error!" });
  }
};

// Create a new blog
const createBlogs = async (req, res) => {
  // Extract title and content from the request body
  const { title, content } = req.body;
  // Get the user's ID from the request
  const { id } = req.user;

  try {
    // Retrieve the current user's information
    const user = await getCurrentUser(id);

    if (!user) {
      // If the user is not logged in, return a 403 error
      return res.status(403).json("You are not logged in!");
    }

    // Create blog data object, including author information
    const blogData = {
      title,
      content,
      author: { email: user.email, userId: user._id },
    };

    // Create a new Blog instance and save it to the database
    const newBlog = new Blog(blogData);
    await newBlog.save();

    if (!newBlog) {
      // If the blog creation failed, return a 400 error
      return res.status(400).json({ error: "Blog creation failed" });
    }

    // If the blog is created successfully, return a 201 status code and the new blog data
    return res
      .status(201)
      .json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    // Catch any errors during blog creation and return a 500 error
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing blog
const updateBlog = async (req, res) => {
  // Extract title, content, user ID, and blog ID from the request
  const { title, content } = req.body;
  const { id } = req.user;
  const { blogId } = req.params;

  try {
    // Retrieve the current user's information
    const user = await getCurrentUser(id);

    // Find the blog to be updated by its ID
    const blog = await Blog.findById(blogId);

    if (!blog) {
      // If the blog does not exist, return a 404 error
      return res.status(404).json({ error: "The blog does not exist" });
    }

    if (!user) {
      // If the user is not authorized, return a 403 error
      return res
        .status(403)
        .json("You do not have permission to perform this action");
    }

    // Update the blog's title and content, then save the changes
    blog.title = title;
    blog.content = content;
    await blog.save();

    // Return a 201 status code and the updated blog data
    return res.status(201).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    // Catch any errors during blog update and return a 500 error
    return res.status(500).json({ error: "Internal server error" });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    await Blog.findByIdAndDelete(blogId);

    return res.status(201).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getSingleBlog = async (req, res) => {
  const blogTitle = req.params.blogTitle;

  try {
    // Find all blogs in the database
    const blog = await Blog.findOne({ title: blogTitle }); // Using Mongoose to find all blog documents

    if (!blog) {
      // If no blogs are found, return a 401 error
      return res.status(404).json({ error: "Blog not found" });
    }

    // If blogs are found, return them as a JSON response with a 200 status code
    return res.status(200).json(blog);
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    return res.status(500).json({ error: "Internal sever error!" });
  }
};

module.exports = {
  getAllBlogs,
  createBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
};
