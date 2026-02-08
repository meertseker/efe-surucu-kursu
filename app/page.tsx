import { getPopularCourses, getSiteSettings } from '@/lib/content';
import { getRecentBlogPosts } from '@/lib/mdx';
import { formatPrice, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  const settings = getSiteSettings();
  const popularCourses = getPopularCourses();
  const recentPosts = getRecentBlogPosts();
  const stats = settings.stats;

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold text-blue-600">
              {settings.siteName}
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 font-medium">
                Ana Sayfa
              </Link>
              <Link href="/kurslar" className="text-gray-600 hover:text-gray-900">
                Kurslar
              </Link>
              <Link href="/hakkimizda" className="text-gray-600 hover:text-gray-900">
                Hakkımızda
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
              <Link href="/iletisim" className="text-gray-600 hover:text-gray-900">
                İletişim
              </Link>
            </div>
            <Link
              href="/iletisim"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Güvenli Sürüş İçin <br />
              <span className="text-blue-200">Doğru Adres</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {stats.yearsOfExperience} yıllık deneyimimiz, %{stats.successRate} başarı 
              oranımız ve modern eğitim araçlarımızla ehliyetinize güvenle kavuşun.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/kurslar"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Kursları İncele
              </Link>
              <Link
                href="/iletisim"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                Hemen Başvur
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stats.yearsOfExperience}+
              </div>
              <div className="text-gray-600">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                %{stats.successRate}
              </div>
              <div className="text-gray-600">Başarı Oranı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stats.totalStudents.toLocaleString('tr-TR')}+
              </div>
              <div className="text-gray-600">Mezun Öğrenci</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stats.instructors}
              </div>
              <div className="text-gray-600">Eğitmen</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Efe Sürücü Kursu?
            </h2>
            <p className="text-xl text-gray-600">
              Farkımızı yaratan özelliklerimiz
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {settings.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      {popularCourses.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popüler Kurslarımız
              </h2>
              <p className="text-xl text-gray-600">
                Size en uygun paketi seçin
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {popularCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="bg-blue-600 text-white text-center py-2 -mx-6 -mt-6 mb-4 rounded-t-lg font-semibold">
                    Popüler
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-blue-600">
                      {formatPrice(course.price)}
                    </span>
                  </div>
                  <Link
                    href="/kurslar"
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Detayları Gör
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/kurslar"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700"
              >
                Tüm Kursları Görüntüle →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog Section */}
      {recentPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Blog Yazılarımız
              </h2>
              <p className="text-xl text-gray-600">
                Faydalı bilgiler ve ipuçları
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {formatDate(post.date)}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700"
              >
                Tüm Yazıları Görüntüle →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ehliyetinize Bugün Başlayın!
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Hemen başvurun, hayalinizdeki ehliyete sahip olun
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Ücretsiz Bilgi Al
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{settings.siteName}</h3>
              <p className="text-gray-400">
                İstanbul Büyükçekmece'nin güvenilir sürücü kursu
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hızlı Bağlantılar</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/kurslar" className="hover:text-white">
                    Kurslar
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" className="hover:text-white">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="hover:text-white">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{settings.contact.phone}</li>
                <li>{settings.contact.email}</li>
                <li>{settings.contact.address}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sosyal Medya</h4>
              <div className="flex space-x-4">
                {settings.socialMedia.facebook && (
                  <a
                    href={settings.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    Facebook
                  </a>
                )}
                {settings.socialMedia.instagram && (
                  <a
                    href={settings.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              © 2024 {settings.siteName}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
