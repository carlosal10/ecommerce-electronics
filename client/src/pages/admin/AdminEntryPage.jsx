// src/pages/admin/AdminEntryPage.jsx
import React, { useState } from 'react';
import './AdminEntryPage.css';

import AddProductForm from '../../components/forms/AddProductForm';
import AddCategoryForm from '../../components/forms/AddCategoryForm';
import AddBannerForm from '../../components/forms/AddBannerForm';

const AdminEntryPage = () => {
  const [activeForm, setActiveForm] = useState('product');

  return (
    <div className="admin-entry-page">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => setActiveForm('product')}>Add Product</li>
          <li onClick={() => setActiveForm('category')}>Add Category</li>
          <li onClick={() => setActiveForm('banner')}>Add Hero Banner</li>
        </ul>
      </aside>

      <main className="admin-main">
        {activeForm === 'product' && <AddProductForm />}
        {activeForm === 'category' && <AddCategoryForm />}
        {activeForm === 'banner' && <AddBannerForm />}
      </main>
    </div>
  );
};

export default AdminEntryPage;
