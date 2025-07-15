import React, { useState } from 'react';
import './AdminEntryPage.css';
import ProductForm from '../components/admin/forms/ProductForm';
import CategoryForm from '../components/admin/forms/CategoryForm';
import BannerForm from '../components/admin/forms/BannerForm';
// Add other form imports here...

const AdminEntryPage = () => {
  const [activeForm, setActiveForm] = useState('product');

  const renderForm = () => {
    switch (activeForm) {
      case 'product':
        return <ProductForm />;
      case 'category':
        return <CategoryForm />;
      case 'banner':
        return <BannerForm />;
      // Add other cases...
      default:
        return <div>Select a form from the left menu</div>;
    }
  };

  return (
    <section className="admin-entry-page">
      <aside className="admin-sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li onClick={() => setActiveForm('product')}>➕ Add Product</li>
          <li onClick={() => setActiveForm('category')}>🗂️ Add Category</li>
          <li onClick={() => setActiveForm('banner')}>🎬 Add Banner</li>
          {/* Add other options */}
        </ul>
      </aside>

      <main className="admin-main">
        <h2 className="form-title">{activeForm.replace(/^\w/, c => c.toUpperCase())} Form</h2>
        <div className="form-container">
          {renderForm()}
        </div>
      </main>
    </section>
  );
};

export default AdminEntryPage;
