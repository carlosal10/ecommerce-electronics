import React, { useState } from 'react';
import ProductForm from '../../components/admin/forms/ProductForm';
import CategoryForm from '../../components/admin/forms/CategoryForm';
import BrandForm from '../../components/admin/forms/BrandForm';
import BannerForm from '../../components/admin/forms/BannerForm';

import './AdminEntryPage.css';

const AdminEntryPage = () => {
  const [activeForm, setActiveForm] = useState('product');

  return (
    <div className="admin-entry-page">
      <aside className="admin-sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li className={activeForm === 'product' ? 'active' : ''} onClick={() => setActiveForm('product')}>+ Add Product</li>
          <li className={activeForm === 'category' ? 'active' : ''} onClick={() => setActiveForm('category')}>+ Add Category</li>
          <li className={activeForm === 'brand' ? 'active' : ''} onClick={() => setActiveForm('brand')}>+ Add Brand</li>
          <li className={activeForm === 'banner' ? 'active' : ''} onClick={() => setActiveForm('banner')}>+ Add Banner</li>
        </ul>
      </aside>

      <main className="admin-main-form">
        {activeForm === 'product' && <ProductForm />}
        {activeForm === 'category' && <CategoryForm />}
        {activeForm === 'brand' && <BrandForm />}
        {activeForm === 'banner' && <BannerForm />}
      </main>
    </div>
  );
};

export default AdminEntryPage;
