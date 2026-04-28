export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1rem' }}>Dashboard</h1>
      <p style={{ color: '#495057', marginBottom: '2rem' }}>Welcome to the Sirajia Shishu Niketan Admin Panel!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📢</span> Notice Board
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#868e96', marginBottom: '1rem' }}>Add or remove announcements from the homepage notice board.</p>
          <a href="/admin/notices" style={{ color: '#56ab2f', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Manage &rarr;</a>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>👨‍🏫</span> Teachers
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#868e96', marginBottom: '1rem' }}>Manage teacher profiles and update their information.</p>
          <a href="/admin/teachers" style={{ color: '#56ab2f', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Manage &rarr;</a>
        </div>

        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📸</span> Photo Gallery
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#868e96', marginBottom: '1rem' }}>Upload and organize photos from various school events.</p>
          <a href="/admin/gallery" style={{ color: '#56ab2f', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Manage &rarr;</a>
        </div>

      </div>
    </div>
  );
}
