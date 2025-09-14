const { Schema, model } = require('mongoose');


const ContactSchema = new Schema({
email: String,
phone: String,
address: String,
});


const CustomerSchema = new Schema({
name: { type: String, required: true },
contact_info: { type: ContactSchema, default: {} },
status: { type: String, enum: ['active', 'inactive'], default: 'active' },
metadata: { type: Object, default: {} },
}, { timestamps: true });


module.exports = model('Customer', CustomerSchema);