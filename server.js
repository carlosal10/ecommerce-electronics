require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import categoryRoutes from './routes/Category;
import productRoutes from './routes/products';
import ordersRoutes from './routes/orders';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes); 
app.use('/api/categories', categoryRoutes);
app.use("/uploads", express.static("uploads")); // Serve static images
app.use("/api/orders", ordersRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
