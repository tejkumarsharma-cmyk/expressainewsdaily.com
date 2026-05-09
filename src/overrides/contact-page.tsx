import Image from 'next/image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { Button } from '@/components/ui/button'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-white text-[var(--brand-ink)]">
      <NavbarShell />
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">Contact</p>
            <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Get in touch</h1>
            <p className="mt-3 max-w-2xl text-[var(--brand-muted)]">
              Distribution questions, account setup, and editorial routing—send a message and the desk will follow up
              on the right lane.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="order-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_16px_48px_rgba(38,52,80,0.08)] sm:p-8 lg:order-1">
            <h2 className="text-lg font-bold">Message the team</h2>
            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">Name</label>
                  <input
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-300/90 bg-slate-50/50 px-3 text-sm outline-none [transition:box-shadow_0.2s] focus:ring-2 focus:ring-slate-300"
                    placeholder="Your name"
                    type="text"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">Phone</label>
                  <input
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-300/90 bg-slate-50/50 px-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder="Phone (optional)"
                    type="tel"
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">Email</label>
                <input
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-300/90 bg-slate-50/50 px-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="work@domain.com"
                  type="email"
                  autoComplete="email"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">Organization</label>
                  <select
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-300/90 bg-slate-50/50 px-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                    defaultValue="business"
                  >
                    <option value="business">Business / brand</option>
                    <option value="agency">Agency</option>
                    <option value="media">Media / journalist</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">Subject</label>
                  <select
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-300/90 bg-slate-50/50 px-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                    defaultValue="distribution"
                  >
                    <option value="distribution">Press distribution</option>
                    <option value="billing">Plans &amp; billing</option>
                    <option value="technical">Technical / access</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-muted)]">Message</label>
                <textarea
                  className="mt-1.5 min-h-[140px] w-full rounded-xl border border-slate-300/90 bg-slate-50/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="What are you looking to ship—and when do you need it live?"
                />
              </div>
              <p className="text-xs text-[var(--brand-muted)]">
                By continuing, you agree we may use this information to respond. See our <a className="font-medium text-[var(--brand-red)]" href="/privacy">Privacy Policy</a>.
              </p>
              <Button type="button" className="h-12 rounded-xl bg-[var(--brand-red)] font-semibold hover:bg-[#7a0214]">
                Submit
              </Button>
            </form>
          </div>
          <div className="order-1 space-y-4 lg:order-2">
            <div className="overflow-hidden rounded-2xl border border-rose-200/50 shadow-sm">
              <div className="relative aspect-[4/3] w-full sm:aspect-[3/2]">
                <Image
                  src="https://img.freepik.com/free-photo/business-people-shaking-hands-together_53876-30568.jpg?w=1200"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                  {SITE_CONFIG.name} operations · weekly coverage desk
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
