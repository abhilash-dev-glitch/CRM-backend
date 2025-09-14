const mongoose = require('mongoose');


const connectDB = async () => {
try {
const uri = process.env.MONGO_URI || 'mongodb+srv://abhilashchandra26_db_user:CVp1ThXhbxm1PPfd@cluster0.fnmzimc.mongodb.net/CRM';
await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB connected');
} catch (err) {
console.error('MongoDB connection error:', err.message);
process.exit(1);
}
};


module.exports = connectDB;