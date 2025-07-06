const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

export default mongoose.model('Category', categorySchema);
