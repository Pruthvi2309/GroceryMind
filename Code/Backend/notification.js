// utils/notification.js

// Example of a function that sends notifications (you can modify it to use any notification service)
const sendNotification = (user, product) => {
    console.log(`Sending notification to ${user.firstName} ${user.lastName} for product ${product.name}.`);

    // Here you would send the actual notification (using Firebase, Push Notifications, etc.)
    // For now, it's just a log message.
};

module.exports = { sendNotification };
