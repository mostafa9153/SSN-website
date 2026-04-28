import { CLASSES_LIST } from '@/lib/constants';

export default function ClassesSection({ classesData }) {
  // Use DB data if available, otherwise use demo data
  const displayClasses = classesData && classesData.length > 0 ? classesData : CLASSES_LIST;

  return (
    <section className="section" id="classes">
      <div className="container">
        <h2 className="section-title">📖 ক্লাস সমূহ</h2>
        <p className="section-subtitle">Pre-Nursery থেকে Class 4 — প্রতিটি শ্রেণীর বিস্তারিত তথ্য</p>
        <div className="classes-grid">
          {displayClasses.map((cls) => (
            <div className="glass-card class-card" key={cls.id}>
              <h3>{cls.name_bn || cls.nameBn} ({cls.name})</h3>
              <div className="class-links">
                <div className="class-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#56ab2f" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  <span>সিলেবাস PDF</span>
                  {cls.syllabus_url ? (
                    <a href={cls.syllabus_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>দেখুন</a>
                  ) : (
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#999' }}>শীঘ্রই আসছে</span>
                  )}
                </div>
                <div className="class-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#56ab2f" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>রুটিন PDF</span>
                  {cls.routine_url ? (
                    <a href={cls.routine_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>দেখুন</a>
                  ) : (
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#999' }}>শীঘ্রই আসছে</span>
                  )}
                </div>
                <div className="class-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#56ab2f" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 10 3 12 0v-5"/></svg>
                  <span>পরীক্ষার বিবরণ</span>
                  {cls.exam_info ? (
                    <a href={cls.exam_info} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>দেখুন</a>
                  ) : (
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#999' }}>শীঘ্রই আসছে</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
