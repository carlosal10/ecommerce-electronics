const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @POST /api/orders
router.post('/', async (req, res) => {
  try {
    const {
      orderId,
      items,
      totalItems,
      totalCost,
      customerEmail,
      customerPhone,
      deliveryAddress,
      paymentMethod
    } = req.body;

    if (!orderId || !items || !customerEmail || !customerPhone || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = new Order({
      orderId,
      items,
      totalItems,
      totalCost,
      customerEmail,
      customerPhone,
      deliveryAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'cod' : 'paid' // simulate
    });

    await order.save();
    res.status(201).json({ message: 'Order saved successfully', order });
  } catch (err) {
    console.error('Order saving error:', err);
    res.status(500).json({ error: 'Server error while saving order' });
  }
});

module.exports = router;
