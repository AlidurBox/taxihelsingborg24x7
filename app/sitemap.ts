import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/boka`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/priser`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/om-oss`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${SITE.url}/integritetspolicy`, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
