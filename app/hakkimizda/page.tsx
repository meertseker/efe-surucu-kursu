import { getInstructors, getSiteSettings } from '@/lib/content';
import { Metadata } from 'next';
import Navigation from '@/components/ui/Navigation';
import StatsCard from '@/components/ui/StatsCard';
import FeatureCard from '@/components/ui/FeatureCard';
import InstructorCard from '@/components/ui/InstructorCard';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Hakkımızda - Efe Sürücü Kursu',
  description: 'Efe Sürücü Kursu\'nun Büyükçekmece merkezli eğitim yaklaşımı, kayıt süreci ve aday desteği hakkında bilgi alın.',
};

export default function AboutPage() {
  const instructors = getInstructors();
  const settings = getSiteSettings();
  const stats = settings.stats;
  const aboutStats = [
    { value: stats.yearsOfExperience, label: 'Yılı aşkın yerel tecrübe', suffix: '+', delay: 0 },
    { value: 7, label: 'Gün danışma desteği', suffix: '', delay: 0.1 },
    { value: stats.totalStudents, label: 'Kişilik sınıf kontenjanı', suffix: '', delay: 0.2 },
    { value: stats.instructors, label: 'Kişilik eğitim ekibi', suffix: '', delay: 0.3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation siteName={settings.siteName} />
      
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-red via-primary-red-dark to-accent-burgundy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-secondary-gold/20 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Hakkımızda
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            2003&apos;ten beri Büyükçekmece&apos;de kayıt, teorik eğitim ve direksiyon sürecini
            daha anlaşılır ilerletmeye odaklanan yerel sürücü kursu yaklaşımı
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard
              value={aboutStats[0].value}
              label={aboutStats[0].label}
              suffix={aboutStats[0].suffix}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              delay={aboutStats[0].delay}
            />
            <StatsCard
              value={aboutStats[1].value}
              label={aboutStats[1].label}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
              delay={aboutStats[1].delay}
            />
            <StatsCard
              value={aboutStats[2].value}
              label={aboutStats[2].label}
              suffix={aboutStats[2].suffix}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              delay={aboutStats[2].delay}
            />
            <StatsCard
              value={aboutStats[3].value}
              label={aboutStats[3].label}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              delay={aboutStats[3].delay}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Ehliyet Aşamaları</h2>
            <p className="text-xl text-gray-300">Kayıttan sınav ve belge teslimine kadar süreci adım adım paylaşıyoruz</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {settings.features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
                title={feature.name}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 via-transparent to-secondary-orange/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Eğitmen Kadromuz
            </h2>
            <p className="text-xl text-gray-300">
              Gerçek kişi adı yerine eğitim ve aday desteği yaklaşımımızı paylaşıyoruz
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor, index) => (
              <InstructorCard
                key={instructor.id}
                name={instructor.name}
                title={instructor.title}
                experience={instructor.experience}
                bio={instructor.bio}
                specialties={instructor.specialties}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red via-secondary-orange to-accent-rose"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Kayıt öncesinde süreci konuşalım
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Uygun kurs türünü, evrak listesini ve ders planını sizin durumunuza göre netleştirelim
          </p>
          <a
            href="/iletisim"
            className="inline-block px-8 py-4 backdrop-blur-xl bg-white/95 text-primary-red rounded-2xl font-semibold text-lg shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 border border-white/50"
          >
            Bilgi Al
          </a>
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
