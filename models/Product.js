// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },

  mainCategory: { type: String, required: true },
  subcategory: { type: String, required: true },
  brand: { type: String, required: true },

  colors: [String],         // e.g., ["Red", "Black"]
  sizes: [String],          // e.g., ["S", "M", "L"]

  features: { type: String },
  description: { type: String },
  isPopular: {
  type: Boolean,
  default: false
},

  photoUrls: [String],      // array of Cloudinary URLs
}, { timestamps: true });



export default mongoose.model("Product", productSchema);
