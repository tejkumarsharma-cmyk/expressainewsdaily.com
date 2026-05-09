import Link from 'next/link'
import { Search, SlidersHorizontal } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPostUrl, fetchTaskPosts } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG, getTaskConfig } from '@/lib/site-config'
import { Button } from '@/components/ui/button'
import { taskPageMetadata as taskPageSeo } from '@/config/site.content'
import { cn } from '@/lib/utils'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function cnPill(active: boolean) {
  return cn(
    'rounded-full border px-3 py-1.5 text-xs font-semibold [transition:background_0.2s,border_0.2s]',
    active
      ? 'border-[var(--brand-red)] bg-slate-100 text-[var(--brand-red)]'
      : 'border-slate-300/80 bg-white text-[var(--brand-muted)] hover:border-slate-400',
  )
}

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Open the full release for details, quotes, and context.'
  return value.length > 200 ? value.slice(0, 197).trimEnd() + '…' : value
}

function getPostImage(post: SitePost) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    post?.content && typeof post.content === 'object' && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images: string[] }).images.find((url) => typeof url === 'string' && url)
      : null
  return mediaUrl || contentImage || '/placeholder.svg?height=600&width=900'
}

function getLabel(post: SitePost) {
  if (post.content && typeof post.content === 'object') {
    const c = (post.content as { category?: string }).category
    if (typeof c === 'string' && c.trim()) return c.trim()
  }
  return 'Press'
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts(task, 40, { fresh: true })
  const activeSlug = category ? normalizeCategory(category) : ''
  const filtered = !activeSlug
    ? posts
    : posts.filter((p) => {
        const c = p.content && typeof p.content === 'object' ? (p.content as { category?: string }).category : ''
        if (typeof c !== 'string') return false
        return normalizeCategory(c) === activeSlug
      })
  const taskConfig = getTaskConfig(task)
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const listUrl = `${baseUrl}${taskConfig?.route || '/updates'}`
  const titleAndDesc = taskPageSeo.mediaDistribution

  return (
    <div className="min-h-screen bg-white text-[var(--brand-ink)]">
      <NavbarShell />
      <SchemaJsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${titleAndDesc.title} | ${SITE_CONFIG.name}`,
          url: listUrl,
          hasPart: filtered.slice(0, 12).map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${listUrl.replace(/\/$/, '')}/${post.slug}`,
            name: post.title,
          })),
        }}
      />
      <main>
        <section className="border-b border-slate-200/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Wire</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">{titleAndDesc.title}</h1>
            <p className="mt-3 max-w-2xl text-[var(--brand-muted)]">{titleAndDesc.description}</p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end"
              action="/search"
              method="get"
            >
              <input type="hidden" name="master" value="1" />
              <div className="flex flex-1 items-center gap-2 rounded-2xl border border-slate-300/90 bg-white px-4 py-2 shadow-sm">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  name="q"
                  className="h-11 w-full min-w-0 border-0 bg-transparent text-sm outline-none placeholder:text-slate-500/70"
                  placeholder="Search titles, companies, and subjects…"
                  aria-label="Search releases"
                />
              </div>
              <Button
                type="submit"
                className="h-12 rounded-2xl bg-[var(--brand-red)] font-semibold text-white hover:bg-[#7a0214]"
              >
                Search
              </Button>
            </form>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Category
            </span>
            <Link
              href={taskConfig?.route || '/updates'}
              className={cnPill(!activeSlug)}
            >
              All
            </Link>
            {CATEGORY_OPTIONS.slice(0, 12).map((opt) => (
              <Link
                key={opt.slug}
                href={`${taskConfig?.route || '/updates'}?category=${opt.slug}`}
                className={cnPill(activeSlug === opt.slug)}
              >
                {opt.name}
              </Link>
            ))}
            <span className="w-full pl-0 text-sm text-[var(--brand-muted)] sm:w-auto sm:pl-2">
              Tip: use search to match keywords across the full index.
            </span>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [perspective:800px]">
            {filtered.map((post) => (
              <li key={post.id}>
                <Link
                  href={buildPostUrl(task, post.slug)}
                  className="group block h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm [transition:transform_0.2s_var(--motion-ease),box-shadow_0.2s] hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-300/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ContentImage
                      src={getPostImage(post)}
                      alt=""
                      fill
                      className="object-cover [transition:transform_0.45s_var(--motion-ease)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--brand-red)] shadow">
                        {getLabel(post)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="mt-2 line-clamp-2 font-display text-lg font-bold leading-snug text-[var(--brand-ink)] [transition:color_0.2s] group-hover:text-[var(--brand-red)]">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-[var(--brand-muted)]">{excerpt(post.summary)}</p>
                    <p className="mt-3 inline-flex items-center text-sm font-semibold text-[var(--brand-orange)]">
                      Read release
                      <span className="ml-1 [transition:transform_0.2s] group-hover:translate-x-0.5">→</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {filtered.length === 0 && (
            <p className="mt-4 rounded-2xl border border-dashed border-slate-300/90 bg-slate-100/70 p-8 text-center text-[var(--brand-muted)]">
              No items match that filter.{' '}
              <Link href={taskConfig?.route || '/updates'} className="font-semibold text-[var(--brand-red)]">
                View all
              </Link>
              , or use{' '}
              <Link className="font-semibold text-[var(--brand-red)]" href="/search">
                search
              </Link>
              .
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}