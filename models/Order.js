const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: String,
  items: Array,
  totalItems: Number,
  totalCost: Number,
  date: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
