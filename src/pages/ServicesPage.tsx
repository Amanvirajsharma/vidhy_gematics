import { PageBanner } from '../components/PageBanner'
import { Services } from '../components/Services'
import { CtaBand } from '../components/CtaBand'

export function ServicesPage() {
  return (
    <>
      <PageBanner
        label="Services"
        title="Want to see what services we provide?"
        lead="Engineering, survey engineering, construction support and geotechnical investigation — delivered with international-standard accuracy."
      />
      <Services />
      <CtaBand />
    </>
  )
}
