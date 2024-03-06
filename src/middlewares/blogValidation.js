const validateBlogData = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send({ error: "Title and content are required." });
  }

  next();
};

module.exports = { validateBlogData };
