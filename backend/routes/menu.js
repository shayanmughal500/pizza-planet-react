const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET /api/menu/items — all menu items with sizes
router.get('/items', async (req, res) => {
  try {
    const { category } = req.query;
    let query = `
      SELECT mi.*, c.slug as category_slug, c.label as category_label, c.emoji as category_emoji
      FROM menu_items mi
      JOIN categories c ON mi.category_id = c.id
      WHERE mi.is_available = TRUE
    `;
    const params = [];
    if (category && category !== 'all') {
      query += ' AND c.slug = ?';
      params.push(category);
    }
    query += ' ORDER BY c.display_order, mi.id';

    const [items] = await pool.query(query, params);

    // Fetch sizes for items that have them
    const itemIds = items.map(i => i.id);
    if (itemIds.length > 0) {
      const [sizes] = await pool.query(
        'SELECT * FROM item_sizes WHERE menu_item_id IN (?)',
        [itemIds]
      );
      const sizeMap = {};
      sizes.forEach(s => {
        if (!sizeMap[s.menu_item_id]) sizeMap[s.menu_item_id] = {};
        sizeMap[s.menu_item_id][s.size_key] = { label: s.label, price: Number(s.price) };
      });
      items.forEach(item => {
        if (sizeMap[item.id]) {
          item.sizes = sizeMap[item.id];
          item.hasSizes = Object.keys(sizeMap[item.id]).length > 1;
          if (item.hasSizes) {
            const keys = Object.keys(item.sizes);
            item.defaultSize = keys[0];
            item.defaultPrice = Number(item.sizes[keys[0]].price);
          }
        }
        item.price = item.price ? Number(item.price) : item.defaultPrice || 0;
        if (item.tags) item.tags = typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags;
      });
    }

    res.json({ success: true, data: items });
  } catch (err) {
    console.error('Menu error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/menu/categories
router.get('/categories', async (req, res) => {
  try {
    const [cats] = await pool.query('SELECT * FROM categories ORDER BY display_order');
    res.json({ success: true, data: cats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/menu/items/:id
router.get('/items/:id', async (req, res) => {
  try {
    const [items] = await pool.query(
      'SELECT mi.*, c.slug as category_slug FROM menu_items mi JOIN categories c ON mi.category_id = c.id WHERE mi.id = ?',
      [req.params.id]
    );
    if (items.length === 0) return res.status(404).json({ success: false, message: 'Item not found' });
    const [sizes] = await pool.query('SELECT * FROM item_sizes WHERE menu_item_id = ?', [req.params.id]);
    const item = items[0];
    if (sizes.length > 0) {
      item.sizes = {};
      sizes.forEach(s => { item.sizes[s.size_key] = { label: s.label, price: Number(s.price) }; });
      item.hasSizes = sizes.length > 1;
    }
    item.price = item.price ? Number(item.price) : item.defaultPrice || 0;
    if (item.tags) item.tags = typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags;
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;