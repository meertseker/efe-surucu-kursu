import fs from 'fs';
import path from 'path';
import { Course, Instructor, SiteSettings } from './types';

const contentDirectory = path.join(process.cwd(), 'content');

export function getCourses(): Course[] {
  try {
    const filePath = path.join(contentDirectory, 'courses.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading courses.json:', error);
    return [];
  }
}

export function getCourseById(id: string): Course | null {
  const courses = getCourses();
  return courses.find((course) => course.id === id) || null;
}

export function getPopularCourses(): Course[] {
  return getCourses().filter((course) => course.popular);
}

export function getInstructors(): Instructor[] {
  try {
    const filePath = path.join(contentDirectory, 'instructors.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading instructors.json:', error);
    return [];
  }
}

export function getInstructorById(id: string): Instructor | null {
  const instructors = getInstructors();
  return instructors.find((instructor) => instructor.id === id) || null;
}

export function getSiteSettings(): SiteSettings {
  try {
    const filePath = path.join(contentDirectory, 'settings.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading settings.json:', error);
    // Return default settings if file doesn't exist
    return {
      siteName: 'Efe Sürücü Kursu',
      logo: '/logo.png',
      contact: {
        phone: '0212 883 08 83',
        email: 'info@efesurucukursu.com.tr',
        address: '19 Mayıs Mah. D100 Karayolu Cad. No: 1079, Kat 1, Büyükçekmece / İstanbul',
        fullAddress: 'Ressam Efe Motorlu Taşıt Sürücü Kursu, 19 Mayıs Mah. D100 Karayolu Cad. No: 1079, Kat 1, Büyükçekmece / İstanbul',
        mapEmbed: 'https://www.google.com/maps?q=19+May%C4%B1s+Mah.+D100+Karayolu+Cad.+No:+1079+Kat+1,+B%C3%BCy%C3%BCk%C3%A7ekmece,+%C4%B0stanbul&output=embed',
      },
      socialMedia: {
        facebook: 'https://www.facebook.com/efesurucukursubuyukcekmece/',
      },
      workingHours: {
        weekdays: '09:00 - 21:00',
        saturday: '09:00 - 21:00',
        sunday: '09:00 - 21:00',
      },
      seo: {
        title: 'Efe Sürücü Kursu | Büyükçekmece Ehliyet ve Direksiyon Dersi',
        description: 'Büyükçekmece\'de B sınıfı manuel ve otomatik ehliyet, A1-A2 motosiklet ehliyeti ve özel direksiyon dersi için kayıt ve eğitim planı.',
        keywords: ['Büyükçekmece ehliyet kursu', 'B sınıfı ehliyet kursu', 'özel direksiyon dersi'],
      },
      features: [
        {
          name: 'Basvuru ve Evrak Kontrolu',
          description: 'Kayit oncesinde gerekli belgeler, uygun kurs turu ve surec adimlari birlikte netlestirilir.',
          icon: 'map',
        },
        {
          name: 'Teorik Egitim Sureci',
          description: 'Trafik, ilk yardim ve motor dersleri planli sekilde ilerletilir; sinav oncesi eksik konular tekrar edilir.',
          icon: 'book',
        },
        {
          name: 'Direksiyon Dersi Plani',
          description: 'Park, kalkis, kavsak ve akan trafikte surus calismalari adayin seviyesine gore programlanir.',
          icon: 'check-circle',
        },
        {
          name: 'Sinav ve Belge Teslimi',
          description: 'E-sinav, direksiyon sinavi ve belge basvuru adimlari bastan sona acik sekilde aktarilir.',
          icon: 'clock',
        },
      ],
      stats: {
        yearsOfExperience: 23,
        successRate: 90,
        totalStudents: 20,
        instructors: 7,
      },
    };
  }
}
