'use client';
import { useState } from 'react';
import { updateClass } from '@/lib/actions';
import FileUpload from '@/components/FileUpload';

export default function ClassesClient({ initialData }) {
  const [classes, setClasses] = useState(initialData || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ syllabus_url: '', routine_url: '', exam_info: '' });
  const [loading, setLoading] = useState(false);

  const handleEditClick = (cls) => {
    setEditingId(cls.id);
    setFormData({
      syllabus_url: cls.syllabus_url || '',
      routine_url: cls.routine_url || '',
      exam_info: cls.exam_info || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateClass(editingId, formData);
      setEditingId(null);
      window.location.reload();
    } catch (error) {
      alert('Error updating class files');
      setLoading(false);
    }
  };

  return (
    <div>
      <p style={{ color: '#666', marginBottom: '2rem' }}>নিচের ক্লাসগুলোর জন্য প্রয়োজনীয় PDF ফাইলগুলো আপলোড বা আপডেট করুন।</p>

      {editingId && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #56ab2f', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2b8a3e' }}>
            {classes.find(c => c.id === editingId)?.name_bn} - এর ফাইল আপডেট করুন
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <FileUpload bucket="documents" accept=".pdf" label="সিলেবাস PDF" onUploadSuccess={(url) => setFormData({...formData, syllabus_url: url})} />
              {formData.syllabus_url && <div style={{ color: '#56ab2f', fontSize: '0.8rem', marginTop: '-0.5rem' }}>✓ ফাইল রেডি</div>}
            </div>
            <div>
              <FileUpload bucket="documents" accept=".pdf" label="রুটিন PDF" onUploadSuccess={(url) => setFormData({...formData, routine_url: url})} />
              {formData.routine_url && <div style={{ color: '#56ab2f', fontSize: '0.8rem', marginTop: '-0.5rem' }}>✓ ফাইল রেডি</div>}
            </div>
            <div>
              <FileUpload bucket="documents" accept=".pdf" label="পরীক্ষার বিবরণ PDF" onUploadSuccess={(url) => setFormData({...formData, exam_info: url})} />
              {formData.exam_info && <div style={{ color: '#56ab2f', fontSize: '0.8rem', marginTop: '-0.5rem' }}>✓ ফাইল রেডি</div>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleUpdate} disabled={loading} style={{ padding: '0.75rem 2rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {loading ? 'আপডেট হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
            </button>
            <button onClick={() => setEditingId(null)} style={{ padding: '0.75rem 2rem', background: '#f1f3f5', color: '#495057', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              বাতিল
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {classes.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map(cls => (
          <div key={cls.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#2b8a3e' }}>{cls.name_bn}</h4>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
              <p>📄 সিলেবাস: {cls.syllabus_url ? '✅ আছে' : '❌ নেই'}</p>
              <p>📅 রুটিন: {cls.routine_url ? '✅ আছে' : '❌ নেই'}</p>
              <p>📝 পরীক্ষা: {cls.exam_info ? '✅ আছে' : '❌ নেই'}</p>
            </div>
            <button 
              onClick={() => handleEditClick(cls)}
              style={{ width: '100%', padding: '0.6rem', background: 'rgba(86, 171, 47, 0.1)', color: '#56ab2f', border: '1px solid #56ab2f', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Edit Files
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
