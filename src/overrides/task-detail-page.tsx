import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

const isImageUrl = (v?: string | null) => typeof v === 'string' && (v.startsWith('/') || v.startsWith('http'))

function getHeroImage(post: SitePost) {
  const content = (post.content || {}) as { images?: string[]; body?: string }
  const fromMedia = Array.isArray(post.media) ? post.media.find((m) => m?.url)?.url : null
  const fromContent = Array.isArray(content.images) ? content.images.find((u) => isImageUrl(u)) : null
  return (fromMedia || fromContent || '').trim() || null
}

function getSubtitle(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { excerpt?: string }).excerpt : ''
  if (typeof c === 'string' && c.trim()) return c.trim()
  return post.summary || ''
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 8, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 3)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Release body will appear here.')
  const hero = getHeroImage(post)
  const subtitle = getSubtitle(post)
  const path = buildPostUrl(task, post.slug)
  const taskLabel = getTaskConfig(task)?.label || 'Post'
  const isPressWire = task === 'mediaDistribution'
  const url = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${path}`
  const encodedUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(post.title)

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] text-[var(--brand-ink)]">
      <NavbarShell />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: post.title,
          datePublished: post.publishedAt || undefined,
          author: { '@type': 'Organization', name: post.authorName || SITE_CONFIG.name },
          image: hero ? (hero.startsWith('http') ? hero : `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${hero}`) : undefined,
        }}
      />
      <header className="border-b border-rose-100/80 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-rose-400/90">{isPressWire ? 'Release media' : taskLabel}</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl md:text-[2.4rem]">{post.title}</h1>
          {subtitle ? <p className="mt-4 text-lg text-[var(--brand-muted)]">{subtitle}</p> : null}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--brand-muted)]">
            <span className="font-medium text-[var(--brand-ink)]">{post.authorName || SITE_CONFIG.name}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Share">
            <a
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-rose-200/80 bg-rose-50/60 px-3 text-xs font-semibold text-[var(--brand-ink)] [transition:transform_0.2s] hover:-translate-y-0.5"
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareTitle}`}
              rel="noreferrer"
              target="_blank"
            >
              <Twitter className="h-3.5 w-3.5" /> X / Twitter
            </a>
            <a
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-rose-200/80 bg-rose-50/60 px-3 text-xs font-semibold text-[var(--brand-ink)] [transition:transform_0.2s] hover:-translate-y-0.5"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-rose-200/80 bg-rose-50/60 px-3 text-xs font-semibold text-[var(--brand-ink)] [transition:transform_0.2s] hover:-translate-y-0.5"
              href={`https://www.facebook.com/sharer.php?u=${encodedUrl}`}
              rel="noreferrer"
              target="_blank"
            >
              <Facebook className="h-3.5 w-3.5" /> Facebook
            </a>
          </div>
        </div>
      </header>
      {hero && (
        <div className="bg-[#0f0306]">
          <div className="relative mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] w-full sm:aspect-[2/1]">
              <ContentImage src={hero} alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" aria-hidden />
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article
            className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:tracking-tight
            prose-a:text-[var(--brand-orange)] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-p:text-[#3f3034] prose-li:text-[#3f3034]"
          >
            <div className="prose-p:max-w-3xl">
              <RichContent html={html} />
            </div>
          </article>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            {isPressWire ? (
              <div className="rounded-2xl border border-slate-200/80 bg-slate-100/80 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">This wire</p>
                <p className="mt-1 text-sm text-[var(--brand-muted)]">
                  Published for media and stakeholders. Citation should reference {SITE_CONFIG.name}.
                </p>
              </div>
            ) : null}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <p className="text-sm font-bold text-[var(--brand-ink)]">Read next</p>
              <ul className="mt-2 space-y-2">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link
                      className="text-sm font-medium text-[var(--brand-red)] hover:underline"
                      href={buildPostUrl(task, item.slug)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      {related.length ? (
        <section className="border-t border-slate-200/80 bg-gradient-to-b from-slate-100/60 to-[var(--brand-surface)] py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold">Related stories</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={buildPostUrl(task, item.slug)}
                  className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm [transition:box-shadow_0.25s] hover:shadow-md"
                >
                  {getHeroImage(item) ? (
                    <div className="relative aspect-[5/3] w-full">
                      <ContentImage src={getHeroImage(item) || '/placeholder.svg'} alt="" fill className="object-cover" />
                    </div>
                  ) : null}
                  <div className="p-4">
                    <h3 className="mt-1 line-clamp-2 font-display text-base font-bold text-[var(--brand-ink)] group-hover:text-[var(--brand-red)]">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Footer />
    </div>
  )
}
