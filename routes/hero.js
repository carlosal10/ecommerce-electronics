import express from 'express';
import Hero from '../models/hero.js'; // Your Mongoose model

const router = express.Router();

// ✅ Create new hero banner
router.post('/', async (req, res) => {
  try {
    const { title, subtitle, description, videoUrl, buttonText, buttonLink } = req.body;

    if (!title || !videoUrl) {
      return res.status(400).json({ error: 'Title and video URL are required' });
    }

    const banner = new Hero({ title, subtitle, description, videoUrl, buttonText, buttonLink });
    await banner.save();

    res.status(201).json({ message: 'Hero banner created', banner });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create hero banner' });
  }
});

// ✅ Get all hero banners (for slideshow)
router.get('/', async (req, res) => {
  try {
    const banners = await Hero.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero banners' });
  }
});

// ✅ Get single hero banner by ID
router.get('/:id', async (req, res) => {
  try {
    const banner = await Hero.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: 'Banner not found' });

    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving banner' });
  }
});

// ✅ Update a banner
router.put('/:id', async (req, res) => {
  try {
    const updated = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Banner not found' });

    res.json({ message: 'Hero banner updated', banner: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update banner' });
  }
});

// ✅ Delete a banner
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Hero.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Banner not found' });

    res.json({ message: 'Banner deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete banner' });
  }
});

export default router;
