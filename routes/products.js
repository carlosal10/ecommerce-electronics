// routes/products.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

// Product creation route
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, price, stock, features, description } = req.body;

    if (!name || !price || !stock || !features || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product({
      name,
      price: Number(price),
      stock: Number(stock),
      features,
      description,
      photo: req.file ? req.file.path.replace(/\\/g, "/") : null, // Use forward slashes for URLs
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});


// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    
    // Add proper photo URL
    const BASE_URL = process.env.BASE_URL || "https://ecommerce-electronics-0j4e.onrender.com";
    const updatedProducts = products.map(product => {
      const obj = product.toObject();
      if (obj.photo) {
        const fileName = obj.photo.split('/').pop();
        obj.photoUrl = `${BASE_URL}/uploads/${fileName}`;
      } else {
        obj.photoUrl = null;
      }
      return obj;
    });

    res.json(updatedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});
module.exports = router;
