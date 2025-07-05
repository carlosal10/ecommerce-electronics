const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      features: String,
      description: String
    }
  ],
  totalItems: Number,
  totalCost: Number,
  customerEmail: String,
  customerPhone: String,
  deliveryAddress: String,
  paymentMethod: String,
  paymentStatus: { type: String, default: 'pending' }, // paid | cod | failed
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
