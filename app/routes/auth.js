const express = require("express");
const router = express.Router();
const { register, login, addCustomer, authMiddleware } = require("../controllers/authController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route
router.post("/customers", authMiddleware, addCustomer);

module.exports = router;
