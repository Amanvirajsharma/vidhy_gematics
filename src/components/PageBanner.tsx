import type { ReactNode } from 'react'
import { FadeIn } from './FadeIn'

type PageBannerProps = {
  label: string
  title: string
  lead?: string
  children?: ReactNode
}

export function PageBanner({ label, title, lead, children }: PageBannerProps) {
  return (
    <section className="page-banner">
      <div className="page-banner-bg" aria-hidden />
      <div className="container page-banner-inner">
        <FadeIn>
          <span className="page-banner-accent" aria-hidden />
          <p className="section-label">{label}</p>
          <h1 className="page-banner-title">{title}</h1>
          {lead ? <p className="page-banner-lead">{lead}</p> : null}
          {children}
        </FadeIn>
      </div>
    </section>
  )
}
