'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function FileUpload({ bucket = 'photos', onUploadSuccess, accept = 'image/*', label = 'ফাইল আপলোড করুন' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      setError('');
      
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }
      
      onUploadSuccess(data.url);
    } catch (error) {
      setError('আপলোড ব্যর্থ হয়েছে: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={handleUpload}
        disabled={uploading}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          background: '#f8f9fa'
        }}
      />
      {uploading && <p style={{ color: '#56ab2f', fontSize: '0.85rem', marginTop: '0.5rem' }}>আপলোড হচ্ছে... অপেক্ষা করুন</p>}
      {error && <p style={{ color: 'red', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p>}
    </div>
  );
}
