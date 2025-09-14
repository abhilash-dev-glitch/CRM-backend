const Customer = require('../models/Customer');


const list = async (req, res, next) => {
try {
const customers = await Customer.find().limit(100);
res.json(customers);
} catch (err) { next(err); }
};


const create = async (req, res, next) => {
try {
const { name, contact_info } = req.body;
if (!name) return res.status(400).json({ message: 'Customer name required' });


const customer = new Customer({ name, contact_info });
await customer.save();
res.status(201).json(customer);
} catch (err) { next(err); }
};


const get = async (req, res, next) => {
try {
const customer = await Customer.findById(req.params.id);
if (!customer) return res.status(404).json({ message: 'Customer not found' });
res.json(customer);
} catch (err) { next(err); }
};


const update = async (req, res, next) => {
try {
const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
if (!customer) return res.status(404).json({ message: 'Customer not found' });
res.json(customer);
} catch (err) { next(err); }
};


const remove = async (req, res, next) => {
try {
const customer = await Customer.findByIdAndDelete(req.params.id);
if (!customer) return res.status(404).json({ message: 'Customer not found' });
res.json({ message: 'Deleted' });
} catch (err) { next(err); }
};


module.exports = { list, create, get, update, remove };