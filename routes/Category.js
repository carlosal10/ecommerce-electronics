import express from 'express';
import Category from '../models/categories.js';

const router = express.Router();

// ✅ Add a new main category with subcategories + brands
router.post('/', async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    if (!name?.trim() || !Array.isArray(subcategories)) {
      return res.status(400).json({ error: "Main category name and subcategories are required" });
    }

    const category = new Category({
      name: name.trim(),
      subcategories: subcategories.map(sub => ({
        name: sub.name.trim(),
        brands: Array.isArray(sub.brands) ? sub.brands.map(b => b.trim()) : []
      }))
    });

    await category.save();
    res.status(201).json({ message: 'Main category created', category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all categories (main categories + subcategories + brands)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// ✅ Add a subcategory to an existing main category
router.post('/:categoryId/subcategory', async (req, res) => {
  try {
    const { name, brands } = req.body;

    if (!name?.trim()) return res.status(400).json({ error: 'Subcategory name is required' });

    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ error: 'Main category not found' });

    category.subcategories.push({
      name: name.trim(),
      brands: Array.isArray(brands) ? brands.map(b => b.trim()) : []
    });

    await category.save();
    res.status(200).json({ message: 'Subcategory added', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add brand to an existing subcategory
router.post('/:categoryId/subcategory/:subName/brand', async (req, res) => {
  try {
    const { brand } = req.body;
    const { categoryId, subName } = req.params;

    if (!brand?.trim()) return res.status(400).json({ error: 'Brand name is required' });

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    const sub = category.subcategories.find(s => s.name === subName);
    if (!sub) return res.status(404).json({ error: 'Subcategory not found' });

    sub.brands.push(brand.trim());
    await category.save();

    res.status(200).json({ message: 'Brand added to subcategory', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, subcategory, brand, search, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category) filter.mainCategory = category;
    if (subcategory) filter.subcategory = subcategory;
    if (brand) filter.brand = brand;
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
