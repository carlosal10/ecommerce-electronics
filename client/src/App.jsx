// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer';

import Login from './pages/Login';

import AdminDashboard from './pages/AdminDashboard';
import AdminOverview from './pages/AdminOverview';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminEntryPage from './pages/AdminEntryPage';

const App = () => (
  <>
    <Routes>
      {/* Default route */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes under Dashboard */}
      <Route path="/" element={<AdminDashboard />}>
        <Route index element={<AdminOverview />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="data-entry" element={<AdminEntryPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>

    <Footer />
  </>
);

export default App;
