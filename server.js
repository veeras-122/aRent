const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');

// Initialize app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/equipment', require('./routes/equipment'));
app.use('/api/bookings', require('./routes/bookings'));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.get('/equipment', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'equipment.html'));
});

app.get('/equipment/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'equipment-detail.html'));
});

app.get('/add-equipment', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'add-equipment.html'));
});

app.get('/bookings', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'bookings.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🌾 Agricultural Equipment Rental Platform 🚜       ║
  ║                                                       ║
  ║   Server running on port ${PORT}                        ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
  ║                                                       ║
  ║   🌐 http://localhost:${PORT}                          ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
