const { Schema, model } = require('mongoose');


const UserSchema = new Schema({
username: { type: String, required: true, unique: true },
password_hash: { type: String, required: true },
role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
}, { timestamps: true });


module.exports = model('User', UserSchema);