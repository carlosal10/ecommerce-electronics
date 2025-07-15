// routes/products.js
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
    const {
      name,
      price,
      stock,
      inStock,
      features,
      description,
      mainCategory,
      subcategory,
      brand,
      colors,
      sizes,
      photoUrls,
      isPopular, // ✅ included
    } = req.body;

    // Input Validation
    if (
      !name?.trim() || !price || !stock || !features?.trim() ||
      !description?.trim() || !mainCategory?.trim() || !subcategory?.trim() ||
      !brand?.trim() || !photoUrls || !Array.isArray(photoUrls) || photoUrls.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const product = new Product({
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      inStock: Boolean(inStock),
      features: features.trim(),
      description: description.trim(),
      mainCategory: mainCategory.trim(),
      subcategory: subcategory.trim(),
      brand: brand.trim(),
      colors: colors || [],
      sizes: sizes || [],
      photoUrls: photoUrls.map(url => url.trim()),
      isPopular: Boolean(isPopular), // ✅ now saved
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// ✅ READ PRODUCTS WITH FILTERS
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, popular, limit } = req.query;
    const filter = {};

    if (category) filter.mainCategory = category;
    if (subcategory) filter.subcategory = subcategory;
    if (popular === 'true') filter.isPopular = true;

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit) || 20);

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
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
    const {
      name,
      price,
      stock,
      inStock,
      features,
      description,
      mainCategory,
      subcategory,
      brand,
      colors,
      sizes,
      photoUrls,
      isPopular // ✅ make sure it's handled in updates too
    } = req.body;

    if (
      !name?.trim() || !price || !stock || !features?.trim() ||
      !description?.trim() || !mainCategory?.trim() || !subcategory?.trim() ||
      !brand?.trim() || !photoUrls || !Array.isArray(photoUrls) || photoUrls.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price: Number(price),
        stock: Number(stock),
        inStock: Boolean(inStock),
        features: features.trim(),
        description: description.trim(),
        mainCategory: mainCategory.trim(),
        subcategory: subcategory.trim(),
        brand: brand.trim(),
        colors: colors || [],
        sizes: sizes || [],
        photoUrls: photoUrls.map(url => url.trim()),
        isPopular: Boolean(isPopular), // ✅ update support
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
