export default function sitemap() {
  const baseUrl = 'https://ssn-school.vercel.app'; // Update with final domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // The single-page architecture means we only really need the root indexed
  ];
}
