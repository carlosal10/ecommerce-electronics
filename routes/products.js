// routes/products.js
const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/products - Create Product with Cloudinary URL
router.post("/", async (req, res) => {
  try {
    const { name, price, stock, features, description, category, photoUrl } = req.body;

    if (!name || !price || !stock || !features || !description || !category || !photoUrl) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product({
      name,
      price: Number(price),
      stock: Number(stock),
      features,
      description,
      category,
      photoUrl, // ✅ Save Cloudinary image URL directly
    });

    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // or your logic
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
