import { Link } from 'react-router-dom'
import { companyProfilePdf, site } from '../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="/logo-brand.png" alt="" className="logo-mark-img" />
              <div className="logo-text">
                Vidya Geomatics
                <span>Survey Engineering</span>
              </div>
            </Link>
            <p>
              “{site.tagline}”
              <br />
              {site.trustedLine}.
            </p>
          </div>

          <div className="footer-col">
            <h4>About Us</h4>
            <Link to="/about">About Us</Link>
            <Link to="/our-team">Our Team</Link>
            <Link to="/why-choose-us">Why Choose Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/clients">Clients</Link>
            <Link to="/quotation">Quotation</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {site.phones.map((p) => (
              <a key={p.tel} href={`tel:${p.tel}`}>
                {p.display}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Address</h4>
            <p>
              {site.address.line1}
              <br />
              {site.address.pin}
              <br />
              {site.address.city}
            </p>
            <a href={companyProfilePdf} download className="footer-profile-link">
              Download company profile (PDF)
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © All Copyright {new Date().getFullYear()}{' '}
            <strong>{site.legalName}</strong>
          </p>
          <p>
            <a href="https://www.vidyageomatics.com/" target="_blank" rel="noreferrer">
              vidyageomatics.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
