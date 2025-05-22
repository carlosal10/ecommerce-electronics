const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const Category = require('../models/categories');

// File storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// POST /api/products
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      features,
      description,
      category
    } = req.body;

    // Optional: Check if category exists; if not, create it
    let existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      existingCategory = new Category({ name: category });
      await existingCategory.save();
    }

    const photoPath = req.file ? req.file.path : null;

    const product = new Product({
      name,
      price,
      stock,
      features,
      description,
      category: existingCategory.name,
      photo: photoPath
    });

    await product.save();

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
