const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true // Ensures that first name is mandatory
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true // Ensures that same email is unique and user cannot register with same email for more than one account
        },
        jobTitle: {
            type: String
        },
        gender: {
            type: String
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
