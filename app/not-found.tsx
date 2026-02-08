import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı',
  description: 'Aradığınız sayfa bulunamadı.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
          <div className="relative">
            <svg
              className="w-32 h-32 mx-auto text-primary-400 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sayfa Bulunamadı
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. 
          Lütfen URL'yi kontrol edin veya ana sayfaya dönün.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Anasayfaya Dön
          </Link>

          <Link
            href="/kurslar"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
          >
            Kursları İncele
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Popüler Sayfalar:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <Link
              href="/kurslar"
              className="text-primary-600 hover:underline text-left"
            >
              → Kurslarımız
            </Link>
            <Link
              href="/hakkimizda"
              className="text-primary-600 hover:underline text-left"
            >
              → Hakkımızda
            </Link>
            <Link
              href="/blog"
              className="text-primary-600 hover:underline text-left"
            >
              → Blog
            </Link>
            <Link
              href="/iletisim"
              className="text-primary-600 hover:underline text-left"
            >
              → İletişim
            </Link>
            <Link
              href="/sss"
              className="text-primary-600 hover:underline text-left"
            >
              → SSS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
