import type { Metadata } from 'next';
import { getFAQPageSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getSiteSettings } from '@/lib/content';
import FAQAccordion from '@/components/ui/FAQAccordion';
import faqs from '@/content/faqs.json';

const settings = getSiteSettings();

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular',
  description: 'Efe Sürücü Kursu hakkında merak ettiğiniz her şey. Ehliyet sınavı, kurs süreleri, ücretler ve daha fazlası hakkında sorularınızın cevapları.',
  keywords: ['sürücü kursu SSS', 'ehliyet sınavı soruları', 'sürücü kursu fiyatları', 'ehliyet kursu süresi'],
  openGraph: {
    title: 'Sıkça Sorulan Sorular | Efe Sürücü Kursu',
    description: 'Ehliyet alma sürecinde merak ettiğiniz soruların cevapları.',
    url: 'https://efesurucukursu.com/sss',
  },
};

export default function SSSPage() {
  const faqSchema = getFAQPageSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'SSS', url: 'https://efesurucukursu.com/sss' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navigation siteName={settings.siteName} logo={settings.logo} />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: 'Sıkça Sorulan Sorular' }]} />
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sıkça Sorulan Sorular
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl">
              Ehliyet alma sürecinde merak ettiğiniz soruların cevapları burada. 
              Aradığınızı bulamadıysanız bize ulaşabilirsiniz.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <FAQAccordion faqs={faqs} />
            </div>

            {/* Contact CTA */}
            <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center border border-primary-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Başka Sorunuz mu Var?
              </h2>
              <p className="text-gray-600 mb-6">
                Cevabını bulamadığınız sorular için bize ulaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  İletişime Geç
                </a>
                <a
                  href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
                >
                  {settings.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer
        siteName={settings.siteName}
        phone={settings.contact.phone}
        email={settings.contact.email}
        address={settings.contact.address}
        socialMedia={settings.socialMedia}
      />
    </>
  );
}
