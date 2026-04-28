import { getGallery } from '@/lib/actions';
import GalleryClient from './GalleryClient';

export default async function GalleryPage() {
  const gallery = await getGallery();
  
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', color: '#2b8a3e', marginBottom: '1.5rem' }}>গ্যালারি ম্যানেজমেন্ট</h1>
      <GalleryClient initialData={gallery} />
    </div>
  );
}
