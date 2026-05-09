import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { Twitter, Linkedin } from 'lucide-react'

export const FOOTER_OVERRIDE_ENABLED = true

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Distribution',
    links: [
      { label: 'Release media', href: '/updates' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
  {
    title: 'Access',
    links: [
      { label: 'Sign in', href: '/login' },
      { label: 'Create account', href: '/register' },
    ],
  },
]

export function FooterOverride() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#120507] text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="sm:col-span-2">
            <p className="font-display text-xl font-bold tracking-tight">{SITE_CONFIG.name}</p>
            <p className="mt-2 text-sm text-white/65">{siteContent.footer.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/55">{SITE_CONFIG.description}</p>
            <p className="mt-2 text-sm text-white/50">{SITE_CONFIG.domain}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-rose-200/90">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-white/80 transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3" aria-label="Social">
            <a
              className="rounded-full border border-white/15 p-2.5 text-white/70 transition hover:text-white"
              href="https://x.com"
              rel="noreferrer"
              target="_blank"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              className="rounded-full border border-white/15 p-2.5 text-white/70 transition hover:text-white"
              href="https://www.linkedin.com"
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
