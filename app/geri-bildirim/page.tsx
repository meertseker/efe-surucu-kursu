import { getSiteSettings } from '@/lib/content';
import { Metadata } from 'next';
import FeedbackForm from '@/components/FeedbackForm';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Şikayet ve Geri Bildirim - Efe Sürücü Kursu',
  description: 'Efe Sürücü Kursu hizmetleriyle ilgili görüş, öneri ve çözüm beklentinizi bizimle paylaşın.',
};

export default function FeedbackPage() {
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-800">
      <Navigation siteName={settings.siteName} />
      
      <div className="h-20"></div>

      <section className="py-20 bg-linear-to-br from-primary-red via-primary-red-dark to-accent-burgundy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-secondary-gold/20 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Şikayet ve Geri Bildirim
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Memnuniyetinizi, önerinizi veya çözüm bekleyen bir konuyu doğrudan bizimle paylaşabilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FeedbackForm />

            <div className="mt-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-glass-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Neden Geri Bildiriminiz Önemli?</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Geri bildirimler, kayıt ve eğitim sürecindeki aksaklıkları daha hızlı görmemize ve hizmet akışını iyileştirmemize yardımcı olur.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Tüm bildirimler kayda alınıp incelenir</li>
                  <li>Gereken durumlarda iletişim bilgileri üzerinden geri dönüş yapılır</li>
                  <li>Tekrarlayan sorunlar için süreç iyileştirmesi yapılır</li>
                  <li>Paylaştığınız bilgiler gizlilik çerçevesinde korunur</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

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
