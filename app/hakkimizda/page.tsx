import { getInstructors, getSiteSettings } from '@/lib/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda - Efe Sürücü Kursu',
  description: 'Deneyimli eğitmen kadromuz, modern araçlarımız ve başarı hikayemiz hakkında bilgi edinin.',
};

export default function AboutPage() {
  const instructors = getInstructors();
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {settings.stats.yearsOfExperience} yıllık deneyimimiz ile İstanbul Büyükçekmece'nin
            en güvenilir sürücü kursu
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {settings.stats.yearsOfExperience}+
            </div>
            <div className="text-gray-600">Yıl Deneyim</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              %{settings.stats.successRate}
            </div>
            <div className="text-gray-600">Başarı Oranı</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {settings.stats.totalStudents.toLocaleString('tr-TR')}+
            </div>
            <div className="text-gray-600">Mezun Öğrenci</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {settings.stats.instructors}
            </div>
            <div className="text-gray-600">Eğitmen</div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Neden Biz?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {settings.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-600 mb-4">
                  <svg
                    className="w-12 h-12"
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

        {/* Instructors */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            Eğitmen Kadromuz
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{instructor.name}</h3>
                  <p className="text-blue-600 mb-2">{instructor.title}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    {instructor.experience} deneyim
                  </p>
                  <p className="text-gray-700 text-sm mb-4">{instructor.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
