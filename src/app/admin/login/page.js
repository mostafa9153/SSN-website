'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.href = '/admin'; // Force full reload to update middleware
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#F5F0E8' }}>
      <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏫</div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#56ab2f' }}>অ্যাডমিন প্যানেল</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>লগইন করতে পাসওয়ার্ড দিন</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="পাসওয়ার্ড"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '1rem', fontSize: '1rem' }}
            required
          />
          {error && <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'left' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: '#56ab2f', color: 'white', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
          </button>
        </form>
      </div>
    </div>
  );
}
