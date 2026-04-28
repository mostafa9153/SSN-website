'use client';
import { useState } from 'react';
import { updateClass } from '@/lib/actions';
import FileUpload from '@/components/FileUpload';

export default function ClassesClient({ initialData }) {
  const [classes, setClasses] = useState(initialData || []);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ syllabus_url: '', routine_url: '', exam_info: '' });

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
      <h1 style={{ marginBottom: '1.5rem', color: '#2d3436' }}>Classes & Routines</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Update Syllabus, Routine, and Exam Info for each class.</p>

      {editingId && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #56ab2f', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2b8a3e' }}>
            Updating {classes.find(c => c.id === editingId)?.class_name || classes.find(c => c.id === editingId)?.name_bn} Files
          </h3>
          
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>Syllabus (PDF/Image)</label>
                <FileUpload bucket="documents" accept="image/*,.pdf" onUploadSuccess={(url) => setFormData({...formData, syllabus_url: url})} />
                {formData.syllabus_url && <div style={{ fontSize: '0.8rem', color: '#56ab2f', marginTop: '0.25rem' }}>✓ Syllabus uploaded</div>}
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>Routine (PDF/Image)</label>
                <FileUpload bucket="documents" accept="image/*,.pdf" onUploadSuccess={(url) => setFormData({...formData, routine_url: url})} />
                {formData.routine_url && <div style={{ fontSize: '0.8rem', color: '#56ab2f', marginTop: '0.25rem' }}>✓ Routine uploaded</div>}
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>Exam Information (Text)</label>
                <textarea 
                  value={formData.exam_info} 
                  onChange={e => setFormData({...formData, exam_info: e.target.value})} 
                  placeholder="Enter exam dates, subjects, or other details..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da', minHeight: '100px', fontFamily: 'inherit' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={loading} style={{ padding: '0.75rem 2rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? 'Updating...' : 'Save Files'}
              </button>
              <button type="button" onClick={() => setEditingId(null)} style={{ padding: '0.75rem 2rem', background: '#f1f3f5', color: '#495057', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {classes.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map(cls => (
          <div key={cls.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ color: '#2b8a3e', marginBottom: '1rem' }}>{cls.name_bn}</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#868e96' }}>Syllabus:</span>
                <span style={{ color: cls.syllabus_url ? '#56ab2f' : '#fa5252', fontWeight: '600' }}>{cls.syllabus_url ? 'Available' : 'Missing'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#868e96' }}>Routine:</span>
                <span style={{ color: cls.routine_url ? '#56ab2f' : '#fa5252', fontWeight: '600' }}>{cls.routine_url ? 'Available' : 'Missing'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#868e96' }}>Exam Info:</span>
                <span style={{ color: cls.exam_info ? '#56ab2f' : '#fa5252', fontWeight: '600' }}>{cls.exam_info ? 'Available' : 'Missing'}</span>
              </div>
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
