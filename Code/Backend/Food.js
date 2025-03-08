const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
}, { collection: "foods" });

module.exports = mongoose.model("Food", FoodSchema);
