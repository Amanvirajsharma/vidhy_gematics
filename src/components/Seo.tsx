import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/content'
import { initAnalytics, trackPageView } from '../lib/analytics'

const siteUrl = (import.meta.env.VITE_SITE_URL?.trim() || 'https://www.vidyageomatics.com').replace(
  /\/$/,
  '',
)

type PageMeta = {
  title: string
  description: string
}

const pages: Record<string, PageMeta> = {
  '/': {
    title: `${site.name} | Land Survey, Drone Mapping & 3D Laser Scanning`,
    description:
      'Survey engineering company in Bhopal, India. Land surveying, 3D laser scanning, as-built surveys, drone mapping, tunnel and track surveying for infrastructure and construction projects.',
  },
  '/about': {
    title: `About Us | ${site.name}`,
    description: `${site.name} is a survey engineering company established in ${site.established}, delivering land survey, mobile mapping, drone mapping and laser scanning across India.`,
  },
  '/our-team': {
    title: `Our Team | ${site.name}`,
    description:
      'Full-time professional survey teams for land surveying, 3D laser scanning, as-built surveys, drone mapping, tunnel and track surveying.',
  },
  '/why-choose-us': {
    title: `Why Choose Us | ${site.name}`,
    description:
      'International standard survey engineering, six years of project experience, and trusted delivery for government bodies, consultants and construction companies in India.',
  },
  '/services': {
    title: `Survey Services | ${site.name}`,
    description:
      'Engineering (Designing, BIM, GIS), survey engineering, construction support and geotechnical investigation for infrastructure and development projects.',
  },
  '/clients': {
    title: `Clients | ${site.name}`,
    description:
      'Trusted by leading infrastructure, energy and construction organisations across India for precision survey engineering.',
  },
  '/quotation': {
    title: `Request a Quotation | ${site.name}`,
    description:
      'Share your project details and get a survey engineering quotation from Vidya Geomatics Solution within one business day.',
  },
  '/contact': {
    title: `Contact Us | ${site.name}`,
    description: `Contact ${site.name} in ${site.address.city}. Call ${site.phones[0].display} or email ${site.email} for survey enquiries.`,
  },
  '/projects': {
    title: `Projects | ${site.name}`,
    description:
      'Survey engineering projects delivered across infrastructure, railways, energy and industrial sectors in India.',
  },
}

const fallback: PageMeta = {
  title: site.name,
  description: site.metaDescription,
}

export function Seo() {
  const { pathname } = useLocation()
  const meta = pages[pathname] ?? fallback
  const canonical = `${siteUrl}${pathname === '/' ? '' : pathname}`
  const ogImage = `${siteUrl}/logo-brand.png`

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackPageView(pathname, meta.title)
  }, [pathname, meta.title])

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}
