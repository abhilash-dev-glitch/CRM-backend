const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
const header = req.headers.authorization;
if (!header) return res.status(401).json({ message: 'Authorization header missing' });


const parts = header.split(' ');
if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'Invalid auth format' });


const token = parts[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid or expired token' });
}
};


module.exports = auth;