'use client';
import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/lib/constants';

function AnimatedNumber({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} className="stat-number">{count}+</span>;
}

export default function StatsCards({ statsData }) {
  const currentYear = new Date().getFullYear();
  
  // Use DB data if available, otherwise use demo data
  const foundingYear = statsData?.founding_year || STATS.foundedYear;
  const experience = currentYear - foundingYear;
  const teacherCount = statsData?.teacher_count || STATS.teachers;
  const studentCount = statsData?.student_count || STATS.students;

  const stats = [
    { icon: '👨‍🏫', number: teacherCount, label: 'শিক্ষক-শিক্ষিকা' },
    { icon: '👨‍🎓', number: studentCount, label: 'শিক্ষার্থী' },
    { icon: '🏫', number: experience, label: 'বছরের অভিজ্ঞতা' },
  ];

  return (
    <section className="section bg-light-green" id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div className="glass-card stat-card" key={i}>
              <div className="stat-icon">
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              </div>
              <AnimatedNumber target={stat.number} />
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
