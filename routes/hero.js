import express from 'express';
import Hero from '../models/hero.js'; // ensure this matches your actual model file

const router = express.Router();

// ✅ Create a new hero (e.g. featured product/banner)
router.post('/', async (req, res) => {
  try {
    const { title, description, imageUrl, link } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({ error: 'Title and image are required' });
    }

    const hero = new Hero({ title, description, imageUrl, link });
    await hero.save();

    res.status(201).json({ message: 'Hero created', hero });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all heroes (or use this to get the latest one)
router.get('/', async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ createdAt: -1 }).limit(1); // or remove limit to get all
    res.json(heroes.length === 1 ? heroes[0] : heroes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero data' });
  }
});

// ✅ Optional: Update a hero
router.put('/:id', async (req, res) => {
  try {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hero) return res.status(404).json({ error: 'Hero not found' });
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Optional: Delete a hero
router.delete('/:id', async (req, res) => {
  try {
    const result = await Hero.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Hero not found' });
    res.json({ message: 'Hero deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
