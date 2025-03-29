const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const auth = require("../middleware/auth");

// Add Food Item
router.post("/add", auth, async (req, res) => {
  const { name, quantity, category, expiryDate } = req.body;
  const userId = req.userId; 

  if (!name || !quantity || !category || !expiryDate) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const newFood = new Food({ userId, name, quantity, category, expiryDate });
    await newFood.save();
    res.status(201).json({ message: "Food item added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add food item." });
  }
});

// Get Food Items for Specific User
router.get("/", auth, async (req, res) => {
  const userId = req.userId; 

  try {
    const foods = await Food.find({ userId });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch food items." });
  }
});

// Delete Food Item
router.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    await Food.findByIdAndDelete(id);
    res.status(200).json({ message: "Food item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete food item." });
  }
});

module.exports = router;
