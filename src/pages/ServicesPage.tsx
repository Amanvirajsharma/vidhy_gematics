import { PageBanner } from '../components/PageBanner'
import { Services } from '../components/Services'
import { CtaBand } from '../components/CtaBand'

export function ServicesPage() {
  return (
    <>
      <PageBanner
        label="Services"
        title="Want to see what services we provide?"
        lead="View for details — land survey, laser scanning, as-built, drone mapping, geotechnical, tunnel and track surveying."
      />
      <Services />
      <CtaBand />
    </>
  )
}
