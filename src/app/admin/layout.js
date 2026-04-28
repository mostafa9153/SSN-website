'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
    <div className="admin-layout">
      {/* Sidebar Overlay for Mobile */}
      <div 
        className={`admin-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e9ecef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', color: '#56ab2f', margin: 0 }}>🏫 Admin Panel</h2>
          {/* Close button for mobile inside sidebar */}
          <button 
            className="admin-hamburger" 
            style={{ display: sidebarOpen ? 'flex' : 'none', margin: 0, padding: '0.2rem 0.5rem' }} 
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
          <Link 
            href="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.5rem',
              color: '#495057',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: '500',
              borderBottom: '1px solid #f1f3f5',
              marginBottom: '0.5rem'
            }}
          >
            <span>🌐</span> View Website
          </Link>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              onClick={() => setSidebarOpen(false)}
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
      <main className="admin-main">
        {/* Mobile Hamburger Button */}
        <button 
          className="admin-hamburger" 
          onClick={() => setSidebarOpen(true)}
        >
          <span>☰</span> Menu
        </button>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
