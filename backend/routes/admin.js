const express = require('express');
const pool = require('../config/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

// All routes require admin
router.use(authMiddleware, adminMiddleware);

// GET /api/admin/dashboard — summary stats
router.get('/dashboard', async (req, res) => {
  try {
    const [[{ totalOrders }]] = await pool.query('SELECT COUNT(*) as totalOrders FROM orders');
    const [[{ pendingOrders }]] = await pool.query("SELECT COUNT(*) as pendingOrders FROM orders WHERE status = 'pending'");
    const [[{ todayOrders }]] = await pool.query('SELECT COUNT(*) as todayOrders FROM orders WHERE DATE(created_at) = CURDATE()');
    const [[{ revenue }]] = await pool.query('SELECT COALESCE(SUM(total),0) as revenue FROM orders WHERE status != \'cancelled\'');
    const [[{ customers }]] = await pool.query('SELECT COUNT(*) as customers FROM users WHERE role = \'customer\'');
    res.json({ success: true, data: { totalOrders, pendingOrders, todayOrders, revenue, customers } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/orders — all orders
router.get('/orders', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    let query = `SELECT o.*, 
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('name',oi.item_name,'qty',oi.quantity,'price',oi.unit_price))
       FROM order_items oi WHERE oi.order_id = o.id) as items
      FROM orders o`;
    const params = [];
    if (status) { query += ' WHERE o.status = ?'; params.push(status); }
    query += ' ORDER BY o.created_at DESC LIMIT ?';
    params.push(parseInt(limit));
    const [orders] = await pool.query(query, params);
    orders.forEach(o => { if (o.items) o.items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items; });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/admin/orders/:id/status — update status
router.patch('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['pending','confirmed','preparing','ready','out_for_delivery','delivered','cancelled'];
    if (!valid.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
    const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Not found' });
    await pool.query('INSERT INTO order_status_history (order_id, status) VALUES (?,?)', [req.params.id, status]);
    res.json({ success: true, data: { status } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/orders/:id
router.get('/orders/:id', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    if (orders.length === 0) return res.status(404).json({ success: false, message: 'Not found' });
    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);
    const [history] = await pool.query('SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC', [req.params.id]);
    res.json({ success: true, data: { ...orders[0], items, statusHistory: history } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;