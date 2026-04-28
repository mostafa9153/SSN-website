import { getClasses } from '@/lib/actions';
import ClassesClient from './ClassesClient';

export default async function ClassesPage() {
  const classes = await getClasses();
  
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1.5rem' }}>ক্লাস ও রুটিন ম্যানেজমেন্ট</h1>
      <ClassesClient initialData={classes} />
    </div>
  );
}
