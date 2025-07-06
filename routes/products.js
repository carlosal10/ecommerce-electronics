import express from 'express';
import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ CREATE PRODUCT
router.post('/', async (req, res) => {
  try {
    const { name, price, stock, features, description, category, photoUrl } = req.body;

    if (
      !name?.trim() || !price || !stock || !features?.trim() ||
      !description?.trim() || !category?.trim() || !photoUrl?.trim()
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
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// ✅ READ ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE PRODUCT
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ UPDATE PRODUCT
router.put('/:id', async (req, res) => {
  try {
    const { name, price, stock, features, description, category, photoUrl } = req.body;

    if (
      !name?.trim() || !price || !stock || !features?.trim() ||
      !description?.trim() || !category?.trim() || !photoUrl?.trim()
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
        features: features.trim(),
        description: description.trim(),
        category: category.trim(),
        photoUrl: photoUrl.trim(),
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
