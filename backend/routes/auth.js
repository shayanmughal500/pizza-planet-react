const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { generateToken, authMiddleware } = require('../middleware/auth');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Name, phone, and password are required' });
    }
    const [existing] = await pool.query('SELECT id FROM users WHERE phone = ? OR email = ?', [phone, email || null]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Phone or email already registered' });
    }
    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email || null, phone, hash]
    );
    const user = { id: result.insertId, name, email: email || '', phone, role: 'customer' };
    const token = generateToken(user);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!password || (!email && !phone)) {
      return res.status(400).json({ success: false, message: 'Email/phone and password required' });
    }
    const field = email ? 'email' : 'phone';
    const value = email || phone;
    const [users] = await pool.query(`SELECT * FROM users WHERE ${field} = ?`, [value]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
        token
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    // Get user's saved addresses
    const [addresses] = await pool.query('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC', [req.user.id]);
    res.json({ success: true, data: { ...users[0], addresses } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/addresses
router.post('/addresses', authMiddleware, async (req, res) => {
  try {
    const { label, address, isDefault } = req.body;
    if (!address) return res.status(400).json({ success: false, message: 'Address is required' });
    if (isDefault) {
      await pool.query('UPDATE addresses SET is_default = FALSE WHERE user_id = ?', [req.user.id]);
    }
    const [result] = await pool.query(
      'INSERT INTO addresses (user_id, label, address, is_default) VALUES (?, ?, ?, ?)',
      [req.user.id, label || 'Home', address, isDefault || false]
    );
    const [addr] = await pool.query('SELECT * FROM addresses WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: addr[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/auth/profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name || req.user.name, email || null, req.user.id]);
    res.json({ success: true, message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;