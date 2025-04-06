const cron = require('node-cron');
const mongoose = require('mongoose');
const { sendNotification } = require('../utils/notification');
const Food = require('../models/Food');
const User = require('../models/User');

// Schedule the cron job to run daily at 8 AM
cron.schedule('0 8 * * *', async () => {
    try {
        // Get today's date and user's reminder days
        const today = new Date();
        today.setHours(0, 0, 0, 0);  // Start of the day to compare expiry dates

        // Fetch all foods with reminder days logic applied
        const foods = await Food.find().populate('userId'); // Assuming userId is a reference to the User model
        
        // Loop through each product and check if it's expiring soon
        for (const product of foods) {
            const user = product.userId;
            if (user) {
                const reminderDays = user.reminderDays || 3; // Default to 3 days if not set
                const expiryDate = new Date(product.expiryDate);
                const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24)); // Get days difference

                if (daysLeft <= reminderDays && daysLeft >= 0) {
                    // Send notification
                    sendNotification(user, product);

                    // Update product color in frontend (set 'expireInRed' flag)
                    product.expiryStatus = 'Expiring soon';
                    product.expiryInRed = true; // Flag to show red on frontend
                    await product.save();

                    console.log(`Sent notification to ${user.firstName} for product ${product.name}`);
                }
            }
        }
    } catch (error) {
        console.error('Error running cron job:', error);
    }
});
