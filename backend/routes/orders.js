const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Generate order number
function generateOrderNumber() {
  const prefix = 'PP';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${date}-${rand}`;
}

// POST /api/orders — create order
router.post('/', async (req, res) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { items, customerName, customerPhone, customerEmail, deliveryAddress, specialInstructions } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Find or create customer (using users table)
    let userId = null;
    if (customerPhone) {
      const [existing] = await conn.query('SELECT id FROM users WHERE phone = ?', [customerPhone]);
      if (existing.length > 0) {
        userId = existing[0].id;
      }
    }

    // Calculate totals
    const subtotal = items.reduce((sum, it) => sum + (it.price * it.qty), 0);
    const deliveryFee = subtotal >= 2000 ? 0 : 100;
    const total = subtotal + deliveryFee;

    // Create order
    const orderNumber = generateOrderNumber();
    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, order_number, subtotal, delivery_fee, total,
        customer_name, customer_phone, customer_email, delivery_address, special_instructions, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [userId, orderNumber, subtotal, deliveryFee, total,
       customerName, customerPhone, customerEmail || null, deliveryAddress, specialInstructions]
    );
    const orderId = orderResult.insertId;

    // Insert order items
    for (const it of items) {
      await conn.query(
        `INSERT INTO order_items (order_id, item_name, item_emoji, size_label, unit_price, quantity, subtotal)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [orderId, it.name, it.emoji || '', it.sizeLabel || null, it.price, it.qty, it.price * it.qty]
      );
    }

    // Status history
    await conn.query(
      'INSERT INTO order_status_history (order_id, status, notes) VALUES (?, ?, ?)',
      [orderId, 'pending', 'Order placed']
    );

    await conn.commit();

    res.status(201).json({
      success: true,
      data: {
        orderId,
        orderNumber,
        total,
        deliveryFee,
        status: 'pending'
      }
    });
  } catch (err) {
    await conn.rollback();
    console.error('Order error:', err);
    res.status(500).json({ success: false, message: err.message });
  } finally {
    conn.release();
  }
});

// GET /api/orders/:id — track order
router.get('/:id', async (req, res) => {
  try {
    const [orders] = await pool.query(
      `SELECT o.*, 
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('name', oi.item_name, 'emoji', oi.item_emoji, 'sizeLabel', oi.size_label, 'price', oi.unit_price, 'qty', oi.quantity))
         FROM order_items oi WHERE oi.order_id = o.id) as items
       FROM orders o WHERE o.id = ? OR o.order_number = ?`,
      [req.params.id, req.params.id]
    );
    if (orders.length === 0) return res.status(404).json({ success: false, message: 'Order not found' });

    const [history] = await pool.query(
      'SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at DESC',
      [orders[0].id]
    );

    const order = orders[0];
    if (order.items) order.items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

    res.json({ success: true, data: { ...order, statusHistory: history } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['pending','confirmed','preparing','ready','out_for_delivery','delivered','cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Order not found' });

    await pool.query('INSERT INTO order_status_history (order_id, status, notes) VALUES (?, ?, ?)',
      [req.params.id, status, notes || '']);

    res.json({ success: true, data: { status } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders — list recent orders
router.get('/', async (req, res) => {
  try {
    const { phone, limit = 20 } = req.query;
    let query = 'SELECT * FROM orders';
    const params = [];
    if (phone) {
      query += ' WHERE customer_phone = ?';
      params.push(phone);
    }
    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(parseInt(limit, 10));

    const [orders] = await pool.query(query, params);
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;