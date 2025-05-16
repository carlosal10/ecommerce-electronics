const express = require('express');
const router = express.Router();
const Product = require('../server/models/Product');

// Add new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
