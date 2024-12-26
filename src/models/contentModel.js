const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
     title: { type: String, required: true },
     desc: { type: String, required: true },
     content: { type: String, required: true },
     created_at: { type: Date, default: Date.now },
     updated_at: { type: Date, default: Date.now },
     is_active: { type: Boolean, default: true },
     created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

module.exports = mongoose.model('Content', contentSchema);