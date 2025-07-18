import express from 'express';
import Hero from '../models/Banner.js';
import Product from '../models/Product.js';

const router = express.Router();

const getShowcaseData = async (section, usedProductIds = []) => {
  const bannerType = section === 'left' ? 'left' : 'right';

  const banners = await Hero.find({ type: bannerType }).sort({ createdAt: -1 }).limit(3);

  const query = {
    _id: { $nin: usedProductIds },
    $or: [
      { seasonalOffer: true },
      { bestChoice: true }
    ]
  };

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .limit(2);

  const responseProducts = products.map((p, idx) => ({
    ...p.toObject(),
    position: idx === 0 ? 'top' : 'bottom'
  }));

  return { banners, products: responseProducts };
};

// Cache products used by left to avoid duplication on right
let usedProductIdsLeft = [];

router.get('/left', async (req, res) => {
  try {
    const data = await getShowcaseData('left');
    usedProductIdsLeft = data.products.map(p => p._id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch showcase left' });
  }
});

router.get('/right', async (req, res) => {
  try {
    const data = await getShowcaseData('right', usedProductIdsLeft);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch showcase right' });
  }
});

export default router;
