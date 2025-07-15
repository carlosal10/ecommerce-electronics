import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>🛠 Admin Panel</h2>
        <nav>
          <ul>
  <li className={location.pathname === '/admin/overview' ? 'active' : ''}>
    <Link to="/admin/overview">📊 Overview</Link>
  </li>
  <li className={location.pathname === '/admin/orders' ? 'active' : ''}>
    <Link to="/admin/orders">📦 Orders</Link>
  </li>
  <li className={location.pathname === '/admin/products' ? 'active' : ''}>
    <Link to="/admin/products">🛒 Products</Link>
  </li>
  <li className={location.pathname === '/admin/users' ? 'active' : ''}>
    <Link to="/admin/users">👥 Users</Link>
  </li>
  <li className={location.pathname === '/admin/data-entry' ? 'active' : ''}>
    <Link to="/admin/data-entry">📝 Data Entry</Link>
  </li>
</ul>

        </nav>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
