// const mongoose = require("mongoose");

// const ItemSchema = new mongoose.Schema({
//     itemName: { type: String, required: true, trim: true },
//     quantity: { type: Number, required: true, min: 1, default: 1 },
//     checked: { type: Boolean, default: false }
// });

// const ShoppingListSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     title: { type: String, required: true, trim: true, default: "Shopping List" },
//     date: { type: String, required: true, default: new Date().toISOString().split('T')[0] },
//     items: [ItemSchema],
//     boardContent: { type: String, default: "", trim: true },
//     status: { type: String, enum: ["active", "completed", "archived"], default: "active" }  // Added status for better state tracking
// }, { 
//     collection: "shoppinglists",
//     timestamps: true
// });

// // Index for faster search performance
// ShoppingListSchema.index({ userId: 1 });

// module.exports = mongoose.model("ShoppingList", ShoppingListSchema);




const mongoose = require("mongoose");

const ShoppingListSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    title: { type: String, required: true, trim: true, default: "Shopping List" },
    date: { type: String, required: true, default: new Date().toISOString().split('T')[0] },
    items: [{
        itemName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
    }],
    boardContent: { type: String, default: "", trim: true },
    status: { type: String, enum: ["active", "completed", "archived"], default: "active" },
}, { 
    collection: "shoppinglists",
    timestamps: true
});

// Index for faster search performance
ShoppingListSchema.index({ userId: 1 });

module.exports = mongoose.model("ShoppingList", ShoppingListSchema);