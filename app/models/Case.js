const { Schema, model } = require('mongoose');


const CaseSchema = new Schema({
customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
assigned_to: { type: Schema.Types.ObjectId, ref: 'User' },
priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
status: { type: String, enum: ['open', 'in-progress', 'resolved'], default: 'open' },
title: { type: String, required: true },
description: { type: String },
}, { timestamps: true });


module.exports = model('Case', CaseSchema);