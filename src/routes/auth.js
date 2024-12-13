const express = require("express");
const authRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Signup Route
authRouter.post("/signin", async (req, res) => {
  try {
    const { emailId, password, firstName, lastName } = req.body;

    // Validate request body
    if (!firstName || !lastName) {
      return res.status(400).send("First name and last name are required.");
    }
    if (!emailId || !validator.isEmail(emailId)) {
      return res.status(400).send("Invalid or missing email address.");
    }
    if (!password || !validator.isStrongPassword(password)) {
      return res.status(400).send(
        "Password must be strong (minimum 8 characters, include uppercase, lowercase, numbers, and symbols)."
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).send("User already exists with this email.");
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({ emailId, password: encryptedPassword, firstName, lastName });
    await user.save();

    res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(500).send("An error occurred during signup: " + error.message);
  }
});

// Login Route
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Validate request body
    if (!emailId || !password) {
      return res.status(400).send("Email and password are required.");
    }

    // Check if user exists
    const existingUser = await User.findOne({ emailId });
    if (!existingUser) {
      return res.status(404).send("User not found.");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password.");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: existingUser._id }, "ram", { expiresIn: "1h" });

    // Set token in cookie
    res.cookie("authToken", token, { httpOnly: true, expires: new Date(Date.now() + 3600000) });
    res.send("User logged in successfully.");
  } catch (error) {
    res.status(500).send("An error occurred during login: " + error.message);
  }
});

// Logout Route
authRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("authToken");
    res.send("User logged out successfully.");
  } catch (error) {
    res.status(500).send("An error occurred during logout: " + error.message);
  }
});

module.exports = authRouter;
