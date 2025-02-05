const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    profilePicture: { type: String },
    accountStatus: { type: String, enum: ["Active", "Disabled"], default: "Active" },
    role: { type: String, enum: ["Patient", "Admin"], default: "Patient" },
    deletedAt: { type: Date }
}, { timestamps: true }); // ✅ لإضافة createdAt و updatedAt تلقائيًا

module.exports = mongoose.model('User', userSchema);
