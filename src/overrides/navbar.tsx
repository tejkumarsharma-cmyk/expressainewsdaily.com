'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const NAVBAR_OVERRIDE_ENABLED = true

const mainNav = [
  { label: 'Release media', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const pathname = usePathname()
  const active = pathname === href || (href !== '/' && pathname.startsWith(href))
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
        active ? 'bg-white/12 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white',
      )}
    >
      {label}
    </Link>
  )
}

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 text-white transition-all duration-300',
        scrolled
          ? 'border-b border-white/15 shadow-[0_8px_28px_rgba(20,3,9,0.35)]'
          : 'border-b border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.08)]',
      )}
      style={{
        backgroundColor: scrolled ? '#4a020f' : '#9a031e',
      }}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6',
          scrolled ? 'h-[3.9rem]' : 'h-[4.25rem]',
        )}
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 transition-opacity hover:opacity-95"
        >
          <span
            className={cn(
              'flex shrink-0 items-center justify-center rounded-2xl bg-[#e36414] text-sm font-extrabold text-white shadow-sm ring-1 ring-black/10 transition-all duration-300',
              scrolled ? 'h-8 w-8' : 'h-9 w-9',
            )}
            aria-hidden
          >
            E
          </span>
          <span className="min-w-0 text-left">
            <span className="block truncate font-display text-base font-bold tracking-tight sm:text-lg">{SITE_CONFIG.name}</span>
            <span className="hidden text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white/75 sm:block">
              {siteContent.navbar.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {mainNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="rounded-full text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            className={cn(
              'rounded-full border border-[#e36414] bg-[#e36414] font-semibold text-white shadow-sm transition-colors hover:bg-[#c55210]',
              scrolled ? 'hover:bg-[#b94c0f]' : 'hover:bg-[#c55210]',
            )}
          >
            <Link href="/register">Start free</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1.5 sm:hidden">
          <Button
            size="icon"
            variant="ghost"
            asChild
            className="rounded-full text-white hover:bg-white/10"
          >
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full text-white hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className={cn('border-t border-white/10 md:hidden', scrolled ? 'bg-[#5d0210]' : 'bg-[#7a0216]')}>
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onClick={() => setOpen(false)}
              />
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-[#e36414] px-3 py-2.5 text-center text-sm font-bold text-white"
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
