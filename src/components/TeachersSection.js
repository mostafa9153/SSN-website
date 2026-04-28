import { TEACHERS_DATA } from '@/lib/constants';

export default function TeachersSection({ teachersData }) {
  // Use DB data if available, otherwise use demo data
  const displayTeachers = teachersData && teachersData.length > 0 ? teachersData : TEACHERS_DATA;

  return (
    <section className="section bg-cream" id="teachers">
      <div className="container">
        <h2 className="section-title">👨‍🏫 শিক্ষক মণ্ডলী</h2>
        <p className="section-subtitle">আমাদের অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষক-শিক্ষিকাবৃন্দ</p>
        <div className="teachers-stack">
          {displayTeachers.map((teacher, index) => (
            <div
              className="teacher-card-wrapper"
              key={teacher.id}
              style={{
                '--z': displayTeachers.length - index,
                top: `calc(var(--nav-height) + ${20 + index * 15}px)`,
                zIndex: displayTeachers.length - index,
              }}
            >
              <div className="teacher-card">
                <div className="teacher-photo">
                  {teacher.photo_url ? (
                    <img src={teacher.photo_url} alt={teacher.name} loading="lazy" />
                  ) : (
                    <span>{teacher.emoji || '👨‍🏫'}</span>
                  )}
                </div>
                <div className="teacher-info">
                  <h3>{teacher.name}</h3>
                  <p className="designation">{teacher.designation}</p>
                  <p className="subject">বিষয়: {teacher.subject}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
