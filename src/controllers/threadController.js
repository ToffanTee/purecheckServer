const Thread = require("../models/CommunityModels/threadModel");
const { getCurrentUser } = require("../services/userServices"); // Importing a function to retrieve user information

const createThread = async (req, res) => {
  // Extract title and content from the request body
  const { title } = req.body;
  // Get the user's ID from the request
  const { id } = req.user;

  try {
    // Retrieve the current user's information
    const user = await getCurrentUser(id);

    if (!user) {
      // If the user is not logged in, return a 403 error
      return res.status(403).json("You are not logged in!");
    }

    // Create thread data object, including author information
    const threadData = {
      title,
      author: { email: user.email, userId: user._id },
    };

    // Create a new thread instance and save it to the database
    const newThread = new Thread(threadData);
    await newThread.save();

    if (!newThread) {
      // If the thread creation failed, return a 400 error
      return res.status(400).json({ error: "Thread creation failed" });
    }

    // If the thread is created successfully, return a 201 status code and the new blog data
    return res
      .status(201)
      .json({ message: "Thread created successfully", newThread });
  } catch (error) {
    // Catch any errors during thread creation and return a 500 error
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = createThread;
