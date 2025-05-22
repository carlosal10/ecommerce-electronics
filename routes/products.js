const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // adjust path as needed

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists and is writable
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// POST /api/products route
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, price, stock, features, description } = req.body;
    const photoPath = req.file ? req.file.path : null;

    if (!name || !price || !stock || !features || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product({
      name,
      price,
      stock,
      features,
      description,
      photo: photoPath
    });

    await product.save();

    res.status(201).json({ message: "Product successfully added", product });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
