'use client';
import { useState } from 'react';
import { updateFee } from '@/lib/actions';

export default function FeesClient({ initialData }) {
  const [fees, setFees] = useState(initialData || []);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ age_requirement: '', admission_fee: '', monthly_fee: '', annual_fee: '' });
  const [loading, setLoading] = useState(false);

  const handleEditClick = (fee) => {
    setEditingId(fee.id);
    setFormData({
      age_requirement: fee.age_requirement || '',
      admission_fee: fee.admission_fee || '',
      monthly_fee: fee.monthly_fee || '',
      annual_fee: fee.annual_fee || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateFee(editingId, {
        age_requirement: formData.age_requirement,
        admission_fee: formData.admission_fee ? parseInt(formData.admission_fee) : null,
        monthly_fee: formData.monthly_fee ? parseInt(formData.monthly_fee) : null,
        annual_fee: formData.annual_fee ? parseInt(formData.annual_fee) : null
      });
      setEditingId(null);
      window.location.reload();
    } catch (error) {
      alert('Error updating fee');
      setLoading(false);
    }
  };

  return (
    <div>
      <p style={{ color: '#666', marginBottom: '2rem' }}>নিচের ক্লাসগুলোর ভর্তি তথ্য ও ফি আপডেট করুন।</p>

      {editingId && (
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #56ab2f', marginBottom: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#2b8a3e' }}>
            {fees.find(f => f.id === editingId)?.class_name} - এর ফি আপডেট করুন
          </h3>
          
          <form onSubmit={handleUpdate}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>বয়সসীমা</label>
                <input 
                  type="text" 
                  value={formData.age_requirement} 
                  onChange={e => setFormData({...formData, age_requirement: e.target.value})} 
                  placeholder="e.g. 3-4 বছর"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>ভর্তি ফি (৳)</label>
                <input 
                  type="number" 
                  value={formData.admission_fee} 
                  onChange={e => setFormData({...formData, admission_fee: e.target.value})} 
                  placeholder="e.g. 500"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>মাসিক ফি (৳)</label>
                <input 
                  type="number" 
                  value={formData.monthly_fee} 
                  onChange={e => setFormData({...formData, monthly_fee: e.target.value})} 
                  placeholder="e.g. 200"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#495057' }}>বার্ষিক ফি (৳)</label>
                <input 
                  type="number" 
                  value={formData.annual_fee} 
                  onChange={e => setFormData({...formData, annual_fee: e.target.value})} 
                  placeholder="e.g. 0"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ced4da' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" disabled={loading} style={{ padding: '0.75rem 2rem', background: '#56ab2f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                {loading ? 'আপডেট হচ্ছে...' : 'পরিবর্তন সেভ করুন'}
              </button>
              <button type="button" onClick={() => setEditingId(null)} style={{ padding: '0.75rem 2rem', background: '#f1f3f5', color: '#495057', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                বাতিল
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '8px', border: '1px solid #e9ecef', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <th style={{ padding: '1rem' }}>শ্রেণী</th>
              <th style={{ padding: '1rem' }}>বয়সসীমা</th>
              <th style={{ padding: '1rem' }}>ভর্তি ফি</th>
              <th style={{ padding: '1rem' }}>মাসিক ফি</th>
              <th style={{ padding: '1rem' }}>বার্ষিক ফি</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {fees.sort((a, b) => (a.display_order || 0) - (b.display_order || 0)).map(fee => (
              <tr key={fee.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{fee.class_name}</td>
                <td style={{ padding: '1rem' }}>{fee.age_requirement || '-'}</td>
                <td style={{ padding: '1rem', color: '#56ab2f', fontWeight: 'bold' }}>{fee.admission_fee ? `৳ ${fee.admission_fee}` : '-'}</td>
                <td style={{ padding: '1rem', color: '#56ab2f', fontWeight: 'bold' }}>{fee.monthly_fee ? `৳ ${fee.monthly_fee}` : '-'}</td>
                <td style={{ padding: '1rem', color: '#56ab2f', fontWeight: 'bold' }}>{fee.annual_fee ? `৳ ${fee.annual_fee}` : '-'}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button 
                    onClick={() => handleEditClick(fee)} 
                    style={{ padding: '0.4rem 1rem', background: 'rgba(86, 171, 47, 0.1)', color: '#56ab2f', border: '1px solid #56ab2f', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    আপডেট
                  </button>
                </td>
              </tr>
            ))}
            {fees.length === 0 && (
              <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#868e96' }}>কোনো তথ্য নেই</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
