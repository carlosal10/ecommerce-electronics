import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './FormStyles.css';

const AddBannerForm = () => {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    videoUrl: '',
    posterUrl: '',
    buttonText: '',
    buttonLink: ''
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePosterUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

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
        setForm(prev => ({ ...prev, posterUrl: data.secure_url }));
        toast.success('Poster uploaded!');
      }
    } catch {
      toast.error('Poster upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = { ...form };

    try {
      const res = await fetch('https://ecommerce-electronics-0j4e.onrender.com/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Something went wrong');
      toast.success('Banner added!');
      setForm({
        title: '',
        subtitle: '',
        description: '',
        videoUrl: '',
        posterUrl: '',
        buttonText: '',
        buttonLink: ''
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <h3>Add Hero Banner</h3>

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="subtitle" placeholder="Subtitle" value={form.subtitle} onChange={handleChange} />
      <textarea name="description" placeholder="Description" rows={3} value={form.description} onChange={handleChange} />
      <input name="videoUrl" placeholder="Video URL" value={form.videoUrl} onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handlePosterUpload} />
      {form.posterUrl && <img src={form.posterUrl} alt="Poster Preview" className="preview-img" />}
      <input name="buttonText" placeholder="Button Text" value={form.buttonText} onChange={handleChange} />
      <input name="buttonLink" placeholder="Button Link" value={form.buttonLink} onChange={handleChange} />

      <button type="submit" className="btn-red" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Submit Banner'}
      </button>
    </form>
  );
};

export default AddBannerForm;
