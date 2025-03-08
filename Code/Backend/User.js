const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNo: { type: String, required: true },
    password: { type: String, required: true },
}, { collection: "users" }); 

module.exports = mongoose.model("User", UserSchema, "users");

