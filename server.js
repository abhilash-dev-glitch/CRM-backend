const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  /\.vercel\.app$/         // any Vercel frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => o.test ? o.test(origin) : o === origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Simple logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/auth', require('./app/routes/auth'));
app.use('/api/customers', require('./app/routes/customers'));
app.use('/api/cases', require('./app/routes/cases'));

// Health check
app.get('/', (req, res) => res.send('CRM API is running'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

module.exports = app;
