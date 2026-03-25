import { getSiteSettings, getCourses } from '@/lib/content';
import { getRecentBlogPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Hero from '@/components/ui/Hero';
import Navigation from '@/components/ui/Navigation';
import StatsCard from '@/components/ui/StatsCard';
import FeatureCard from '@/components/ui/FeatureCard';
import CourseCard from '@/components/ui/CourseCard';
import BlogCard from '@/components/ui/BlogCard';
import Footer from '@/components/ui/Footer';

export default function Home() {
  const settings = getSiteSettings();
  const courses = getCourses();
  const recentPosts = getRecentBlogPosts();
  const stats = settings.stats;
  const homeStats = [
    { value: 15000, label: 'Başarılı öğrenci', suffix: '+', delay: 0 },
    { value: 20, label: 'Kişilik sınıf kontenjanı', suffix: '', delay: 0.1 },
    { value: stats.instructors, label: 'Kişilik eğitim ekibi', suffix: '', delay: 0.2 },
  ];
  const trustPoints = [
    {
      title: 'Kurs seçimini netleştirme',
      text: 'Manuel mi otomatik mi sorusunu günlük kullanım planınıza göre birlikte değerlendiriyoruz.',
    },
    {
      title: 'Sınava yakın tekrar planı',
      text: 'Park, kalkış, kavşak ve trafik akışı gibi zorlanılan başlıklar için odaklı direksiyon tekrarı planlanıyor.',
    },
    {
      title: 'Evrak ve ödeme çerçevesi',
      text: 'Kayıt aşamasında hangi belgenin ve hangi ödeme kaleminin gerektiği baştan açık şekilde anlatılıyor.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-black dark:via-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <Navigation siteName={settings.siteName} />

      {/* Add padding for fixed nav */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <Hero
        title="Büyükçekmece'de Ehliyet Sürecinizi Daha Net Planlayın"
        subtitle={`${stats.yearsOfExperience} yıla yaklaşan yerel tecrübemizle kayıt, ders planı ve sınav hazırlığını aynı akış içinde ilerletiyoruz. B sınıfı, A1-A2 ve özel direksiyon dersi için önce ihtiyacınızı netleştiriyoruz.`}
        primaryCta={{ text: 'Bilgi ve Fiyat Al', href: '/iletisim' }}
        secondaryCta={{ text: 'Telefonla Ulaşın', href: `tel:${settings.contact.phone.replace(/\s/g, '')}` }}
        stats={[
          { value: `${stats.yearsOfExperience}+`, label: 'Yıl yerel tecrübe' },
          { value: '7 gün', label: 'İletişim' },
          { value: 'Hızlı', label: 'Sonuç' },
        ]}
      />

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard
              value={homeStats[0].value}
              label={homeStats[0].label}
              suffix={homeStats[0].suffix}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              delay={homeStats[0].delay}
            />
            <StatsCard
              value={homeStats[1].value}
              label={homeStats[1].label}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
              delay={homeStats[1].delay}
            />
            <StatsCard
              value={homeStats[2].value}
              label={homeStats[2].label}
              suffix={homeStats[2].suffix}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              delay={homeStats[2].delay}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-gray-900 dark:text-white mb-4">
              Ehliyet Aşamaları
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Kayıttan sınav ve belge teslimine kadar süreci adım adım görün
            </p>
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

      {/* Courses Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red/5 via-transparent to-secondary-orange/5"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Size uygun eğitim başlıkları
            </h2>
            <p className="text-xl text-gray-900 dark:text-white">
              B sınıfı, motosiklet ve özel direksiyon dersi seçeneklerini karşılaştırın
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {courses.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
                duration={course.duration}
                features={course.features}
                popular={course.popular}
                image={course.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Points Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-bold text-gray-900 dark:text-white mb-4">
              Adaylar en çok bu konuları soruyor
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Sahte yoruma benzemeyen, süreç içinde gerçekten karar verdiren başlıkları öne çıkarıyoruz
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trustPoints.map((item, index) => (
              <div
                key={item.title}
                className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-3xl p-8 shadow-glass-lg border border-white/30 dark:border-white/10"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-primary-red to-secondary-orange text-white font-bold mb-5">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {recentPosts.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-bl from-accent-rose/10 via-transparent to-primary-red/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-h2 font-bold text-gray-900 dark:text-white mb-4">
                Blog Yazılarımız
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Sık sorulan konular için kısa ve somut rehberler
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {recentPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  category={post.category}
                  date={formatDate(post.date)}
                  slug={post.slug}
                  tags={post.tags}
                  image={post.image}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red via-secondary-orange to-accent-rose"></div>
        
        {/* Animated mesh overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-secondary-gold/20 via-transparent to-transparent animate-pulse-slow"></div>
        </div>
        
        {/* Glass overlay */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-h2 font-bold mb-6 text-white drop-shadow-lg">
            Önce süreci netleştirelim
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Hangi kursun size uygun olduğunu, kayıt evraklarını ve başlangıç ücret çerçevesini aynı görüşmede konuşalım.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/iletisim"
              className="px-8 py-4 backdrop-blur-xl bg-white/95 text-primary-red rounded-2xl font-semibold text-lg shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 border border-white/50"
            >
              Bilgi Formunu Doldur
            </a>
            <a
              href={`tel:${settings.contact.phone.replace(/\s/g, '')}`}
              className="px-8 py-4 backdrop-blur-xl bg-white/10 border-2 border-white/50 hover:bg-white/20 text-white rounded-2xl font-semibold text-lg shadow-glass-xl hover:shadow-glass-xl transition-all duration-300 hover:scale-105"
            >
              Telefonla Ulaşın
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
