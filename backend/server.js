require('dotenv').config();
const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Protected admin routes
app.use('/api/admin', adminRoutes);

// Health
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Pizza Planet API running', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🍕 Pizza Planet API running on http://localhost:${PORT}`);
    console.log(`   Auth:  http://localhost:${PORT}/api/auth/login`);
    console.log(`   Menu:  http://localhost:${PORT}/api/menu/items`);
    console.log(`   Orders: http://localhost:${PORT}/api/orders`);
    console.log(`   Admin: http://localhost:${PORT}/api/admin/dashboard`);
  });
}

module.exports = app;