import { getNotices } from '@/lib/actions';
import NoticesClient from './NoticesClient';

export default async function NoticesPage() {
  const notices = await getNotices();
  
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1.5rem' }}>নোটিশ ম্যানেজমেন্ট</h1>
      <NoticesClient initialData={notices} />
    </div>
  );
}
