// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiBarChart2,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiEdit3,
} from 'react-icons/fi';
import './Home.css';

const Home = () => {
  return (
    <div className="admin-home">
      <h1>Welcome to Electromart Admin</h1>
      <p>Use the links below to manage your store.</p>

      <div className="home-links">
        <Link to="/admin/overview"><FiBarChart2 /> Overview</Link>
        <Link to="/admin/orders"><FiPackage /> Orders</Link>
        <Link to="/admin/products"><FiShoppingCart /> Products</Link>
        <Link to="/admin/users"><FiUsers /> Users</Link>
        <Link to="/admin/data-entry"><FiEdit3 /> Data Entry</Link>
      </div>
    </div>
  );
};

export default Home;
