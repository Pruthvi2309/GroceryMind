const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactNo: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);  // Only 10-digit numbers allowed
            },
            message: "Contact number must be exactly 10 digits."
        }
    },
    status: { type: String, enum: ['Pending', 'Accepted'], default: 'Pending' },
    inviteDate: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
}, { collection: "members" });

module.exports = mongoose.model("Member", MemberSchema);
