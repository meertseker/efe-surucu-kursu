import { getPopularCourses, getSiteSettings, getCourses } from '@/lib/content';
import { getRecentBlogPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Hero from '@/components/ui/Hero';
import Navigation from '@/components/ui/Navigation';
import StatsCard from '@/components/ui/StatsCard';
import FeatureCard from '@/components/ui/FeatureCard';
import CourseCard from '@/components/ui/CourseCard';
import BlogCard from '@/components/ui/BlogCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import TrustBadge from '@/components/ui/TrustBadge';
import Footer from '@/components/ui/Footer';

export default function Home() {
  const settings = getSiteSettings();
  const courses = getCourses();
  const popularCourses = courses.filter(c => c.popular);
  const recentPosts = getRecentBlogPosts();
  const stats = settings.stats;

  // Sample testimonials
  const testimonials = [
    {
      name: 'Ayşe Yılmaz',
      course: 'B Sınıfı - Yoğun Paket',
      rating: 5,
      text: 'Harika bir deneyimdi! Eğitmenler çok sabırlı ve profesyonel. İlk seferde sınavı kazandım.',
    },
    {
      name: 'Mehmet Demir',
      course: 'B Sınıfı - Standart Paket',
      rating: 5,
      text: 'Efe Sürücü Kursu\'nu herkese tavsiye ederim. Modern araçlar ve kaliteli eğitim.',
    },
    {
      name: 'Zeynep Kaya',
      course: 'B Sınıfı - Otomatik Vites',
      rating: 5,
      text: 'Otomatik vites eğitimi çok rahat geçti. Teşekkürler Efe Sürücü Kursu!',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation siteName={settings.siteName} />

      {/* Add padding for fixed nav */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <Hero
        title="Güvenli Sürüş İçin Doğru Adres"
        subtitle={`${stats.yearsOfExperience} yıllık deneyimimiz, %${stats.successRate} başarı oranımız ve modern eğitim araçlarımızla ehliyetinize güvenle kavuşun.`}
        primaryCta={{ text: 'Kursları İncele', href: '/kurslar' }}
        secondaryCta={{ text: 'Hemen Başvur', href: '/iletisim' }}
        stats={[
          { value: `${stats.yearsOfExperience}+`, label: 'Yıl Deneyim' },
          { value: `%${stats.successRate}`, label: 'Başarı Oranı' },
          { value: `${stats.totalStudents}+`, label: 'Mezun Öğrenci' },
        ]}
      />

      {/* Trust Badges Section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-success-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TrustBadge
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
              title="MEB Onaylı"
              description="Milli Eğitim Bakanlığı onaylı eğitim programı"
              color="blue"
              delay={0}
            />
            <TrustBadge
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
              title="%95 Başarı"
              description="İlk seferde sınavı kazanma oranımız"
              color="green"
              delay={0.1}
            />
            <TrustBadge
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              }
              title="15 Yıl Deneyim"
              description="Sektörde kanıtlanmış tecrübe"
              color="orange"
              delay={0.2}
            />
            <TrustBadge
              icon={
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              }
              title="Modern Araçlar"
              description="2023-2024 model eğitim araçları"
              color="purple"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard
              value={stats.yearsOfExperience}
              label="Yıl Deneyim"
              suffix="+"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              delay={0}
            />
            <StatsCard
              value={stats.successRate}
              label="Başarı Oranı"
              prefix="%"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              }
              delay={0.1}
            />
            <StatsCard
              value={stats.totalStudents}
              label="Mezun Öğrenci"
              suffix="+"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              delay={0.2}
            />
            <StatsCard
              value={stats.instructors}
              label="Eğitmen"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Neden Efe Sürücü Kursu?
            </h2>
            <p className="text-xl text-gray-600">
              Farkımızı yaratan özelliklerimiz
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popüler Kurslarımız
            </h2>
            <p className="text-xl text-gray-600">
              Size en uygun paketi seçin
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Öğrencilerimiz Ne Diyor?
            </h2>
            <p className="text-xl text-gray-600">
              Başarı hikayelerini dinleyin
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                course={testimonial.course}
                rating={testimonial.rating}
                text={testimonial.text}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Blog Yazılarımız
              </h2>
              <p className="text-xl text-gray-600">
                Faydalı bilgiler ve ipuçları
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
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ehliyetinize Bugün Başlayın!
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Hemen başvurun, hayalinizdeki ehliyete sahip olun. Deneyimli eğitmenlerimiz ve modern araçlarımızla size en iyi eğitimi sunuyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/iletisim"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Ücretsiz Bilgi Al
            </a>
            <a
              href="/kurslar"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              Kursları İncele
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        siteName={settings.siteName}
        phone={settings.contact.phone}
        email={settings.contact.email}
        address={settings.contact.address}
        socialMedia={settings.socialMedia}
      />
    </div>
  );
}
