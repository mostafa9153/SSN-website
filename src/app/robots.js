export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://ssn-school.vercel.app/sitemap.xml', // Replace with final URL
  };
}
