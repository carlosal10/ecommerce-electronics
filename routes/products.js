const express = require("express");
const Product = require("../models/Product");
const { v2: cloudinary } = require("cloudinary");

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/products - Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, stock, features, description, category, photoUrl } = req.body;

    // ✅ Validate all required fields
    if (
      !name?.trim() ||
      !price ||
      !stock ||
      !features?.trim() ||
      !description?.trim() ||
      !category?.trim() ||
      !photoUrl?.trim()
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const product = new Product({
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      features: features.trim(),
      description: description.trim(),
      category: category.trim(),
      photoUrl: photoUrl.trim(),
    });

    await product.save();
    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// GET /api/products - Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
