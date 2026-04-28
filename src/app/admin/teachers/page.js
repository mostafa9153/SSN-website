import { getTeachers } from '@/lib/actions';
import TeachersClient from './TeachersClient';

export default async function TeachersPage() {
  const teachers = await getTeachers();
  
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1.5rem' }}>শিক্ষক ম্যানেজমেন্ট</h1>
      <TeachersClient initialData={teachers} />
    </div>
  );
}
