import type { Metadata } from 'next'
import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { siteIdentity } from '@/config/site.identity'
import { Target, LineChart, Shield } from 'lucide-react'

const pillars = [
  {
    title: 'Editorial-first story surfaces',
    body: 'Releases are presented the way media expects: a strong headline, dateline context, a crisp body, and room for the details that make coverage easier.',
    icon: LineChart,
  },
  {
    title: 'Operational clarity for teams',
    body: 'Your desk gets repeatable workflow from draft to publish, without turning the site into a product-template clone.',
    icon: Target,
  },
  {
    title: 'Trust, without gimmicks',
    body: 'Citations, index visibility, and archive design are built for stakeholders who re-read the wire months later.',
    icon: Shield,
  },
] as const

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About | ${siteIdentity.name}`,
    description: `What ${siteIdentity.name} is building: a newswire-style press distribution desk with a premium reader experience—not a recolored CMS skin.`,
  })
}

export default function AboutPage() {
  return (
    <PageShell
      title="About the distribution desk"
      description={`${SITE_CONFIG.name} is a media-facing press service focused on scannable archives, high-trust story pages, and a calm operational rhythm for in-house comms teams.`}
      plain
      actions={
        <>
          <Button variant="outline" asChild className="border-rose-200/80 bg-rose-50/40 text-[var(--brand-ink)]">
            <Link href="/press">Press resources</Link>
          </Button>
          <Button asChild className="bg-[var(--brand-red)] font-semibold text-white hover:bg-[#7a0214]">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-10">
        <Card className="overflow-hidden border-rose-200/70 bg-gradient-to-br from-rose-50/80 to-white shadow-sm">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-400/90">Why we exist</p>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Press distribution is not a blog category—it is a publishing discipline.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              {siteIdentity.name} is tuned for the moments when your organization needs a single canonical story on the
              public record: product launches, leadership moves, M&A, regional expansions, and the steady drumbeat of
              company news that keeps analysts and customers aligned.
            </p>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              The stack underneath stays compatible with a shared publishing platform, while the design language on this
              site is built to feel like a stand-alone media product—on purpose. That is how we keep it from looking like
              a renamed clone of every other site that shares the same code generation path.
            </p>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <Card
              key={p.title}
              className="border-rose-200/60 [transition:transform_0.2s_var(--motion-ease),box-shadow_0.2s] hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="p-6">
                <p.icon className="h-5 w-5 text-[var(--brand-orange)]" />
                <h3 className="mt-3 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </PageShell>
  )
}
