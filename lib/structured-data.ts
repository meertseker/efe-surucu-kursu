import { getSiteSettings } from './content';
import type { WithContext, LocalBusiness, BreadcrumbList } from 'schema-dts';

export function getLocalBusinessSchema(): WithContext<LocalBusiness> {
  const settings = getSiteSettings();
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://efesurucukursu.com',
    name: settings.siteName,
    image: 'https://efesurucukursu.com/images/logo.png',
    description: settings.seo.description,
    url: 'https://efesurucukursu.com',
    telephone: settings.contact.phone,
    email: settings.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.contact.fullAddress,
      addressLocality: 'Büyükçekmece',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.0246,
      longitude: 28.5853,
    },
    priceRange: '₺₺',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      settings.socialMedia.facebook,
      settings.socialMedia.instagram,
      settings.socialMedia.twitter,
      settings.socialMedia.youtube,
    ].filter((url): url is string => typeof url === 'string'),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
