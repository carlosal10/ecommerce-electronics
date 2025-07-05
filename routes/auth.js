const express = require('express');
const router = express.Router();
const User = require('../models/User'); // your schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ error: "Invalid token." });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Authentication failed." });
  }
};


router.post('/', async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) 
    return res.status(400).json({ error: 'All fields are required' });

  const exists = await User.findOne({ $or: [{ email }, { phone }] });
  if (exists) return res.status(409).json({ error: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, phone, password: hash });
  await user.save();
  res.json({ message: 'Signup successful' });
});

router.post('/', async (req, res) => {
  const { emailOrPhone, password } = req.body;
  const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

module.exports = router;
