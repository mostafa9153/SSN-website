'use client';
import { useState } from 'react';
import { addFee, deleteFee } from '@/lib/actions';

export default function FeesClient({ initialData }) {
  const [fees, setFees] = useState(initialData || []);
  const [formData, setFormData] = useState({ class_name: '', age_requirement: '', admission_fee: '', monthly_fee: '', annual_fee: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addFee(formData);
      window.location.reload();
    } catch (error) {
      alert('Error adding fee data');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিত?')) return;
    try {
      await deleteFee(id);
      setFees(fees.filter(f => f.id !== id));
    } catch (error) {
      alert('Error deleting fee data');
    }
  };

  return (
    <div>
      {/* Add Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>নতুন ক্লাসের ফি যোগ করুন</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input type="text" placeholder="শ্রেণী (e.g. Pre-Nursery)" required value={formData.class_name} onChange={e => setFormData({...formData, class_name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="text" placeholder="বয়সসীমা (e.g. ৩-৪ বছর)" required value={formData.age_requirement} onChange={e => setFormData({...formData, age_requirement: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="number" placeholder="ভর্তি ফি (e.g. 500)" required value={formData.admission_fee} onChange={e => setFormData({...formData, admission_fee: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="number" placeholder="মাসিক ফি (e.g. 200)" required value={formData.monthly_fee} onChange={e => setFormData({...formData, monthly_fee: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          <input type="number" placeholder="বার্ষিক ফি (e.g. 2500)" required value={formData.annual_fee} onChange={e => setFormData({...formData, annual_fee: e.target.value})} style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ced4da' }} />
          
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
              <th style={{ padding: '1rem' }}>শ্রেণী</th>
              <th style={{ padding: '1rem' }}>বয়সসীমা</th>
              <th style={{ padding: '1rem' }}>ভর্তি ফি</th>
              <th style={{ padding: '1rem' }}>মাসিক ফি</th>
              <th style={{ padding: '1rem' }}>বার্ষিক ফি</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {fees.map(fee => (
              <tr key={fee.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{fee.class_name}</td>
                <td style={{ padding: '1rem' }}>{fee.age_requirement}</td>
                <td style={{ padding: '1rem' }}>৳{fee.admission_fee}</td>
                <td style={{ padding: '1rem' }}>৳{fee.monthly_fee}</td>
                <td style={{ padding: '1rem' }}>৳{fee.annual_fee}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(fee.id)} style={{ padding: '0.4rem 0.8rem', background: '#ffe3e3', color: '#fa5252', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>মুছুন</button>
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
