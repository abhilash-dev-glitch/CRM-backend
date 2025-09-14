const Case = require('../models/Case');


const list = async (req, res, next) => {
try {
const cases = await Case.find().limit(100).populate('customer_id').populate('assigned_to', 'username');
res.json(cases);
} catch (err) { next(err); }
};


const create = async (req, res, next) => {
try {
const { customer_id, title, description, priority, assigned_to } = req.body;
if (!customer_id || !title) return res.status(400).json({ message: 'customer_id and title required' });


const c = new Case({ customer_id, title, description, priority, assigned_to });
await c.save();
res.status(201).json(c);
} catch (err) { next(err); }
};


const get = async (req, res, next) => {
try {
const c = await Case.findById(req.params.id).populate('customer_id').populate('assigned_to', 'username');
if (!c) return res.status(404).json({ message: 'Case not found' });
res.json(c);
} catch (err) { next(err); }
};


const update = async (req, res, next) => {
try {
const c = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!c) return res.status(404).json({ message: 'Case not found' });
res.json(c);
} catch (err) { next(err); }
};


const remove = async (req, res, next) => {
try {
const c = await Case.findByIdAndDelete(req.params.id);
if (!c) return res.status(404).json({ message: 'Case not found' });
res.json({ message: 'Deleted' });
} catch (err) { next(err); }
};


module.exports = { list, create, get, update, remove };