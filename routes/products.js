const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

// routes/products.js

const BASE_URL = "https://ecommerce-electronics-0j4e.onrender.com";

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    const formattedProducts = products.map(product => {
      const p = product.toObject();
      if (p.photo) {
        const filename = p.photo.split('/').pop(); // Get just the filename
        p.photoUrl = `${BASE_URL}/uploads/${filename}`;
      } else {
        p.photoUrl = null; // Fallback if no photo
      }
      return p;
    });

    res.json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    const baseUrl = `${req.protocol}://${req.get("host")}`; // e.g., https://ecommerce-electronics-0j4e.onrender.com

    const formattedProducts = products.map((product) => {
      const p = product.toObject();
      p.photoUrl = p.photo ? `${baseUrl}/uploads/${p.photo}` : null;
      return p;
    });

    res.json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
