import { getStats } from '@/lib/actions';
import StatsClient from './StatsClient';

export default async function StatsPage() {
  const stats = await getStats();
  
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1.5rem' }}>স্ট্যাটস ম্যানেজমেন্ট</h1>
      <StatsClient initialData={stats} />
    </div>
  );
}
