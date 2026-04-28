'use client';
import { NOTICES_DATA } from '@/lib/constants';

export default function NoticeBanner({ notices }) {
  // Use DB data if available, otherwise use demo data
  const displayNotices = notices && notices.length > 0 ? notices : NOTICES_DATA;

  return (
    <div className="section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="notice-banner">
          <div className="notice-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            আজকের নোটিশ
          </div>
          <div className="notice-list">
            {displayNotices.map(notice => {
              const content = (
                <>
                  <span className="notice-pin" style={{ fontSize: '1.2rem' }}>📌</span>
                  <span style={{ flex: 1, fontWeight: '500', color: '#2d3436' }}>{notice.text || notice.title}</span>
                  {notice.file_url && (
                    <span 
                      className="notice-btn"
                      style={{ 
                        fontSize: '0.85rem', 
                        background: 'linear-gradient(135deg, #56ab2f, #3d8b1e)', 
                        color: 'white', 
                        padding: '6px 14px', 
                        borderRadius: '20px', 
                        textDecoration: 'none',
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 8px rgba(86, 171, 47, 0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      ফাইল দেখুন 📄
                    </span>
                  )}
                </>
              );

              const itemStyle = { 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                flexWrap: 'wrap',
                padding: '0.75rem 1rem',
                margin: '0.25rem 0',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '8px',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                cursor: notice.file_url ? 'pointer' : 'default'
              };

              return notice.file_url ? (
                <a 
                  href={notice.file_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="notice-item-clickable"
                  key={notice.id} 
                  style={itemStyle}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    e.currentTarget.style.background = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.6)';
                  }}
                >
                  {content}
                </a>
              ) : (
                <div className="notice-item" key={notice.id} style={itemStyle}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
