const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    status: String
});

// Model
const User = mongoose.model('User', UserSchema);

module.exports = User;