import express from 'express';
import Order from '../models/Order.js';
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { items, totalItems, totalCost } = req.body;
  if (!items || !totalItems || !totalCost)
    return res.status(400).json({ error: "Incomplete order data" });

  const order = new Order({
    user: req.user._id,
    items, totalItems, totalCost,
    date: new Date(),
  });
  await order.save();
  res.status(201).json({ message: "Order saved", order });
});


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

export default router;
