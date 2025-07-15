// src/pages/admin/AdminEntryPage.jsx
import React, { useState } from 'react';
import {
  FiShoppingCart,
  FiFolderPlus,
  FiImage,
  FiTag,
} from 'react-icons/fi';

import AddProductForm from '../components/forms/AddProductForm';
import AddCategoryForm from '../components/forms/AddCategoryForm';
import AddBannerForm from '../components/forms/AddBannerForm';
import AddBrandForm from '../components/forms/AddBrandForm';

import './AdminEntryPage.css';

const AdminEntryPage = () => {
  const [activeForm, setActiveForm] = useState('product');

  const navItems = [
    { key: 'product', label: 'Add Product', icon: <FiShoppingCart /> },
    { key: 'category', label: 'Add Category', icon: <FiFolderPlus /> },
    { key: 'banner', label: 'Add Hero Banner', icon: <FiImage /> },
    { key: 'brand', label: 'Add Brand', icon: <FiTag /> },
  ];

  const renderForm = () => {
  try {
    switch (activeForm) {
      case 'product':
        return <AddProductForm />;
      case 'category':
        return <AddCategoryForm />;
      case 'banner':
        return <AddBannerForm />;
      case 'brand':
        return <AddBrandForm />;
      default:
        return null;
    }
  } catch (err) {
    console.error('Render error:', err);
    return <p style={{ color: 'red' }}>Something went wrong in the form.</p>;
  }
};


  return (
    <div className="admin-entry-container">
      <nav className="admin-entry-nav">
        {navItems.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setActiveForm(key)}
            className={`nav-btn ${activeForm === key ? 'active' : ''}`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="admin-entry-content">{renderForm()}</div>
    </div>
  );
};

export default AdminEntryPage;
