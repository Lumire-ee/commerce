import type { MetadataRoute } from 'next';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://atelier-commerce.com';

  const categoryEntries = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/#bestsellers`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    ...categoryEntries,
  ];
}
