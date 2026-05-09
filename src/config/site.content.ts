import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press & media distribution',
  },
  footer: {
    tagline: 'Your wire for timely company news',
  },
  hero: {
    badge: 'Distribution',
    title: ['Release Media Distribution'],
    description:
      'Send polished announcements, reach journalists and search surfaces, and keep a clean public archive that reads like a professional newswire.',
    primaryCta: {
      label: 'Send a Release Media',
      href: '/register',
    },
    secondaryCta: {
      label: 'Learn more',
      href: '/about',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'Wire',
    featureCardTitle: 'Structured releases, faster scanning.',
    featureCardDescription:
      'Headlines, categories, and reading pages are tuned for discovery—without turning your site into a generic blog template.',
  },
  home: {
    metadata: {
      title: 'Release media distribution & latest company news',
      description:
        'Distribute media announcements, product launches, and public statements with ExpressA News Daily’s press archive and reader-friendly story pages.',
      openGraphTitle: 'Release media distribution & latest company news',
      openGraphDescription:
        'A professional press wire experience: distribution positioning, scannable archives, and premium story presentation.',
      keywords: [
        'release media',
        'newswire',
        'media distribution',
        'company announcements',
        'PR',
        'ExpressA News Daily',
      ],
    },
    introBadge: 'How it works',
    introTitle: 'From profile to published release—without the busywork.',
    introParagraphs: [
      'ExpressA News Daily is built for teams that ship announcements often: a focused distribution story, a calm archive, and reading pages that feel editorial—not like a generic CMS theme.',
      'The homepage highlights your latest wire items, the services you can add (translation, extra syndication, support), and the trust signals partners expect from a media-facing surface.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Single primary lane for press coverage with clean headline rhythm.',
      'Search-friendly archive with category context.',
      'Story pages designed for long-form reading and shareability.',
    ],
    primaryLink: {
      label: 'Browse releases',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Contact distribution',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Grow coverage',
    title: 'Ready to put your next story in front of the right readers?',
    description: 'Start an account, upload your press materials, and publish to your ExpressA wire archive in minutes.',
    primaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
  },
  taskSectionHeading: 'Release media',
  taskSectionDescriptionSuffix: 'The newest items on your newswire.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Latest release media',
    description: 'Browse the full wire: headlines, categories, and dates.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Release media archive',
    paragraphs: [
      'Scan the wire by recency, category, and headline. Each item opens into a full release page designed for clear reading, sharing, and follow-up.',
      'Use search when you are looking for a name, product, or topic that appeared across your announcements.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Search', href: '/search' },
    ],
  },
}
