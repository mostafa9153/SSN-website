'use client';
import { useState } from 'react';
import { updateStats } from '@/lib/actions';

export default function StatsClient({ initialData }) {
  const [formData, setFormData] = useState({
    teacher_count: initialData?.teacher_count || 0,
    student_count: initialData?.student_count || 0,
    founding_year: initialData?.founding_year || 2011
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateStats(formData);
      setMessage('Statistics updated successfully! ✓');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      alert('Error updating statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem', color: '#2d3436' }}>Site Statistics</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Update the numbers shown in the landing page stats cards.</p>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #e9ecef', maxWidth: '600px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>Total Teachers</label>
            <input 
              type="number" 
              value={formData.teacher_count} 
              onChange={e => setFormData({...formData, teacher_count: parseInt(e.target.value)})} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }} 
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>Total Students</label>
            <input 
              type="number" 
              value={formData.student_count} 
              onChange={e => setFormData({...formData, student_count: parseInt(e.target.value)})} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }} 
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>Founding Year</label>
            <input 
              type="number" 
              value={formData.founding_year} 
              onChange={e => setFormData({...formData, founding_year: parseInt(e.target.value)})} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ width: '100%', padding: '1rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            {loading ? 'Updating...' : 'Update Statistics'}
          </button>

          {message && (
            <div style={{ marginTop: '1rem', textAlign: 'center', color: '#56ab2f', fontWeight: 'bold' }}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
