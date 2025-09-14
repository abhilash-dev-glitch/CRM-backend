const User = require("../models/User");
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =======================
// Register a new user
// =======================
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Save user
    const user = new User({ username, password_hash });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// =======================
// Login user
// =======================
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// =======================
// JWT Authentication Middleware
// =======================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// =======================
// Add a customer (protected)
// =======================
const addCustomer = async (req, res) => {
  try {
    const { name, contact_info, status, metadata } = req.body;

    if (!name) return res.status(400).json({ message: "Customer name is required" });

    const customer = new Customer({
      name,
      contact_info,
      status: status || "active",
      metadata: metadata || {}
    });

    await customer.save();

    res.status(201).json({ message: "Customer added successfully", customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// =======================
// Export all functions
// =======================
module.exports = { register, login, addCustomer, authMiddleware };
