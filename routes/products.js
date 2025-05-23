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

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, price, stock, features, description } = req.body;

    if (!name || !price || !stock || !features || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const photoPath = req.file?.path || null;

    const product = new Product({
      name,
      price: Number(price),
      stock: Number(stock),
      features,
      description,
      photo: photoPath
    });

    await product.save();

    res.status(201).json({ message: "Product successfully added", product });
  } catch (error) {
    console.error("❌ Error saving product:", error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});


module.exports = router;
