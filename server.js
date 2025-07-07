import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import categoryRoutes from './routes/Category.js';
import productRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors({
  origin: '*', // OR better: ['https://electromart-2vwj.onrender.com']
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/products', productRoutes); 
app.use('/api/categories', categoryRoutes);
app.use("/uploads", express.static("uploads")); // Serve static images
app.use("/api/orders", ordersRoutes);
app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
