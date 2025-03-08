const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    checked: { type: Boolean, default: false }
});

const ShoppingListSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Title for shopping sheet
    date: { type: String, required: true },
    items: [ItemSchema] // Embedded items array
}, { 
    collection: "shoppinglists",
    timestamps: true  // Auto add createdAt and updatedAt
});

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);
