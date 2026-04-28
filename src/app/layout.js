import './globals.css';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'সিরাজিয়া শিশু নিকেতন | গুয়াদাহা, বহুলাকা | Nursery থেকে Class 4',
  description: 'সিরাজিয়া শিশু নিকেতন — গুয়াদাহা, বহুলাকা, পশ্চিমবঙ্গের একটি বিশ্বস্ত প্রাথমিক বিদ্যালয়। Pre-Nursery থেকে Class 4 পর্যন্ত বাংলা মাধ্যমে মানসম্মত শিক্ষা। UDISE: 19200505206',
  keywords: ['সিরাজিয়া শিশু নিকেতন', 'গুয়াদাহা স্কুল', 'বহুলাকা', 'প্রাথমিক বিদ্যালয়', 'nursery school', 'West Bengal school'],
  openGraph: {
    title: 'সিরাজিয়া শিশু নিকেতন',
    description: 'গুয়াদাহা, বহুলাকার বিশ্বস্ত প্রাথমিক বিদ্যালয় — Pre-Nursery থেকে Class 4',
    locale: 'bn_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#56ab2f" />
        {/* Schema.org School markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "School",
              "name": "সিরাজিয়া শিশু নিকেতন",
              "alternateName": "Sirajia Shishu Niketan",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Guyadaha",
                "addressLocality": "Bahulaka",
                "addressRegion": "West Bengal",
                "postalCode": "721253",
                "addressCountry": "IN"
              },
              "telephone": "+917318778321",
              "foundingDate": "2011",
              "description": "Pre-Nursery থেকে Class 4 পর্যন্ত বাংলা মাধ্যমে মানসম্মত শিক্ষা"
            })
          }}
        />
      </head>
      <body style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
