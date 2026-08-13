import { PageBanner } from '../components/PageBanner'
import { Equipment } from '../components/Equipment'
import { rental } from '../data/content'

export function RentalPage() {
  return (
    <>
      <PageBanner
        label="Equipment rental"
        title={rental.title}
        lead={rental.equipmentLine}
      />
      <Equipment />
    </>
  )
}
