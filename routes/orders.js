// routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { orderId, items, totalItems, totalCost, date } = req.body;
    if (!orderId || !items || !totalItems || !totalCost) {
      return res.status(400).json({ error: 'Incomplete order data' });
    }

    const order = new Order({ orderId, items, totalItems, totalCost, date });
    await order.save();

    res.status(201).json({ message: 'Order saved', order });
  } catch (err) {
    console.error('Order save error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
