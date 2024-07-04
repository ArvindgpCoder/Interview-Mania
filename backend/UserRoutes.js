const User = require("./UserModel.js");

const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
}

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Signup request body:", req.body);

  try {
    // Check if email already exists
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      console.log("Email already exists:", email);
      return res.status(400).send("Email Already Exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create a new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log("Saved user:", savedUser);

    // Respond with the saved user (excluding password for security reasons)
    res.status(200).send("Signup successful");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Server error");
  }
});

// Login route using Passport
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).send("Server error");
      }
      console.log('User logged in:', req.user);
      // Send the user information along with the response
      res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
    });
  })(req, res, next);
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send('Logged out successfully');
  });
});

router.get("/check", (req, res) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  if (req.isAuthenticated()) {
    return res.status(200).json({ authenticated: true, user: { name: req.user.name, email: req.user.email } });
  }
  res.status(401).json({ authenticated: false });
});

module.exports = router;
