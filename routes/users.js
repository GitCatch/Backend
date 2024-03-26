const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/Backend");

// Define the schema for user details
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.plugin(plm);
// Create a Mongoose model based on the schema
module.exports = mongoose.model('UserDetails', userSchema);



