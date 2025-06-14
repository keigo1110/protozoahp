import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://protozoa-site.vercel.app',
      lastModified: new Date('2025-06-15'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}