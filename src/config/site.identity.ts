export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'sfvh06zltv',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'ExpressA News Daily',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Release media distribution for modern media teams',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Distribute company news, product launches, and media announcements with a clear archive, strong reach signals, and reader-friendly story pages on ExpressA News Daily.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'expressainewsdaily.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://expressainewsdaily.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
