'use client';
import { useState } from 'react';
import { addGalleryItem, deleteGalleryItem } from '@/lib/actions';
import { GALLERY_CATEGORIES } from '@/lib/constants';
import FileUpload from '@/components/FileUpload';

export default function GalleryClient({ initialData }) {
  const [gallery, setGallery] = useState(initialData || []);
  const [formData, setFormData] = useState({ image_url: '', category: GALLERY_CATEGORIES[1].id, caption: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_url) {
      alert('Please upload a photo first');
      return;
    }
    setLoading(true);
    try {
      await addGalleryItem(formData);
      window.location.reload();
    } catch (error) {
      alert('Error adding photo');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    try {
      await deleteGalleryItem(id);
      setGallery(gallery.filter(item => item.id !== id));
    } catch (error) {
      alert('Error deleting photo');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', color: '#2d3436' }}>Manage Gallery</h1>

      {/* Add Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Photo</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <FileUpload 
            bucket="photos" 
            accept="image/*" 
            label="Upload photo (Required)" 
            onUploadSuccess={(url) => setFormData({...formData, image_url: url})} 
          />
          {formData.image_url && (
            <div style={{ marginTop: '0.5rem', color: '#56ab2f', fontSize: '0.9rem' }}>✓ Photo uploaded successfully</div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da', background: 'white' }}>
            {GALLERY_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          
          <input type="text" placeholder="Caption (Optional)" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          
          <button type="submit" disabled={loading} style={{ gridColumn: '1 / -1', padding: '0.75rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'Adding...' : 'Add Photo'}
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {gallery.map(item => (
          <div key={item.id} style={{ background: 'white', borderRadius: '8px', border: '1px solid #e9ecef', overflow: 'hidden', position: 'relative' }}>
            <img src={item.image_url} alt={item.caption} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', background: '#e9ecef', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                {GALLERY_CATEGORIES.find(c => c.id === item.category)?.label || item.category}
              </span>
              {item.caption && <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: '#495057' }}>{item.caption}</p>}
            </div>
            <button 
              onClick={() => handleDelete(item.id)} 
              title="Delete Photo"
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(250, 82, 82, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >✕</button>
          </div>
        ))}
        {gallery.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#868e96', background: 'white', borderRadius: '8px', border: '1px solid #e9ecef' }}>
            No photos found in gallery.
          </div>
        )}
      </div>
    </div>
  );
}
