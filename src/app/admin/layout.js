'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  // Do not show sidebar on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Notices', path: '/admin/notices', icon: '📢' },
    { name: 'Teachers', path: '/admin/teachers', icon: '👨‍🏫' },
    { name: 'Classes & Routine', path: '/admin/classes', icon: '📖' },
    { name: 'Admission & Fees', path: '/admin/fees', icon: '📝' },
    { name: 'Gallery', path: '/admin/gallery', icon: '📸' },
    { name: 'Alumni', path: '/admin/alumni', icon: '🎓' },
    { name: 'Site Stats', path: '/admin/stats', icon: '📈' },
  ];

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa', fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#ffffff', borderRight: '1px solid #e9ecef', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e9ecef' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#56ab2f', margin: 0 }}>🏫 Admin Panel</h2>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.5rem',
                color: pathname === item.path ? '#56ab2f' : '#495057',
                background: pathname === item.path ? 'rgba(86, 171, 47, 0.1)' : 'transparent',
                borderRight: pathname === item.path ? '3px solid #56ab2f' : '3px solid transparent',
                textDecoration: 'none',
                fontWeight: pathname === item.path ? '600' : '400',
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div style={{ padding: '1rem', borderTop: '1px solid #e9ecef' }}>
          <button 
            onClick={handleLogout}
            style={{ width: '100%', padding: '0.5rem', background: '#ffe3e3', color: '#e03131', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
