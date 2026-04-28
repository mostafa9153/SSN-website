'use client';
import { useState } from 'react';
import { addTeacher, deleteTeacher } from '@/lib/actions';
import FileUpload from '@/components/FileUpload';

export default function TeachersClient({ initialData }) {
  const [teachers, setTeachers] = useState(initialData || []);
  const [formData, setFormData] = useState({ name: '', designation: '', subject: '', photo_url: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTeacher(formData);
      window.location.reload();
    } catch (error) {
      alert('Error adding teacher');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    try {
      await deleteTeacher(id);
      setTeachers(teachers.filter(t => t.id !== id));
    } catch (error) {
      alert('Error deleting teacher');
    }
  };

  return (
    <div>
      {/* Add Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>নতুন শিক্ষক যোগ করুন</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <FileUpload 
            bucket="photos" 
            accept="image/*" 
            label="শিক্ষকের ছবি আপলোড করুন (ঐচ্ছিক)" 
            onUploadSuccess={(url) => setFormData({...formData, photo_url: url})} 
          />
          {formData.photo_url && (
            <div style={{ marginTop: '0.5rem', color: '#56ab2f', fontSize: '0.9rem' }}>✓ ছবি আপলোড সফল হয়েছে</div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input type="text" placeholder="নাম" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="text" placeholder="পদবী (যেমন: সহ-শিক্ষক)" required value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="text" placeholder="বিষয়" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          
          <button type="submit" disabled={loading} style={{ padding: '0.75rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'যোগ হচ্ছে...' : 'যোগ করুন'}
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <th style={{ padding: '1rem' }}>ছবি</th>
              <th style={{ padding: '1rem' }}>নাম</th>
              <th style={{ padding: '1rem' }}>পদবী ও বিষয়</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem' }}>
                  {teacher.photo_url ? (
                    <img src={teacher.photo_url} alt={teacher.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👨‍🏫</div>
                  )}
                </td>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{teacher.name}</td>
                <td style={{ padding: '1rem', color: '#666' }}>{teacher.designation}<br/><small>{teacher.subject}</small></td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(teacher.id)} style={{ padding: '0.4rem 0.8rem', background: '#ffe3e3', color: '#fa5252', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>মুছুন</button>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#868e96' }}>কোনো শিক্ষক নেই</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
