import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/content'

const titles: Record<string, string> = {
  '/': `${site.name} | ${site.metaDescription}`,
  '/about': `About Us | ${site.name}`,
  '/our-team': `Our Team | ${site.name}`,
  '/why-choose-us': `Why Choose Us | ${site.name}`,
  '/services': `Services | ${site.name}`,
  '/clients': `Clients | ${site.name}`,
  '/rental': `Rental Services | ${site.name}`,
  '/quotation': `Request Quotation | ${site.name}`,
  '/contact': `Contact Us | ${site.name}`,
}

export function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] ?? `${site.name}`
  }, [pathname])

  return null
}
