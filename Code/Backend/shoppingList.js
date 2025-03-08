const express = require("express");
const router = express.Router();
const ShoppingList = require("../models/ShoppingList");

// Add New Shopping List
router.post("/add", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required!" });
    }

    try {
        const currentDate = new Date().toISOString().split('T')[0];

        const newList = new ShoppingList({
            title,
            date: currentDate,
            items: []
        });

        await newList.save();
        res.status(201).json({ message: "Shopping list created successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create shopping list." });
    }
});

// Add Item to Shopping List
router.post("/add-item/:id", async (req, res) => {
    const { itemName, quantity } = req.body;  // Ensure both itemName and quantity are received

    if (!itemName || !quantity) {
        return res.status(400).json({ message: "Item name and quantity are required!" });
    }

    try {
        const list = await ShoppingList.findById(req.params.id);
        if (!list) {
            return res.status(404).json({ message: "Shopping list not found!" });
        }

        list.items.push({ itemName, quantity });
        await list.save();
        res.status(200).json({ message: "Item added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add item." });
    }
});

// Mark Item as Bought
router.put("/mark-bought/:listId/:itemId", async (req, res) => {
    try {
        const list = await ShoppingList.findById(req.params.listId);
        const item = list.items.id(req.params.itemId);
        item.checked = !item.checked;  // Toggle bought status
        await list.save();
        res.status(200).json({ message: "Item updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update item." });
    }
});

// Delete Item
router.delete("/delete-item/:listId/:itemId", async (req, res) => {
    try {
        const list = await ShoppingList.findById(req.params.listId);
        list.items.id(req.params.itemId).remove();
        await list.save();
        res.status(200).json({ message: "Item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete item." });
    }
});

module.exports = router;
