import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { aboutNav, site } from '../data/content'

type NavItem = {
  to: string
  label: string
  end?: boolean
  children?: { to: string; label: string }[]
}

const links: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us', children: aboutNav },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/clients', label: 'Clients' },
  { to: '/contact', label: 'Contact' },
]

const childPaths = (link: NavItem) => [link.to, ...(link.children ?? []).map((c) => c.to)]

export function Navbar() {
  const { pathname } = useLocation()
  const panelId = useId()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    setOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }

    // Flip to the light navbar only once the light half of the hero bridge sits
    // behind it, so the bar never reads as white-on-dark mid-transition.
    let threshold = 40
    const measure = () => {
      const hero = document.querySelector<HTMLElement>('.hero')
      const bridge = document.querySelector<HTMLElement>('.scroll-bridge')
      const navHeight =
        document.querySelector<HTMLElement>('.nav')?.offsetHeight ?? 82

      threshold = hero
        ? hero.offsetHeight + (bridge?.offsetHeight ?? 0) * 0.6 - navHeight
        : 40
    }

    const onScroll = () => setScrolled(window.scrollY > threshold)
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [isHome])

  useEffect(() => {
    document.body.classList.toggle('nav-locked', open)
    return () => document.body.classList.remove('nav-locked')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setOpenMenu(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

  const mobileMenu =
    typeof document !== 'undefined'
      ? createPortal(
          <div className={`mobile-nav ${open ? 'is-open' : ''}`} aria-hidden={!open}>
            <button
              type="button"
              className="mobile-nav-backdrop"
              aria-label="Close menu"
              tabIndex={open ? 0 : -1}
              onClick={close}
            />
            <nav id={panelId} className="mobile-nav-panel" aria-label="Mobile">
              {links.map((link) =>
                link.children ? (
                  <div key={link.to} className="mobile-nav-group">
                    <NavLink
                      to={link.to}
                      onClick={close}
                      tabIndex={open ? 0 : -1}
                      className={({ isActive }) => (isActive ? 'active' : undefined)}
                    >
                      {link.label}
                    </NavLink>
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={close}
                        tabIndex={open ? 0 : -1}
                        className={({ isActive }) =>
                          `mobile-nav-sub ${isActive ? 'active' : ''}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    className={({ isActive }) => (isActive ? 'active' : undefined)}
                  >
                    {link.label}
                  </NavLink>
                ),
              )}
              <Link
                to="/quotation"
                className="btn btn-primary mobile-nav-cta"
                tabIndex={open ? 0 : -1}
                onClick={close}
              >
                Get quotation
              </Link>
            </nav>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <header
        className={`nav ${!isHome || scrolled || open ? 'is-solid' : 'is-home'} ${open ? 'is-open' : ''}`}
      >
        <div className="nav-inner">
          <Link to="/" className="logo" onClick={close}>
            <img src="/logo-brand.png" alt={`${site.name} logo`} className="logo-mark-img" />
            <div className="logo-text">
              Vidya Geomatics
              <span>Survey Engineering</span>
            </div>
          </Link>

          <nav className="nav-links-desktop" aria-label="Primary">
            {links.map((link) =>
              link.children ? (
                <div
                  key={link.to}
                  className={`nav-drop ${openMenu === link.to ? 'is-open' : ''}`}
                  onMouseEnter={() => setOpenMenu(link.to)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <NavLink
                    to={link.to}
                    className={`nav-drop-btn ${childPaths(link).includes(pathname) ? 'active' : ''}`}
                    onClick={() => setOpenMenu(null)}
                  >
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
                      <path
                        d="M6 9l6 6 6-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </NavLink>
                  {openMenu === link.to ? (
                    <div className="nav-drop-menu">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) => (isActive ? 'active' : undefined)}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <Link to="/quotation" className="btn btn-primary nav-cta">
            Get quotation
          </Link>

          <button
            type="button"
            className={`nav-toggle ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={toggle}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden focusable="false">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  )
}
