import { Metadata } from 'next';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları - Efe Sürücü Kursu',
  description: 'Efe Sürücü Kursu web sitesinin kullanımına ilişkin genel koşullar ve bilgilendirme metni.',
};

export default function TermsPage() {
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation siteName={settings.siteName} />

      <div className="h-20"></div>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-glass-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Kullanım Koşulları</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Bu web sitesindeki içerikler genel bilgilendirme amacıyla yayımlanır. Kesin kayıt,
            fiyat ve mevzuat bilgileri için doğrudan iletişim kurulması gerekir.
          </p>

          <section className="space-y-4 text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-semibold text-white">Bilgi niteliğindeki içerikler</h2>
            <p>
              Sitede yer alan kurs ücretleri, süreler, evrak listeleri ve sınav sürecine dair
              açıklamalar bilgi amaçlıdır. Güncel uygulama koşulları dönemsel olarak değişebilir.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">Kullanıcının sorumluluğu</h2>
            <p>
              Kullanıcı, form veya iletişim kanalları üzerinden doğru ve güncel bilgi paylaşmaktan
              sorumludur. Yanlış veya eksik bilgi nedeniyle doğabilecek sorunlarda ek teyit gerekebilir.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">Fikri mülkiyet</h2>
            <p>
              Sitedeki metinler, görseller, logo ve diğer içerikler aksi belirtilmedikçe ilgili marka
              ve site sahibine aittir. İzinsiz kopyalama veya ticari kullanım uygun değildir.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">Dış bağlantılar</h2>
            <p>
              Site, resmi kurumlar, sosyal medya platformları veya üçüncü taraf sayfalara bağlantı
              içerebilir. Bu bağlantılardaki içeriklerden ilgili hizmet sağlayıcıları sorumludur.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">İletişim</h2>
            <p>
              Kullanım koşullarıyla ilgili sorularınız için{' '}
              <a className="text-secondary-gold hover:underline" href={`mailto:${settings.contact.email}`}>
                {settings.contact.email}
              </a>{' '}
              veya{' '}
              <a className="text-secondary-gold hover:underline" href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}>
                {settings.contact.phone}
              </a>{' '}
              üzerinden iletişim kurabilirsiniz.
            </p>
          </section>
        </div>
      </main>

      <Footer
        siteName={settings.siteName}
        phone={settings.contact.phone}
        email={settings.contact.email}
        address={settings.contact.fullAddress}
        socialMedia={settings.socialMedia}
      />
    </div>
  );
}
