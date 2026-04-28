import { SCHOOL } from '@/lib/constants';

export default function ContactSection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">📞 যোগাযোগ</h2>
        <p className="section-subtitle">আমাদের সাথে যোগাযোগ করুন — আমরা সবসময় আপনার পাশে</p>

        <div className="contact-grid">
          <div>
            <div className="contact-info-list">
              <div className="glass-card contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>ফোন নম্বর</h3>
                  <a href={`tel:+91${SCHOOL.phone}`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>
                    +91 {SCHOOL.phone}
                  </a>
                </div>
              </div>

              <div className="glass-card contact-item">
                <div className="contact-icon">💬</div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>WhatsApp</h3>
                  <a
                    href={`https://wa.me/${SCHOOL.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#25D366', fontWeight: 600 }}
                  >
                    WhatsApp এ মেসেজ করুন
                  </a>
                </div>
              </div>

              <div className="glass-card contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>ঠিকানা</h3>
                  <p style={{ color: 'var(--text-light)' }}>{SCHOOL.addressBn}</p>
                </div>
              </div>

              <div className="glass-card contact-item">
                <div className="contact-icon">🆔</div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>UDISE Code</h3>
                  <p style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>{SCHOOL.udise}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe
              src={SCHOOL.mapEmbedUrl}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="সিরাজিয়া শিশু নিকেতন - ম্যাপ"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
