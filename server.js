import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import mpesaRoutes from './routes/mpesa.js';
import categoryRoutes from './routes/Category.js';
import productRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const allowedOrigins = ['https://electromart-2vwj.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true // if you're using cookies/session
}));

app.use(express.json());

app.use('/api/products', productRoutes); 
app.use('/api/categories', categoryRoutes);
app.use("/uploads", express.static("uploads")); // Serve static images
app.use("/api/orders", ordersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', mpesaRoutes);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React
app.use(express.static(path.join(__dirname, 'electromart/build')));

// Handle all other routes → React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'electromart/build', 'index.html'));
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
