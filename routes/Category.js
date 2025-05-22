const express = require('express');
const router = express.Router();
const Category = require('../models/categories');

// Add a new category
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: 'Category added', category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
