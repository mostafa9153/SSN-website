'use client';
import { useState, useEffect } from 'react';
import { NAV_LINKS, SCHOOL } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="container">
          <a href="#home" className="nav-brand">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.15"/>
              <text x="20" y="26" textAnchor="middle" fontSize="18" fill="currentColor">🏫</text>
            </svg>
            {SCHOOL.name}
          </a>
          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} onClick={handleLinkClick}>
                {link.label}
              </a>
            ))}
            <a 
              href="/admin" 
              onClick={handleLinkClick} 
              className="admin-nav-btn"
            >
              ⚙️ Admin Panel
            </a>
          </div>
          <div 
            className={`hamburger${menuOpen ? ' active' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="মেনু খুলুন"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      <div 
        className={`nav-overlay${menuOpen ? ' active' : ''}`} 
        onClick={() => setMenuOpen(false)} 
      />
    </>
  );
}
