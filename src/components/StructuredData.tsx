import { useMemo } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generates JSON-LD structured data for local business
 */
export const useLocalBusinessSchema = () => {
  return useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalService',
      name: '60Plus Global',
      image: 'https://60plus.nurahub.com/so.png',
      description: 'Comprehensive in-home elderly care services across Tamil Nadu. Professional care for your parents from miles away.',
      url: 'https://60plus.nurahub.com',
      telephone: '+919499944939',
      email: 'info@sixtyplusglobal.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chennai',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600028',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Tamil Nadu',
        sameAs: 'https://en.wikipedia.org/wiki/Tamil_Nadu',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '13.0827',
        longitude: '80.2707',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        opens: '00:00',
        closes: '23:59',
        validFrom: '2025-01-01',
      },
      priceRange: '$$',
      serviceType: 'Senior Care Services',
      provider: {
        '@type': 'LocalBusiness',
        name: '60Plus Global',
        image: 'https://60plus.nurahub.com/so.png',
        telephone: '+919499944939',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Chennai',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          postalCode: '600028',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '13.0827',
          longitude: '80.2707',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          opens: '00:00',
          closes: '23:59',
        },
        url: 'https://60plus.nurahub.com',
        email: 'info@sixtyplusglobal.com',
        priceRange: '$$',
      },
      // Social profiles
      sameAs: [
        'https://www.instagram.com/life_after_sixty_tamil',
        'https://m.youtube.com/@LifeAfterSixty-Tamil',
        'https://wa.me/919499944939',
      ],
    };
  }, []);
};

/**
 * Generates JSON-LD structured data for FAQ page
 */
export const useFAQSchema = (faqs: FAQ[]) => {
  return useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }, [faqs]);
};

/**
 * Generates JSON-LD structured data for BreadcrumbList
 */
export const useBreadcrumbSchema = (crumbs: BreadcrumbItem[]) => {
  return useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  }, [crumbs]);
};

/**
 * Generates JSON-LD structured data for Organization
 */
export const useOrganizationSchema = () => {
  return useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '60Plus Global',
      url: 'https://60plus.nurahub.com',
      logo: 'https://60plus.nurahub.com/so.png',
      description: 'Professional in-home elderly care services across Tamil Nadu.',
      email: 'info@sixtyplusglobal.com',
      telephone: '+919499944939',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chennai',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600028',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.instagram.com/life_after_sixty_tamil',
        'https://m.youtube.com/@LifeAfterSixty-Tamil',
        'https://wa.me/919499944939',
      ],
    };
  }, []);
};

/**
 * Generates JSON-LD structured data for Article (for blog content)
 */
export const useArticleSchema = ({
  title,
  description,
  url,
  image,
  author = '60Plus Global',
  published,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  author?: string;
  published?: string;
}) => {
  return useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      image: image,
      url: url,
      author: {
        '@type': 'Organization',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: '60Plus Global',
        logo: {
          '@type': 'ImageObject',
          url: 'https://60plus.nurahub.com/so.png',
        },
      },
      datePublished: published || new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
    };
  }, [title, description, url, image, author, published]);
};

/**
 * Generates JSON-LD structured data for Product/Service
 */
export const useProductSchema = () => {
  return useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: '60Plus Care Plan',
      description: 'Complete care for your parents — handled end-to-end',
      provider: {
        '@type': 'LocalBusiness',
        name: '60Plus Global',
      },
      price: '50.00',
      priceCurrency: 'USD',
      offers: {
        '@type': 'Offer',
        name: '60Plus Care Plan',
        price: '50.00',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceType: 'https://schema.org/OnePrice',
          unitCode: 'MON',
        },
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://60plus.nurahub.com/#pricing',
        seller: {
          '@type': 'LocalBusiness',
          name: '60Plus Global',
        },
      },
      serviceType: 'Senior Care Services',
      areaServed: {
        '@type': 'Place',
        name: 'Tamil Nadu',
      },
    };
  }, []);
};
