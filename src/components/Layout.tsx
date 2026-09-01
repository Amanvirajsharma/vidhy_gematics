import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Seo } from './Seo'
import { ChatWidgets } from './ChatWidgets'
import { LogoTicker } from './LogoTicker'
import { SmoothScroll } from './SmoothScroll'

export function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <Seo />
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
