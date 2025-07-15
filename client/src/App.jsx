// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';

import Login from './pages/Login';
import Home from './pages/admin/Home';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEntryPage from './pages/admin/AdminEntryPage';

const App = () => (
  <>
    <Routes>
      {/* Redirect root to admin dashboard home */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Home />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="data-entry" element={<AdminEntryPage />} />
      </Route>
    </Routes>

    <Footer />
  </>
);

export default App;
