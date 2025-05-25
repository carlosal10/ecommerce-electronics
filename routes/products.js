// routes/products.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

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
      photo: req.file?.path || null,
    });

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

module.exports = router;
