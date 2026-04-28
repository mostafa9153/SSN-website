import { SCHOOL, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>🏫 {SCHOOL.name}</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
              {SCHOOL.addressBn}<br />
              Founded: 2011<br />
              UDISE: {SCHOOL.udise}
            </p>
          </div>
          <div>
            <h4>দ্রুত লিঙ্ক</h4>
            <div className="footer-links">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4>যোগাযোগ</h4>
            <div className="footer-links">
              <a href={`tel:+91${SCHOOL.phone}`}>📞 +91 {SCHOOL.phone}</a>
              <a href={`https://wa.me/${SCHOOL.whatsapp}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
              <p style={{ fontSize: '0.9rem' }}>📍 {SCHOOL.addressBn}</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {SCHOOL.name}। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
