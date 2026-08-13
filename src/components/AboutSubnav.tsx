import { NavLink } from 'react-router-dom'

const slides = [
  { to: '/about', label: 'About Us', end: true },
  { to: '/our-team', label: 'Our Team' },
  { to: '/why-choose-us', label: 'Why Choose Us' },
]

type AboutSubnavProps = {
  className?: string
}

export function AboutSubnav({ className }: AboutSubnavProps) {
  return (
    <div className={`about-slides ${className ?? ''}`.trim()}>
      {slides.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => (isActive ? 'is-active' : undefined)}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}
