import { getCourses, getSiteSettings } from '@/lib/content';
import { Metadata } from 'next';
import Navigation from '@/components/ui/Navigation';
import CourseCard from '@/components/ui/CourseCard';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Hizmetlerimiz - Mavi Sigorta - Allianz',
  description: 'Sigorta danışmanlığı, araç sigortası, kasko ve tüm sigorta ihtiyaçlarınız için profesyonel çözümler.',
};

export default function CoursesPage() {
  const courses = getCourses();
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Navigation siteName={settings.siteName} />
      
      <div className="h-20"></div>
      
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary-red via-primary-red-dark to-accent-burgundy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-secondary-gold/20 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Kurslarımız
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Size en uygun eğitim paketini seçin ve güvenle sürmeye başlayın
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {courses.map((course) => (
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

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-red/10 via-secondary-orange/10 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Hangi Kursu Seçeceğinizden Emin Değil Misiniz?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Size en uygun paketi bulmak için bizimle iletişime geçin
          </p>
          <a
            href="/iletisim"
            className="inline-block px-8 py-4 bg-primary-red text-white rounded-xl font-semibold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-red-dark"
          >
            📞 Bize Ulaşın
          </a>
        </div>
      </section>

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
