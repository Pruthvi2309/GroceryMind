const express = require("express");
const router = express.Router();
const ShoppingList = require("../models/ShoppingList");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

// Middleware to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create or Fetch Shopping List (Combined Logic)
router.get("/", auth, async (req, res) => {
    const userId = req.userId;

    try {
        let shoppingList = await ShoppingList.findOne({ userId });

        // Auto-create shopping list if not found
        if (!shoppingList) {
            shoppingList = new ShoppingList({
                userId,
                title: "Shopping List",
                date: new Date().toISOString().split('T')[0],
                items: []
            });
            await shoppingList.save();
        }

        res.status(200).json(shoppingList);
    } catch (error) {
        console.error("Error fetching or creating shopping list:", error);
        res.status(500).json({ message: "Failed to fetch or create shopping list." });
    }
});

// Add Item to Shopping List
router.post("/add-item", auth, async (req, res) => {
    const { itemName, quantity } = req.body;

    if (!itemName || !quantity) {
        return res.status(400).json({ message: "Item name and quantity are required." });
    }

    try {
        const shoppingList = await ShoppingList.findOne({ userId: req.userId });

        if (!shoppingList) {
            return res.status(404).json({ message: "Shopping list not found." });
        }

        shoppingList.items.push({ itemName, quantity });
        await shoppingList.save();
        res.status(200).json({ message: "Item added successfully!", shoppingList });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Failed to add item." });
    }
});

// Delete Item from Shopping List
router.delete("/delete-item/:itemId", auth, async (req, res) => {
    const { itemId } = req.params;
    console.log("Attempting to delete item with ID:", itemId);

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(400).json({ message: "Invalid item ID." });
    }

    try {
        const shoppingList = await ShoppingList.findOne({ userId: req.userId });

        if (!shoppingList) {
            return res.status(404).json({ message: "Shopping list not found." });
        }

        // Filter the items array to remove the item with the given ID
        shoppingList.items = shoppingList.items.filter(item => item._id.toString() !== itemId);

        await shoppingList.save();
        res.status(200).json({ message: "Item deleted successfully!" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Failed to delete item." });
    }
});


module.exports = router;
