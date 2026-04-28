'use client';
import { useState } from 'react';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '@/lib/constants';

export default function GallerySection({ galleryData }) {
  const [active, setActive] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Use DB data if available, otherwise use demo data
  const displayGallery = galleryData && galleryData.length > 0 ? galleryData : GALLERY_DATA;

  const filtered = active === 'all' ? displayGallery : displayGallery.filter(g => g.category === active);
  
  // Reset visible count when category changes
  const handleCategoryChange = (id) => {
    setActive(id);
    setVisibleCount(6);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filtered.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filtered.length - 1 : prev - 1));
  };

  return (
    <section className="section" id="gallery">
      <div className="container">
        <h2 className="section-title">📸 গ্যালারি</h2>
        <p className="section-subtitle">আমাদের বিদ্যালয়ের বিভিন্ন মুহূর্ত</p>

        <div className="gallery-tabs">
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`gallery-tab${active === cat.id ? ' active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.slice(0, visibleCount).map((item, index) => (
            <div
              className="gallery-item"
              key={item.id}
              onClick={() => setLightboxIndex(index)}
            >
              <img src={item.image_url || item.src} alt={item.caption || "গ্যালারি ছবি"} loading="lazy" />
            </div>
          ))}
        </div>

        {filtered.length > visibleCount && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button 
              className="btn" 
              onClick={() => setVisibleCount(prev => prev + 6)}
              style={{ background: 'var(--primary)', color: 'white', padding: '0.75rem 2rem', borderRadius: '50px' }}
            >
              আরও দেখুন (See More) ↓
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Slideshow */}
      {lightboxIndex !== null && (
        <div className="lightbox open" onClick={() => setLightboxIndex(null)}>
          <button className="lightbox-close" aria-label="বন্ধ করুন" onClick={() => setLightboxIndex(null)}>✕</button>
          
          <button className="lightbox-btn prev" onClick={handlePrev} aria-label="Previous">❮</button>
          
          <img 
            src={filtered[lightboxIndex].image_url || filtered[lightboxIndex].src} 
            alt={filtered[lightboxIndex].caption || "গ্যালারি ছবি"} 
            onClick={(e) => e.stopPropagation()}
          />
          
          {filtered[lightboxIndex].caption && (
            <div className="lightbox-caption" onClick={(e) => e.stopPropagation()}>
              {filtered[lightboxIndex].caption}
            </div>
          )}

          <button className="lightbox-btn next" onClick={handleNext} aria-label="Next">❯</button>
        </div>
      )}
    </section>
  );
}
