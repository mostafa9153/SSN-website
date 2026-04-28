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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateStats(formData);
      alert('সফলভাবে আপডেট করা হয়েছে!');
    } catch (error) {
      alert('Error updating stats');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', maxWidth: '500px' }}>
        <p style={{ color: '#868e96', marginBottom: '1.5rem' }}>হোম পেজে প্রদর্শিত ওয়েবসাইটের মূল তথ্যগুলো এখান থেকে পরিবর্তন করতে পারবেন।</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>মোট শিক্ষক-শিক্ষিকা</label>
            <input 
              type="number" 
              required 
              value={formData.teacher_count} 
              onChange={e => setFormData({...formData, teacher_count: parseInt(e.target.value) || 0})} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>মোট শিক্ষার্থী</label>
            <input 
              type="number" 
              required 
              value={formData.student_count} 
              onChange={e => setFormData({...formData, student_count: parseInt(e.target.value) || 0})} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>প্রতিষ্ঠা সাল (e.g. 2011)</label>
            <input 
              type="number" 
              required 
              value={formData.founding_year} 
              onChange={e => setFormData({...formData, founding_year: parseInt(e.target.value) || 2011})} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} 
            />
          </div>
          
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' }}>
            {loading ? 'আপডেট হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
