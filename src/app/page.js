import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import NoticeBanner from '@/components/NoticeBanner';
import StatsCards from '@/components/StatsCards';
import ClassesSection from '@/components/ClassesSection';
import TeachersSection from '@/components/TeachersSection';
import GallerySection from '@/components/GallerySection';
import AlumniSection from '@/components/AlumniSection';
import AdmissionSection from '@/components/AdmissionSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WaveDivider from '@/components/WaveDivider';

// Import our server actions
import {
  getNotices,
  getStats,
  getClasses,
  getTeachers,
  getGallery,
  getAlumni,
  getFees
} from '@/lib/actions';

export default async function Home() {
  // Fetch all dynamic data in parallel
  const [
    notices,
    stats,
    classes,
    teachers,
    gallery,
    alumni,
    fees
  ] = await Promise.all([
    getNotices(),
    getStats(),
    getClasses(),
    getTeachers(),
    getGallery(),
    getAlumni(),
    getFees()
  ]);

  return (
    <>
      <Navbar />
      <HeroSection />
      
      {/* Notice Banner only shows if there are active notices */}
      {notices && notices.filter(n => n.is_active).length > 0 && (
        <NoticeBanner notices={notices.filter(n => n.is_active)} />
      )}
      
      <StatsCards statsData={stats} />
      <WaveDivider color="#FAFAF5" />
      
      <ClassesSection classesData={classes} />
      <WaveDivider color="#F5F0E8" />
      
      <TeachersSection teachersData={teachers} />
      <WaveDivider color="#FAFAF5" flip />
      
      <GallerySection galleryData={gallery} />
      <WaveDivider color="rgba(86,171,47,0.03)" />
      
      <AlumniSection alumniData={alumni} />
      <WaveDivider color="#FAFAF5" flip />
      
      <AdmissionSection feesData={fees} />
      <WaveDivider color="#F5F0E8" />
      
      <AboutSection />
      <WaveDivider color="#FAFAF5" flip />
      
      <ContactSection />
      <Footer />
    </>
  );
}
