const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  features: String,
  description: String,
  category: String,
  photoUrl: String
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
