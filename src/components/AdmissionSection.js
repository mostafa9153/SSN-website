import { FEES_DATA } from '@/lib/constants';

export default function AdmissionSection({ feesData }) {
  // Use DB data if available, otherwise use demo data
  const displayFees = feesData && feesData.length > 0 ? feesData : FEES_DATA;

  return (
    <section className="section" id="admission">
      <div className="container">
        <h2 className="section-title">📝 ভর্তি তথ্য ও ফি</h2>
        <p className="section-subtitle">আপনার সন্তানকে ভর্তি করুন — সহজ প্রক্রিয়া, সাশ্রয়ী মূল্যে</p>

        {/* Fees Table */}
        <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
          <table className="fees-table">
            <thead>
              <tr>
                <th>শ্রেণী</th>
                <th>বয়সসীমা</th>
                <th>ভর্তি ফি</th>
                <th>মাসিক ফি</th>
                <th>বার্ষিক ফি</th>
              </tr>
            </thead>
            <tbody>
              {displayFees.map((fee, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{fee.class_name || fee.class}</td>
                  <td>{fee.age_requirement || fee.age}</td>
                  <td>৳{fee.admission_fee || fee.admission}</td>
                  <td>৳{fee.monthly_fee || fee.monthly}</td>
                  <td>৳{fee.annual_fee || fee.annual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Admission Steps */}
        <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>
          ভর্তির প্রক্রিয়া
        </h3>
        <div className="admission-steps">
          {[
            { step: 1, title: 'যোগাযোগ করুন', desc: 'ফোন বা WhatsApp এ আমাদের সাথে কথা বলুন' },
            { step: 2, title: 'ফর্ম সংগ্রহ', desc: 'বিদ্যালয় থেকে ভর্তি ফর্ম নিন' },
            { step: 3, title: 'ডকুমেন্ট জমা', desc: 'জন্ম সনদ ও ছবি জমা দিন' },
            { step: 4, title: 'ভর্তি সম্পন্ন', desc: 'ফি জমা দিয়ে ভর্তি নিশ্চিত করুন' },
          ].map(s => (
            <div className="glass-card step-card" key={s.step}>
              <div className="step-number">{s.step}</div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="https://wa.me/917318778321?text=নমস্কার, ভর্তি সম্পর্কে জানতে চাই।"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            এখনই WhatsApp এ যোগাযোগ করুন
          </a>
        </div>
      </div>
    </section>
  );
}
