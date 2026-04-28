'use client';
import { useState } from 'react';
import { addClass, deleteClass } from '@/lib/actions';
import FileUpload from '@/components/FileUpload';

export default function ClassesClient({ initialData }) {
  const [classes, setClasses] = useState(initialData || []);
  const [formData, setFormData] = useState({ name: '', name_bn: '', syllabus_url: '', routine_url: '', exam_info: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addClass(formData);
      window.location.reload();
    } catch (error) {
      alert('Error adding class');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    try {
      await deleteClass(id);
      setClasses(classes.filter(c => c.id !== id));
    } catch (error) {
      alert('Error deleting class');
    }
  };

  return (
    <div>
      {/* Add Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>নতুন ক্লাস যোগ করুন</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
          <div>
            <FileUpload bucket="documents" accept=".pdf" label="সিলেবাস PDF" onUploadSuccess={(url) => setFormData({...formData, syllabus_url: url})} />
            {formData.syllabus_url && <div style={{ color: '#56ab2f', fontSize: '0.8rem' }}>✓ আপলোড সফল</div>}
          </div>
          <div>
            <FileUpload bucket="documents" accept=".pdf" label="রুটিন PDF" onUploadSuccess={(url) => setFormData({...formData, routine_url: url})} />
            {formData.routine_url && <div style={{ color: '#56ab2f', fontSize: '0.8rem' }}>✓ আপলোড সফল</div>}
          </div>
          <div>
            <FileUpload bucket="documents" accept=".pdf" label="পরীক্ষার বিবরণ PDF" onUploadSuccess={(url) => setFormData({...formData, exam_info: url})} />
            {formData.exam_info && <div style={{ color: '#56ab2f', fontSize: '0.8rem' }}>✓ আপলোড সফল</div>}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input type="text" placeholder="ক্লাসের নাম (English, e.g. Class 1)" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="text" placeholder="ক্লাসের নাম (বাংলা, e.g. প্রথম শ্রেণী)" required value={formData.name_bn} onChange={e => setFormData({...formData, name_bn: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          
          <button type="submit" disabled={loading} style={{ gridColumn: '1 / -1', padding: '0.75rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'যোগ হচ্ছে...' : 'যোগ করুন'}
          </button>
        </form>
      </div>

      {/* List */}
      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <th style={{ padding: '1rem' }}>ক্লাসের নাম</th>
              <th style={{ padding: '1rem' }}>সিলেবাস</th>
              <th style={{ padding: '1rem' }}>রুটিন</th>
              <th style={{ padding: '1rem' }}>পরীক্ষা</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {classes.map(cls => (
              <tr key={cls.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{cls.name_bn} ({cls.name})</td>
                <td style={{ padding: '1rem' }}>{cls.syllabus_url ? <a href={cls.syllabus_url} target="_blank" rel="noreferrer" style={{ color: '#56ab2f' }}>লিঙ্ক</a> : '-'}</td>
                <td style={{ padding: '1rem' }}>{cls.routine_url ? <a href={cls.routine_url} target="_blank" rel="noreferrer" style={{ color: '#56ab2f' }}>লিঙ্ক</a> : '-'}</td>
                <td style={{ padding: '1rem' }}>{cls.exam_info ? <a href={cls.exam_info} target="_blank" rel="noreferrer" style={{ color: '#56ab2f' }}>লিঙ্ক</a> : '-'}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(cls.id)} style={{ padding: '0.4rem 0.8rem', background: '#ffe3e3', color: '#fa5252', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>মুছুন</button>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#868e96' }}>কোনো ক্লাস নেই</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
