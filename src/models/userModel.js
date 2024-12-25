const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     age: { type: Number, required: true },
     password: { type: String, required: true },
     refresh_token: { type: String }
});

module.exports = mongoose.model('User', userSchema);