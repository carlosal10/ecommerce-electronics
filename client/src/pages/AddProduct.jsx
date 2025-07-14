import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './add-product.css';

const AddProduct = () => {
  const navigate = useNavigate();

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    stock: '',
    features: '',
    description: '',
    inStock: true,
    colors: '',
    sizes: '',
    photoUrls: []
  });

  const [categories, setCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [brand, setBrand] = useState('');
  const [loading, setLoading] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  // Fetch full category tree
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://ecommerce-electronics-0j4e.onrender.com/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        toast.error('Failed to load categories');
      }
    }
    fetchCategories();
  }, []);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleStock = (e) => {
    setProductForm((prev) => ({ ...prev, inStock: e.target.value === 'true' }));
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploads = [];
    const previews = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ecom_public_upload');

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dderoi7rp/image/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();
        if (data.secure_url) {
          uploads.push(data.secure_url);
          previews.push(data.secure_url);
        }
      } catch {
        toast.error('Failed to upload one or more images');
      }
    }

    setProductForm((prev) => ({ ...prev, photoUrls: uploads }));
    setPhotoPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mainCategory || !subcategory || !brand) {
      return toast.error('Please select full category path');
    }

    const payload = {
      ...productForm,
      mainCategory,
      subcategory,
      brand,
      colors: productForm.colors.split(',').map(c => c.trim()),
      sizes: productForm.sizes.split(',').map(s => s.trim())
    };

    setLoading(true);
    try {
      const res = await fetch('https://ecommerce-electronics-0j4e.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Unknown error');

      toast.success('Product added!');
      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSubcategories = () => {
    const cat = categories.find(c => c.name === mainCategory);
    return cat?.subcategories || [];
  };

  const getBrands = () => {
    const sub = getSubcategories().find(s => s.name === subcategory);
    return sub?.brands || [];
  };

  return (
    <section className="form-section">
      <ToastContainer />
      <h2>Add New Product</h2>

      <form className="product-form" onSubmit={handleSubmit}>
        {/* Name & Price */}
        <div className="form-group">
          <label>Item Name</label>
          <input type="text" name="name" value={productForm.name} onChange={handleProductChange} required />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={productForm.price} onChange={handleProductChange} required />
        </div>

        <div className="form-group">
          <label>Stock Quantity</label>
          <input type="number" name="stock" value={productForm.stock} onChange={handleProductChange} required />
        </div>

        <div className="form-group">
          <label>In Stock?</label>
          <select value={productForm.inStock} onChange={handleToggleStock}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Variants */}
        <div className="form-group">
          <label>Color Variants (comma separated)</label>
          <input type="text" name="colors" value={productForm.colors} onChange={handleProductChange} />
        </div>

        <div className="form-group">
          <label>Size Variants (comma separated)</label>
          <input type="text" name="sizes" value={productForm.sizes} onChange={handleProductChange} />
        </div>

        {/* Features & Description */}
        <div className="form-group">
          <label>Specifications</label>
          <textarea name="features" rows="2" value={productForm.features} onChange={handleProductChange} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" rows="3" value={productForm.description} onChange={handleProductChange} />
        </div>

        {/* Category Select */}
        <div className="form-group">
          <label>Main Category</label>
          <select value={mainCategory} onChange={(e) => {
            setMainCategory(e.target.value);
            setSubcategory('');
            setBrand('');
          }}>
            <option value="">-- Select --</option>
            {categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Subcategory</label>
          <select value={subcategory} onChange={(e) => {
            setSubcategory(e.target.value);
            setBrand('');
          }} disabled={!mainCategory}>
            <option value="">-- Select --</option>
            {getSubcategories().map(sub => <option key={sub.name} value={sub.name}>{sub.name}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select value={brand} onChange={(e) => setBrand(e.target.value)} disabled={!subcategory}>
            <option value="">-- Select --</option>
            {getBrands().map(br => <option key={br} value={br}>{br}</option>)}
          </select>
        </div>

        {/* Images */}
        <div className="form-group">
          <label>Upload Product Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          <div className="preview-grid">
            {photoPreviews.map((src, i) => (
              <img key={i} src={src} alt="preview" style={{ width: 100, margin: '0.5rem', borderRadius: 6 }} />
            ))}
          </div>
        </div>

        <button type="submit" className="btn-red" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </section>
  );
};

export default AddProduct;
