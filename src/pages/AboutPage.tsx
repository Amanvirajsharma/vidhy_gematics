import { PageBanner } from '../components/PageBanner'
import { About } from '../components/About'
import { CtaBand } from '../components/CtaBand'
import { site } from '../data/content'

export function AboutPage() {
  return (
    <>
      <PageBanner
        label="About Us"
        title="About Us"
        lead={`“${site.trustedLine}” Established in ${site.established}, serving clients across India.`}
      />
      <About />
      <CtaBand />
    </>
  )
}
