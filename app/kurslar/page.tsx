import { getCourses, getSiteSettings } from '@/lib/content';
import { Metadata } from 'next';
import Navigation from '@/components/ui/Navigation';
import CourseCard from '@/components/ui/CourseCard';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Kurslarımız - Efe Sürücü Kursu',
  description: 'B sınıfı ehliyet kursları, otomatik ve manuel vites eğitim paketleri. Size uygun kursu seçin.',
};

export default function CoursesPage() {
  const courses = getCourses();
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-white">
      <Navigation siteName={settings.siteName} />
      
      <div className="h-20"></div>
      
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Kurslarımız
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hangi Kursu Seçeceğinizden Emin Değil Misiniz?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Size en uygun paketi bulmak için bizimle iletişime geçin
          </p>
          <a
            href="/iletisim"
            className="inline-block px-8 py-4 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
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
