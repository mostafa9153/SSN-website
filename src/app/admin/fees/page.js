import { getFees } from '@/lib/actions';
import FeesClient from './FeesClient';

export default async function FeesPage() {
  const fees = await getFees();
  
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1.5rem' }}>ভর্তি তথ্য ও ফি ম্যানেজমেন্ট</h1>
      <FeesClient initialData={fees} />
    </div>
  );
}
