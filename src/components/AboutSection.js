import { SCHOOL } from '@/lib/constants';

export default function AboutSection() {
  return (
    <section className="section bg-cream" id="about">
      <div className="container">
        <h2 className="section-title">🏫 আমাদের সম্পর্কে</h2>
        <p className="section-subtitle">সিরাজিয়া শিশু নিকেতনের গল্প</p>

        <div className="about-content">
          <div className="about-text">
            <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>আমাদের ইতিহাস</h3>
            <p style={{ marginBottom: '1rem' }}>
              ২০১১ সালে প্রতিষ্ঠিত, <strong>সিরাজিয়া শিশু নিকেতন</strong> গুয়াদাহা, বহুলাকা এলাকার একটি বিশ্বস্ত
              শিক্ষা প্রতিষ্ঠান। গ্রামীণ এলাকার শিশুদের মানসম্মত প্রাথমিক শিক্ষা প্রদানের লক্ষ্যে
              এই বিদ্যালয় প্রতিষ্ঠিত হয়েছে।
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Pre-Nursery থেকে Class 4 পর্যন্ত, আমরা বাংলা মাধ্যমে শিক্ষাদান করি এবং
              ইংরেজি ভাষাও শেখানো হয়। UDISE Code: <strong>{SCHOOL.udise}</strong>
            </p>

            <h3 style={{ color: 'var(--primary-dark)', marginBottom: '1rem', marginTop: '1.5rem' }}>আমাদের লক্ষ্য</h3>
            <p>
              প্রতিটি শিশুর মধ্যে লুকিয়ে থাকা সম্ভাবনা জাগিয়ে তোলা এবং তাদের সুন্দর ভবিষ্যতের
              জন্য প্রস্তুত করা। আমরা বিশ্বাস করি — শিক্ষাই আলো, শিক্ষাই শক্তি।
            </p>
          </div>

          <div className="glass-card principal-card">
            <div className="principal-photo">
              <span>👨‍🏫</span>
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>প্রধান শিক্ষকের বার্তা</h3>
            <p style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '0.95rem' }}>
              &ldquo;আমাদের বিদ্যালয়ে প্রতিটি শিশুকে আমরা নিজের সন্তানের মতো ভালোবাসা ও যত্নের সাথে
              শিক্ষা দিই। আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ গড়ে তুলতে আমরা প্রতিশ্রুতিবদ্ধ।&rdquo;
            </p>
            <p style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '0.75rem' }}>
              — প্রধান শিক্ষক, সিরাজিয়া শিশু নিকেতন
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
