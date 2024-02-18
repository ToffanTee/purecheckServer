const validateUserModelData = (req, res, next) => {
  const { firstName, middleName, lastName, email, password, confirmPassword } =
    req.body;
  const allowedChars = /^[A-Za-zÀ-ÖØñáäëíöüšŸ '-]+$/; // Regular expression for name validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Regular expression for password

  // CHECK IF FIRSTNAME AND LASTNAME ARE PROVIDED
  if (!firstName || !lastName)
    return res
      .status(400)
      .send({ error: "First name and Last name are required" });

  // CHECK IF EMAIL AND PASSWORD ARE PROVIDED
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  // CHECK IF NAME CONTAINS NOT-ALLOWED CHARACTERS
  if (
    (!allowedChars.test(firstName) || !allowedChars.test(middleName),
    !allowedChars.test(lastName))
  ) {
    res.status(400).json({
      error: "Name must only contain letters, hyphens, and apostrophes.",
    });
    return;
  }

  // CHECK IF EMAIL IS A VALID EMAIL FORMAT
  if (!emailRegex.test(email)) {
    return res.status(400).send({ error: "Invalid email format" });
  }

  // CHECK IF PASSWORDS MATCH
  if (password !== confirmPassword) {
    return res.status(400).send({ error: "Passwords do not match." });
  }

  // CHECK IF Password contains at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).send({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  next();
};

module.exports = { validateUserModelData };
