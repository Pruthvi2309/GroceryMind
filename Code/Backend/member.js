const express = require("express");
const router = express.Router();
const Member = require("../models/Member");
const mongoose = require("mongoose");

// Get members for a specific user
router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const members = await Member.find({ userId });
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch members." });
    }
});

// Add Member
router.post("/add", async (req, res) => {
    const { name, contactNo, userId } = req.body; 

    if (!name || !contactNo) {
        return res.status(400).json({ message: "Both name and contact number are required!" });
    }

    if (!/^\d{10}$/.test(contactNo)) {
        return res.status(400).json({ message: "Contact number must be exactly 10 digits." });
    }

    try {
        const existingMember = await Member.findOne({ contactNo });
        if (existingMember) {
            return res.status(400).json({ message: "Contact number already exists!" });
        }

        const newMember = new Member({ name, contactNo, userId });
        await newMember.save();
        res.status(201).json({ message: "Member added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add member." });
    }
});

// Get Members List
router.get("/", async (req, res) => {
    try {
        const members = await Member.find();
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch members." });
    }
});

// Remove Member
router.delete("/remove/:id", async (req, res) => {
    const { id } = req.params;

    // Check if ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Member ID format." });
    }

    try {
        const deletedMember = await Member.findByIdAndDelete(id);
        if (!deletedMember) {
            return res.status(404).json({ message: "Member not found." });
        }

        res.status(200).json({ message: "Member removed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to remove member." });
    }
});

module.exports = router;
