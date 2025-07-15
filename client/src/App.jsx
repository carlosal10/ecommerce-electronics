// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminEntryPage from './pages/admin/AdminEntryPage';

import AdminProductList from './pages/AdminProductList';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';


const App = () => (
  <CartProvider>
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Dashboard with nested routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="data-entry" element={<AdminEntryPage />} />
          <Route index element={<AdminOverview />} />           {/* Default admin tab */}
          <Route path="overview" element={<AdminOverview />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
      <Footer />
    </>
  </CartProvider>
);

export default App;
