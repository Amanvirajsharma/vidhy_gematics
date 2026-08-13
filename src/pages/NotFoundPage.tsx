import { Link } from 'react-router-dom'
import { PageBanner } from '../components/PageBanner'
import { FadeIn } from '../components/FadeIn'

export function NotFoundPage() {
  return (
    <>
      <PageBanner
        label="Error 404"
        title="Page not found"
        lead="The page you are looking for does not exist or has been moved."
      />
      <section className="section">
        <div className="container">
          <FadeIn>
            <div className="not-found-actions">
              <Link to="/" className="btn btn-ink">
                Back to home
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
