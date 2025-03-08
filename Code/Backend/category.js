const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Add Category (For Admin or Manual Entry)
router.post("/add", async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Category name is required!" });
    }

    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: "Category added successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add category." });
    }
});

// Add Multiple Categories (Bulk Insert)
router.post("/bulk-add", async (req, res) => {
    const categories = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
        return res.status(400).json({ message: "At least one category is required!" });
    }

    try {
        const insertedCategories = await Category.insertMany(categories);
        res.status(201).json({ 
            message: "Categories added successfully!", 
            data: insertedCategories 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add categories." });
    }
});

// Get Categories (For Dropdown)
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories." });
    }
});

module.exports = router;
