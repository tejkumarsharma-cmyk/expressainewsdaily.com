import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check, FileText, Radio, Sparkles, Upload, UserPlus } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const brandMarks = [
  { label: "Sainsbury's", src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=120&fit=crop&q=60&auto=format' },
  { label: 'The Guardian', src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=120&fit=crop&q=60&auto=format' },
  { label: 'Yahoo', src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=120&fit=crop&q=60&auto=format' },
  { label: 'Reuters', src: 'https://images.unsplash.com/photo-1585282263867-b58edf6f69e4?w=400&h=120&fit=crop&q=60&auto=format' },
  { label: 'Bloomberg', src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=120&fit=crop&q=60&auto=format' },
  { label: 'Forbes', src: 'https://images.unsplash.com/photo-1557804506-669a67965e7e?w=400&h=120&fit=crop&q=60&auto=format' },
] as const

const services = [
  { title: 'News distribution', body: 'Syndicate headlines with consistent structure for wire-style scanning.' },
  { title: 'Translation', body: 'Localize your announcement while preserving quotes and key facts.' },
  { title: 'Copywriting', body: 'Polish the lede, boilerplate, and CTA to read press-ready on day one.' },
  { title: 'Extra distribution', body: 'Add target clusters when you need broader industry visibility.' },
  { title: 'Disclosure services', body: 'Keep regulated announcements aligned with the right disclosure rhythm.' },
  { title: 'Media database', body: 'Line up outlets and contacts that match the story you are shipping.' },
] as const

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 10, { fresh: true })

  return (
    <div className="min-h-screen bg-white text-[var(--brand-ink)]">
      <NavbarShell />
      <SchemaJsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_CONFIG.name, url: SITE_CONFIG.baseUrl },
        ]}
      />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=2200&h=1100&fit=crop&q=80&auto=format')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(120deg, rgba(22,8,10,0.62) 0%, rgba(58,13,14,0.48) 42%, rgba(104,31,14,0.42) 100%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-1/3 top-0 h-full w-[160%] opacity-35 [animation:ena-dots_6s_ease-in-out_infinite]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.22) 0.5px, transparent 0.6px)',
              backgroundSize: '10px 10px',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(28, 7, 9, 0.5), rgba(28, 7, 9, 0.1) 45%, transparent)',
            }}
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
              {siteContent.hero.badge}
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.25)] sm:text-5xl md:text-6xl">
              {siteContent.hero.title[0]}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.2)] sm:text-lg">
              {siteContent.hero.description}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#0f766e] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition [transition-timing-function:var(--motion-ease)] hover:-translate-y-0.5 hover:bg-[#0d9488]"
              >
                {siteContent.hero.primaryCta.label}
              </a>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border-2 border-white/85 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition [transition-timing-function:var(--motion-ease)] hover:bg-white/20"
              >
                {siteContent.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
              {siteContent.home.introTitle}
            </h2>
            <p className="mt-3 text-[var(--brand-muted)]">{siteContent.home.sidePoints[0]}</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: '1', title: 'Add profile', blurb: 'Create your org profile, boilerplate, and contact surface.', icon: UserPlus, tone: 'from-slate-50/90 to-white' },
              { step: '2', title: 'Upload release media', blurb: 'Drop your headline, body, quotes, and hero imagery.', icon: Upload, tone: 'from-slate-50/90 to-white' },
              { step: '3', title: 'Publish', blurb: 'Your wire page goes live in the archive—clean and scannable.', icon: Radio, tone: 'from-slate-50/90 to-white' },
            ].map((item) => (
              <div
                key={item.step}
                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_34px_rgba(30,42,68,0.08)] [animation:ena-fade-up_0.6s_ease_forwards] motion-reduce:animate-none"
                style={{ animationDelay: `${Number(item.step) * 80}ms` }}
              >
                <div
                  className={cn(
                    'mb-4 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br text-[#9a031e]',
                    item.tone,
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e36414]">Step {item.step}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-[var(--brand-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--brand-muted)]">{item.blurb}</p>
                <div className="mt-5 rounded-xl border border-dashed border-slate-200/80 bg-slate-50/60 p-3">
                  <div className="h-2 w-1/2 rounded bg-[#e36414]/35" />
                  <div className="mt-2 h-2 w-3/4 rounded bg-slate-200/70" />
                  <div className="mt-2 h-2 w-2/3 rounded bg-slate-100/90" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest */}
        <section className="border-y border-slate-200/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-display text-2xl font-bold text-[var(--brand-ink)] sm:text-3xl">
                  {siteContent.taskSectionHeading}
                </h2>
                <p className="mt-2 text-sm text-[var(--brand-muted)]">{siteContent.taskSectionDescriptionSuffix}</p>
              </div>
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 rounded-full border border-[#e36414]/35 bg-white px-4 py-2 text-sm font-semibold text-[#9a031e] shadow-sm transition hover:-translate-y-0.5 hover:border-[#e36414]/55 hover:bg-[#fff8f4]"
              >
                Release archive
                <FileText className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-10 divide-y divide-slate-200/80">
              {(posts.length ? posts : []).map((post) => {
                return (
                  <li key={post.id} className="[transition:background_0.2s_ease] hover:bg-slate-100/70">
                    <Link href={`/updates/${post.slug}`} className="group flex items-start gap-4 py-4 sm:gap-6 sm:py-5">
                      <p className="min-w-0 flex-1 text-base font-semibold leading-snug text-[var(--brand-ink)] group-hover:underline sm:text-lg">
                        {post.title}
                      </p>
                      <FileText
                        className="mt-1 h-4 w-4 shrink-0 text-rose-300/90 [transition:color_0.2s] group-hover:text-[#9a031e]"
                        aria-hidden
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
            {posts.length === 0 && (
              <p className="mt-6 rounded-2xl border border-dashed border-slate-300/90 bg-slate-100/60 p-6 text-sm text-[var(--brand-muted)]">
                New releases will appear here as they are published.{' '}
                <Link className="font-semibold text-[var(--brand-red)] underline" href="/updates">
                  Open the full archive
                </Link>
                .
              </p>
            )}
          </div>
        </section>

        {/* Brands */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center font-display text-2xl font-bold text-[var(--brand-ink)] sm:text-3xl">We work with the brands you love.</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-[var(--brand-muted)]">
            Representative media surfaces and distribution contexts—illustrated with neutral photography for a calm partner strip.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {brandMarks.map((b) => (
              <div
                key={b.label}
                className="group relative h-10 w-28 overflow-hidden rounded-lg border border-slate-200 bg-white sm:h-11 sm:w-32"
              >
                <Image
                  src={b.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 45vw, 120px"
                  className="object-cover object-center grayscale [transition:filter_0.35s] group-hover:grayscale-0"
                />
                <span className="sr-only">{b.label}</span>
                <span
                  className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-white/80 to-transparent pb-0.5 text-[0.5rem] font-bold uppercase tracking-wider text-neutral-500 sm:text-[0.55rem]"
                  aria-hidden
                >
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Services + phone */}
        <section className="border-y border-slate-200/80 bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c2410c]/90">Our services</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--brand-ink)] sm:text-4xl">Build reach without losing clarity.</h2>
              <ul className="mt-8 space-y-4">
                {services.map((s) => (
                  <li
                    key={s.title}
                    className="flex gap-3 rounded-xl border border-slate-200/70 bg-white p-4 shadow-sm [transition:box-shadow_0.25s] hover:shadow-md"
                  >
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#e36414]/15 text-[#9a031e]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--brand-ink)]">{s.title}</p>
                      <p className="mt-1 text-sm leading-7 text-[var(--brand-muted)]">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative justify-self-center lg:justify-self-end">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#e36414]/20 blur-2xl" aria-hidden />
              <div className="relative w-[min(100%,320px)]">
                <Image
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&h=1200&fit=crop&q=60&auto=format"
                  alt="Mobile view of a news and press experience"
                  width={640}
                  height={820}
                  className="h-auto w-full rounded-[2rem] object-cover shadow-2xl shadow-[#1a0a0d]/20 ring-1 ring-slate-300/60"
                />
                <div className="absolute inset-x-6 top-6 rounded-2xl border border-white/25 bg-black/20 p-3 text-[0.6rem] font-bold uppercase tracking-widest text-white/95 backdrop-blur-sm">
                  {SITE_CONFIG.name}
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
            <div className="grid gap-4 md:grid-cols-3">
              {['Hassle free', 'Rapid support', 'Lowest pricing'].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center text-[var(--brand-ink)] shadow-[0_8px_30px_rgba(40,52,76,0.06)] [transition:transform_0.25s_var(--motion-ease)] hover:-translate-y-0.5"
                >
                  <p className="text-lg font-bold text-[#9a031e]">{t}</p>
                  <p className="mt-2 text-sm text-[var(--brand-muted)]">Built for small teams with enterprise-grade publishing habits.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(115deg, #5c0a0f 0%, #7a0214 35%, #9a031e 60%, #b01e2a 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(227,100,20,0.45), transparent), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(255,255,255,0.12), transparent)',
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'repeating-linear-gradient(60deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 6px)',
            }}
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6 sm:py-14">
            <div>
              <p className="font-display text-2xl font-bold text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.2)] sm:text-3xl">
                Get media coverage for your business with powerful press distribution.
              </p>
              <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
                Ship releases with a consistent look, a dependable archive, and a reader experience that still feels like a real newsroom—not a skinned template.
              </p>
            </div>
            <a
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-[#e36414] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-black/25 [transition:transform_0.2s] hover:-translate-y-0.5 hover:bg-[#c45a12]"
            >
              Sign up free
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* About blurb */}
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <Sparkles className="mx-auto h-5 w-5 text-[#e36414]" />
            <h2 className="mt-3 font-display text-2xl font-bold text-[var(--brand-ink)] sm:text-3xl">
              Welcome to the ExpressA online news distribution service
            </h2>
          </div>
          <div className="prose prose-neutral mt-7 max-w-none text-[0.98rem] leading-8 [text-rendering:optimizeLegibility]">
            <p className="text-[#3a2c30]">
              {siteContent.home.introParagraphs[0]} {siteContent.home.introParagraphs[1]}{' '}
              {siteContent.home.sidePoints[2]}
            </p>
            <p className="text-[var(--brand-muted)]">
              Questions about timing, add-ons, or a higher-volume program? Reach the desk on{' '}
              <Link href="/contact" className="font-semibold text-[#9a031e] underline-offset-2 hover:underline">
                the contact page
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
