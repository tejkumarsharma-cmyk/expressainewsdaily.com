import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
  plain = false,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  plain?: boolean
}) {
  return (
    <div className={`min-h-screen ${plain ? 'bg-white' : 'bg-[var(--brand-surface)]'} text-[var(--brand-ink)]`}>
      <NavbarShell />
      <main>
        <section
          className={`border-b ${plain ? 'border-slate-200 bg-white' : 'border-slate-200/80'}`}
          style={
            plain
              ? undefined
              : {
                  background: 'linear-gradient(120deg, #eef4fb 0%, #f8fbff 50%, #edf3fb 100%)',
                }
          }
        >
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-sm text-[var(--brand-muted)] sm:text-base">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
