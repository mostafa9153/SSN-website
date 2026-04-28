'use client';
import { useState } from 'react';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '@/lib/constants';

export default function GallerySection({ galleryData }) {
  const [active, setActive] = useState('all');
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // Use DB data if available, otherwise use demo data
  const displayGallery = galleryData && galleryData.length > 0 ? galleryData : GALLERY_DATA;

  const filtered = active === 'all' ? displayGallery : displayGallery.filter(g => g.category === active);

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
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map(item => (
            <div
              className="gallery-item"
              key={item.id}
              onClick={() => setLightboxSrc(item.image_url || item.src)}
            >
              <img src={item.image_url || item.src} alt={item.caption} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="lightbox open" onClick={() => setLightboxSrc(null)}>
          <button className="lightbox-close" aria-label="বন্ধ করুন">✕</button>
          <img src={lightboxSrc} alt="গ্যালারি ছবি" />
        </div>
      )}
    </section>
  );
}
