import { PageBanner } from '../components/PageBanner'
import { Clients } from '../components/Clients'
import { clientsHeading } from '../data/content'

export function ClientsPage() {
  return (
    <>
      <PageBanner
        label="Clients"
        title={clientsHeading}
        lead="Our Recent Clients — trusted by industry leaders across infrastructure and energy."
      />
      <Clients />
    </>
  )
}
