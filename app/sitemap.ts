import type { MetadataRoute } from 'next';

const BASE = 'https://pizzabuddies.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1.0 },
    { url: `${BASE}/private-events`, priority: 0.9 },
    { url: `${BASE}/quote`, priority: 0.9 },
    { url: `${BASE}/menu`, priority: 0.8 },
    { url: `${BASE}/gallery`, priority: 0.6 },
    { url: `${BASE}/about`, priority: 0.6 },
    // Re-add when the corporate page is re-enabled (see app/corporate-events/page.tsx):
    // { url: `${BASE}/corporate-events`, priority: 0.9 },
  ];
}
