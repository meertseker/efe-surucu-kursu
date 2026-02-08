import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/content";
import { getLocalBusinessSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const settings = getSiteSettings();

export const metadata: Metadata = {
  metadataBase: new URL('https://efesurucukursu.com'),
  title: {
    default: settings.seo.title,
    template: '%s | Efe Sürücü Kursu',
  },
  description: settings.seo.description,
  keywords: settings.seo.keywords,
  authors: [{ name: 'Efe Sürücü Kursu' }],
  creator: 'Efe Sürücü Kursu',
  publisher: 'Efe Sürücü Kursu',
  openGraph: {
    title: settings.seo.title,
    description: settings.seo.description,
    type: "website",
    locale: "tr_TR",
    url: 'https://efesurucukursu.com',
    siteName: settings.siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: settings.seo.title,
    description: settings.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getLocalBusinessSchema();

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
