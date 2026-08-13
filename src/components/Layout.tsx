import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { DocumentTitle } from './DocumentTitle'
import { ChatWidgets } from './ChatWidgets'
import { LogoTicker } from './LogoTicker'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <DocumentTitle />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <LogoTicker />
      <Footer />
      <ChatWidgets />
    </>
  )
}
