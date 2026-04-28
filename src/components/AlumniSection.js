import { ALUMNI_DATA } from '@/lib/constants';

export default function AlumniSection({ alumniData }) {
  // Use DB data if available, otherwise use demo data
  const displayAlumni = alumniData && alumniData.length > 0 ? alumniData : ALUMNI_DATA;

  return (
    <section className="section bg-light-green" id="alumni">
      <div className="container">
        <h2 className="section-title">🎓 সফল প্রাক্তন ছাত্রছাত্রী</h2>
        <p className="section-subtitle">আমাদের গর্ব — যারা এগিয়ে চলেছে</p>
        <div className="alumni-scroll">
          {displayAlumni.map(alumni => (
            <div className="glass-card alumni-card" key={alumni.id}>
              <div className="alumni-photo">
                {alumni.photo_url ? (
                  <img src={alumni.photo_url} alt={alumni.name} loading="lazy" />
                ) : (
                  <span>{alumni.emoji || '🎓'}</span>
                )}
              </div>
              <h3>{alumni.name}</h3>
              <p className="achievement">{alumni.achievement}</p>
              <p className="year">{alumni.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
