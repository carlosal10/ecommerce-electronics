import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  imageUrl: { type: String, required: true }, // ⬅️ Added to store the image URL
  buttonText: String,
  buttonLink: String,
}, {
  timestamps: true
});

export default mongoose.model('Hero', heroSchema);
