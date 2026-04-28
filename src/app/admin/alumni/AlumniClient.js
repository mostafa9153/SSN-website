'use client';
import { useState } from 'react';
import { addAlumni, deleteAlumni } from '@/lib/actions';
import FileUpload from '@/components/FileUpload';

export default function AlumniClient({ initialData }) {
  const [alumni, setAlumni] = useState(initialData || []);
  const [formData, setFormData] = useState({ name: '', achievement: '', year: '', photo_url: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addAlumni(formData);
      window.location.reload();
    } catch (error) {
      alert('Error adding alumni');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await deleteAlumni(id);
      setAlumni(alumni.filter(a => a.id !== id));
    } catch (error) {
      alert('Error deleting alumni');
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', color: '#2d3436' }}>Manage Alumni</h1>

      {/* Add Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add New Alumni</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <FileUpload 
            bucket="photos" 
            accept="image/*" 
            label="Upload photo (Optional)" 
            onUploadSuccess={(url) => setFormData({...formData, photo_url: url})} 
          />
          {formData.photo_url && (
            <div style={{ marginTop: '0.5rem', color: '#56ab2f', fontSize: '0.9rem' }}>✓ Photo uploaded successfully</div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input type="text" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="text" placeholder="Achievement (e.g. MBBS Student)" required value={formData.achievement} onChange={e => setFormData({...formData, achievement: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="text" placeholder="Batch/Year (e.g. 2018 Batch)" required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          
          <button type="submit" disabled={loading} style={{ padding: '0.75rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'Adding...' : 'Add Alumni'}
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <th style={{ padding: '1rem' }}>Photo</th>
              <th style={{ padding: '1rem' }}>Name</th>
              <th style={{ padding: '1rem' }}>Achievement & Year</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem' }}>
                  {item.photo_url ? (
                    <img src={item.photo_url} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎓</div>
                  )}
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{item.name}</td>
                <td style={{ padding: '1rem', color: '#666' }}>{item.achievement}<br/><small>{item.year}</small></td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(item.id)} style={{ padding: '0.4rem 0.8rem', background: '#ffe3e3', color: '#fa5252', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
            {alumni.length === 0 && (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#868e96' }}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
