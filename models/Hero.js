import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  link: String
}, { timestamps: true });

export default mongoose.model('Hero', heroSchema);
