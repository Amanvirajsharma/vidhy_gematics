import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { OurTeamPage } from './pages/OurTeamPage'
import { WhyChooseUsPage } from './pages/WhyChooseUsPage'
import { ServicesPage } from './pages/ServicesPage'
import { ClientsPage } from './pages/ClientsPage'
import { RentalPage } from './pages/RentalPage'
import { QuotationPage } from './pages/QuotationPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="our-company" element={<Navigate to="/about" replace />} />
          <Route path="our-team" element={<OurTeamPage />} />
          <Route path="why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="rental" element={<RentalPage />} />
          <Route path="quotation" element={<QuotationPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
