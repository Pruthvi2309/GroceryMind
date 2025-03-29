const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// Update Reminder Days
router.post("/setReminderDays", auth, async (req, res) => {
    const { reminderDays } = req.body;

    // Ensure reminderDays is provided and valid
    if (!reminderDays || typeof reminderDays !== 'number' || reminderDays <= 0) {
        return res.status(400).json({ message: "Valid reminder days are required." });
    }

    try {
        // No need for userId in the body, we can extract it from the auth token
        const user = await User.findByIdAndUpdate(
            req.userId,  // Extracted securely from the token
            { $set: { reminderDays } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Reminder days updated successfully!", user });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Failed to update reminder days." });
    }
});

// Get User Profile (Improved for flexibility)
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            contactNo: user.contactNo,
            reminderDays: user.reminderDays
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Failed to fetch user profile." });
    }
});

module.exports = router;
