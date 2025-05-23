const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

const router = express.Router();

// Ensure `uploads/` folder exists
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, price, stock, features, description } = req.body;
    if (!name || !price || !stock || !features || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      stock: Number(stock),
      features,
      description,
      photo: req.file?.path || null,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

module.exports = router;
