import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const OurTeamPage = lazy(() =>
  import('./pages/OurTeamPage').then((m) => ({ default: m.OurTeamPage })),
)
const WhyChooseUsPage = lazy(() =>
  import('./pages/WhyChooseUsPage').then((m) => ({ default: m.WhyChooseUsPage })),
)
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
)
const ClientsPage = lazy(() =>
  import('./pages/ClientsPage').then((m) => ({ default: m.ClientsPage })),
)
const QuotationPage = lazy(() =>
  import('./pages/QuotationPage').then((m) => ({ default: m.QuotationPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function RouteFallback() {
  return <div className="route-fallback" role="status" aria-label="Loading page" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="our-company" element={<Navigate to="/about" replace />} />
            <Route path="our-team" element={<OurTeamPage />} />
            <Route path="why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="equipment" element={<Navigate to="/services" replace />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="rental" element={<Navigate to="/services" replace />} />
            <Route path="quotation" element={<QuotationPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
