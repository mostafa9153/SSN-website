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
            {displayNotices.map(notice => (
              <div className="notice-item" key={notice.id}>
                <span className="notice-pin">📌</span>
                <span>{notice.text || notice.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
