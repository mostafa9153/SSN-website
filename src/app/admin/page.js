export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1rem' }}>ড্যাশবোর্ড</h1>
      <p style={{ color: '#495057', marginBottom: '2rem' }}>সিরাজিয়া শিশু নিকেতন এর অ্যাডমিন প্যানেলে স্বাগতম!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📢</span> নোটিশ বোর্ড
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#868e96', marginBottom: '1rem' }}>ওয়েবসাইটের হোম পেজে নতুন নোটিশ যোগ করুন বা মুছে ফেলুন।</p>
          <a href="/admin/notices" style={{ color: '#56ab2f', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>ম্যানেজ করুন &rarr;</a>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>👨‍🏫</span> শিক্ষক মণ্ডলী
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#868e96', marginBottom: '1rem' }}>নতুন শিক্ষক যোগ করুন এবং তাদের প্রোফাইল আপডেট করুন।</p>
          <a href="/admin/teachers" style={{ color: '#56ab2f', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>ম্যানেজ করুন &rarr;</a>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📸</span> গ্যালারি
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#868e96', marginBottom: '1rem' }}>বিদ্যালয়ের বিভিন্ন অনুষ্ঠানের ছবি ওয়েবসাইটে যোগ করুন।</p>
          <a href="/admin/gallery" style={{ color: '#56ab2f', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>ম্যানেজ করুন &rarr;</a>
        </div>

      </div>
    </div>
  );
}
