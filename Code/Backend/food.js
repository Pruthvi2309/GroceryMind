const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// Add Food Item
router.post("/add", async (req, res) => {
    const { userId, name, quantity, category, expiryDate } = req.body;

    if (!userId || !name || !quantity || !category || !expiryDate) {
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
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const foods = await Food.find({ userId });
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch food items." });
    }
});

// Delete Food Item
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Food.findByIdAndDelete(id);
        res.status(200).json({ message: "Food item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete food item." });
    }
});

module.exports = router;
