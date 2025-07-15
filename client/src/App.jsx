// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';

import Login from './pages/Login';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEntryPage from './pages/admin/AdminEntryPage';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} /> {/* 👈 Fixes blank page */}

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminOverview />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="data-entry" element={<AdminEntryPage />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    <Footer />
  </>
);

export default App;
