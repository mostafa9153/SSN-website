import { getAlumni } from '@/lib/actions';
import AlumniClient from './AlumniClient';

export default async function AlumniPage() {
  const alumni = await getAlumni();
  
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1.5rem' }}>প্রাক্তন ছাত্রছাত্রী ম্যানেজমেন্ট</h1>
      <AlumniClient initialData={alumni} />
    </div>
  );
}
