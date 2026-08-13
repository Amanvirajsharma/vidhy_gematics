import { clients } from '../data/content'

export function LogoTicker() {
  const loop = [...clients, ...clients]

  return (
    <section className="logo-ticker" aria-label="Trusted by Past & Present Clients">
      <p className="logo-ticker-label">
        Trusted by
        <strong>Past & Present Clients</strong>
      </p>
      <div className="logo-ticker-viewport">
        <div className="logo-ticker-track">
          {loop.map((c, i) => (
            <div className="logo-ticker-item" key={`${c.name}-${i}`} title={c.name}>
              <img src={c.logo} alt={c.name} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
