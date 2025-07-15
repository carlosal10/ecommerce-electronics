import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

import Login from './pages/Login';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOverview from './pages/admin/AdminOverview';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEntryPage from './pages/admin/AdminEntryPage'; // Unified data entry

const App = () => (
  <>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<AdminOverview />} />
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
