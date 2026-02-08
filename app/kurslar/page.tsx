import { getCourses } from '@/lib/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kurslarımız - Efe Sürücü Kursu',
  description: 'B sınıfı ehliyet kursları, otomatik ve manuel vites eğitim paketleri. Size uygun kursu seçin.',
};

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation will be added later */}
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kurslarımız
          </h1>
          <p className="text-xl text-gray-600">
            Size en uygun eğitim paketini seçin
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {course.popular && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  Popüler Seçim
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-blue-600">
                    {course.price.toLocaleString('tr-TR')} ₺
                  </span>
                  <span className="text-gray-500 ml-2">/ {course.duration}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Kayıt Ol
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer will be added later */}
    </div>
  );
}
