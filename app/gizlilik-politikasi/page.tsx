import { Metadata } from 'next';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { getSiteSettings } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Efe Sürücü Kursu',
  description: 'Efe Sürücü Kursu web sitesinde paylaşılan kişisel verilerin nasıl işlendiğine dair temel bilgilendirme.',
};

export default function PrivacyPolicyPage() {
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation siteName={settings.siteName} />

      <div className="h-20"></div>

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-glass-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Gizlilik Politikası</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Bu sayfa, web sitesi üzerinden iletilen iletişim formu bilgilerinin hangi amaçla
            kullanıldığına dair genel bilgilendirme sunar.
          </p>

          <section className="space-y-4 text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-semibold text-white">Toplanan bilgiler</h2>
            <p>
              İletişim formu üzerinden ad soyad, telefon, e-posta, ilgilenilen kurs bilgisi ve
              mesaj içeriği alınabilir. Bu bilgiler yalnızca geri dönüş sağlamak ve bilgi talebini
              değerlendirmek için kullanılır.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">Kullanım amacı</h2>
            <p>
              Paylaştığınız bilgiler; kurs içeriği, kayıt evrakları, fiyat çerçevesi ve ders planına
              ilişkin soruları yanıtlamak için işlenir. Form verileri, ilgisiz reklam amaçlarıyla
              kullanılmaz.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">Saklama ve güvenlik</h2>
            <p>
              Bilgiler, talebinizle ilgili geri dönüş süreci boyunca makul sürelerle saklanabilir.
              Yetkisiz erişimi önlemek için teknik ve operasyonel tedbirler uygulanır.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">Üçüncü taraf bağlantılar</h2>
            <p>
              Site içinde harita, sosyal medya veya dış kaynak bağlantıları bulunabilir. Bu
              bağlantılara gittiğinizde ilgili hizmetin kendi gizlilik politikaları geçerlidir.
            </p>

            <h2 className="text-2xl font-semibold text-white pt-4">İletişim</h2>
            <p>
              Gizlilik uygulamalarına dair sorularınız için{' '}
              <a className="text-secondary-gold hover:underline" href={`mailto:${settings.contact.email}`}>
                {settings.contact.email}
              </a>{' '}
              adresi veya{' '}
              <a className="text-secondary-gold hover:underline" href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}>
                {settings.contact.phone}
              </a>{' '}
              üzerinden ulaşabilirsiniz.
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
