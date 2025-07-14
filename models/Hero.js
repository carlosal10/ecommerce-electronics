import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  videoUrl: { type: String, required: true },
  buttonText: String,
  buttonLink: String,
}, {
  timestamps: true
});

export default mongoose.model('Hero', heroSchema);
