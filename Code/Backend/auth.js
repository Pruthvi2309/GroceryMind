const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

// Utility function for generating JWT tokens
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "defaultsecret", { expiresIn: "1h" });
  };
  
  // Signup
  router.post("/signup", async (req, res) => {
    const { firstName, lastName, contactNo, password } = req.body;
  
    if (!firstName || !lastName || !contactNo || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      let user = await User.findOne({ contactNo });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      user = new User({ firstName, lastName, contactNo, password: hashedPassword });
  
      await user.save();
  
      const token = generateToken(user._id);
  
      res.status(201).json({ message: "User created successfully", token, userId: user._id });
    } catch (err) {
      console.error("Signup Error:", err);
      res.status(500).json({ message: "Server error during signup." });
    }
  });
  
  // Login
  router.post("/login", async (req, res) => {
    const { contactNo, password } = req.body;
  
    if (!contactNo || !password) {
      return res.status(400).json({ message: "Contact number and password are required." });
    }
  
    try {
      const user = await User.findOne({ contactNo });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
  
      const token = generateToken(user._id);
  
      res.status(200).json({ message: "Login successful", token, userId: user._id });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "Server error during login." });
    }
  });

// Profile Endpoint
router.get('/profile', auth, async (req, res) => {
  try {
      const user = await User.findById(req.userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
  } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Failed to fetch user profile' });
  }
});


module.exports = router;

