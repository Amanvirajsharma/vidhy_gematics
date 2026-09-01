const gaId = import.meta.env.VITE_GA_ID?.trim()

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loaded = false

export function initAnalytics() {
  if (!gaId || loaded || typeof document === 'undefined') return
  loaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', gaId, { send_page_view: false })
}

export function trackPageView(path: string, title: string) {
  if (!gaId) return
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  })
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!gaId) return
  window.gtag?.('event', name, params)
}
