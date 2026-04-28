'use client';
import { useState } from 'react';
import { addNotice, deleteNotice } from '@/lib/actions';
import FileUpload from '@/components/FileUpload';

export default function NoticesClient({ initialData }) {
  const [notices, setNotices] = useState(initialData || []);
  const [title, setTitle] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    try {
      await addNotice({ title: title, is_active: true, file_url: fileUrl });
      window.location.reload();
    } catch (error) {
      alert('Error adding notice');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    try {
      await deleteNotice(id);
      setNotices(notices.filter(n => n.id !== id));
    } catch (error) {
      alert('Error deleting notice');
    }
  };

  return (
    <div>
      {/* Add Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>নতুন নোটিশ যোগ করুন</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <FileUpload 
            bucket="documents" 
            accept="image/*,.pdf" 
            label="নোটিশের ফাইল (ছবি/PDF) আপলোড করুন (ঐচ্ছিক)" 
            onUploadSuccess={(url) => setFileUrl(url)} 
          />
          {fileUrl && (
            <div style={{ marginTop: '0.5rem', color: '#56ab2f', fontSize: '0.9rem' }}>✓ ফাইল আপলোড সফল হয়েছে</div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="নোটিশের বিবরণ লিখুন..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '0.75rem 1.5rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'যোগ হচ্ছে...' : 'যোগ করুন'}
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <th style={{ padding: '1rem' }}>নোটিশ</th>
              <th style={{ padding: '1rem', width: '150px', textAlign: 'right' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {notices.map(notice => (
              <tr key={notice.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem' }}>{notice.title || notice.text}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleDelete(notice.id)}
                    style={{ padding: '0.4rem 0.8rem', background: '#ffe3e3', color: '#fa5252', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr>
                <td colSpan="2" style={{ padding: '2rem', textAlign: 'center', color: '#868e96' }}>কোনো নোটিশ নেই</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
