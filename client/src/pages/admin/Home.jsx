// src/pages/admin/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional styling

const Home = () => {
  return (
    <div className="admin-home">
      <h1>Welcome to Electromart Admin</h1>
      <p>Use the sidebar to manage your store.</p>

      <div className="home-links">
        <Link to="/admin/overview">📊 Overview</Link>
        <Link to="/admin/orders">📦 Orders</Link>
        <Link to="/admin/products">🛒 Products</Link>
        <Link to="/admin/users">👥 Users</Link>
        <Link to="/admin/data-entry">📝 Data Entry</Link>
      </div>
    </div>
  );
};

export default Home;
