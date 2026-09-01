import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { serviceCategories, site } from '../data/content'

type Role = 'bot' | 'user'

type ChatLink = {
  label: string
  href: string
  external?: boolean
}

type Message = {
  id: string
  role: Role
  text: string
  links?: ChatLink[]
  typing?: boolean
}

const quickOptions = [
  { id: 'services', label: 'Our services' },
  { id: 'contact', label: 'Contact us' },
  { id: 'address', label: 'Office address' },
  { id: 'whatsapp', label: 'Chat on WhatsApp' },
  { id: 'about', label: 'About company' },
] as const

function whatsappUrl(message = site.whatsappMessage) {
  const base = `https://wa.me/${site.whatsappNumber}`
  return `${base}?text=${encodeURIComponent(message)}`
}

function replyFor(input: string, optionId?: string): Message {
  const q = input.trim().toLowerCase()
  const id = `bot-${Date.now()}`

  if (
    optionId === 'services' ||
    /service|survey|drone|lidar|laser|mapping|tunnel|track|gis/.test(q)
  ) {
    return {
      id,
      role: 'bot',
      text: `We provide:\n\n${serviceCategories
        .map((c) => `• ${c.title}`)
        .join('\n')}\n\nEstablished in ${site.established}, we deliver engineering and survey solutions across India.`,
      links: [{ label: 'View all services', href: '/services' }],
    }
  }

  if (
    optionId === 'contact' ||
    /contact|email|phone|call|reach|enquir|quote|quotation/.test(q)
  ) {
    return {
      id,
      role: 'bot',
      text: `Reach us anytime:\n\n📧 ${site.email}\n📞 ${site.phones
        .map((p) => p.display)
        .join(' / ')}\n\nWorking hours: ${site.hours.days}, ${site.hours.time} IST`,
      links: [
        { label: 'Contact page', href: '/contact' },
        { label: 'Request quotation', href: '/quotation' },
        { label: 'WhatsApp', href: whatsappUrl(), external: true },
      ],
    }
  }

  if (optionId === 'address' || /address|location|office|bhopal|map|where/.test(q)) {
    return {
      id,
      role: 'bot',
      text: `Our office:\n\n📍 ${site.address.line1}\n${site.address.pin}\n${site.address.city}, ${site.address.country}`,
      links: [
        {
          label: 'Open in Google Maps',
          href: `https://maps.google.com/?q=${encodeURIComponent(
            `${site.address.line1}, ${site.address.city}, ${site.address.pin}`,
          )}`,
          external: true,
        },
        { label: 'Contact us', href: '/contact' },
      ],
    }
  }

  if (optionId === 'whatsapp' || /whatsapp|wa\b/.test(q)) {
    return {
      id,
      role: 'bot',
      text: 'Tap below to start a WhatsApp chat with our team. We typically respond during business hours.',
      links: [{ label: 'Open WhatsApp', href: whatsappUrl(), external: true }],
    }
  }

  if (
    optionId === 'about' ||
    /about|company|who|mission|vision|history|vidya/.test(q)
  ) {
    return {
      id,
      role: 'bot',
      text: `${site.name} is a pioneering survey engineering company in India (est. ${site.established}). We specialise in land survey, mobile mapping, drone mapping and laser scanning.\n\n“${site.trustedLine}”`,
      links: [
        { label: 'About us', href: '/about' },
        { label: 'Why choose us', href: '/why-choose-us' },
        { label: 'Our team', href: '/our-team' },
      ],
    }
  }

  if (/team|staff|people|crew/.test(q)) {
    return {
      id,
      role: 'bot',
      text: 'Vidya Geomatics employs dedicated full-time professional staff across land survey, laser scanning, drone mapping, tunnel and track surveying.',
      links: [{ label: 'Our team', href: '/our-team' }],
    }
  }

  if (/rental|equipment|hire|manpower/.test(q)) {
    return {
      id,
      role: 'bot',
      text: `We deliver survey engineering with our own full-time crews and instruments — land survey, laser scanning, drone mapping, tunnel and track work.\n\nTell us your project and we will share a quotation.`,
      links: [
        { label: 'View services', href: '/services' },
        { label: 'Get quotation', href: '/quotation' },
      ],
    }
  }

  if (/client|partner|brand/.test(q)) {
    return {
      id,
      role: 'bot',
      text: 'We partner with industry leaders across infrastructure, energy and construction. Visit our clients page to see recent partners.',
      links: [{ label: 'Our clients', href: '/clients' }],
    }
  }

  return {
    id,
    role: 'bot',
    text: `I can help with services, contact details, office address, or WhatsApp. Pick a quick option below or ask another question.`,
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  }
}

const welcome: Message = {
  id: 'welcome',
  role: 'bot',
  text: `Namaste! I'm the ${site.shortName} assistant. Ask about our services, contact details, or office — or pick a quick option below.`,
}

function MessageBubble({ msg }: { msg: Message }) {
  return (
    <div className={`chat-row ${msg.role === 'user' ? 'is-user' : 'is-bot'}`}>
      {msg.role === 'bot' ? (
        <img src="/logo-brand.png" alt="" className="chat-avatar" />
      ) : null}
      <div className={`chat-bubble ${msg.role === 'user' ? 'is-user' : 'is-bot'}`}>
        <p>
          {msg.text}
          {msg.typing ? <span className="chat-caret" aria-hidden /> : null}
        </p>
        {msg.links && msg.links.length > 0 && !msg.typing ? (
          <div className="chat-bubble-links">
            {msg.links.map((link) =>
              link.external ? (
                <a key={link.href + link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link key={link.href + link.label} to={link.href}>
                  {link.label}
                </Link>
              ),
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ThinkingBubble() {
  return (
    <div className="chat-row is-bot">
      <img src="/logo-brand.png" alt="" className="chat-avatar" />
      <div className="chat-bubble is-bot chat-thinking" aria-live="polite" aria-label="Assistant is typing">
        <span className="chat-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
    </div>
  )
}

export function ChatWidgets() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([welcome])
  const [thinking, setThinking] = useState(false)
  const [busy, setBusy] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    for (const id of timers.current) window.clearTimeout(id)
    timers.current = []
  }

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timers.current.push(id)
    return id
  }

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    if (!open) return
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking, open])

  const send = (text: string, optionId?: string) => {
    if (busy) return

    const label =
      optionId != null ? quickOptions.find((o) => o.id === optionId)?.label ?? text : text
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: label,
    }
    const botMsg = replyFor(text, optionId)

    setBusy(true)
    setThinking(true)
    setMessages((prev) => [...prev, userMsg])

    later(() => {
      setThinking(false)
      setMessages((prev) => [...prev, { ...botMsg, text: '', links: undefined, typing: true }])

      const full = botMsg.text
      const chunk = full.length > 220 ? 4 : full.length > 90 ? 3 : 2
      let i = 0

      const tick = () => {
        i = Math.min(full.length, i + chunk)
        setMessages((prev) =>
          prev.map((msg) => (msg.id === botMsg.id ? { ...msg, text: full.slice(0, i) } : msg)),
        )

        if (i < full.length) {
          later(tick, 16)
          return
        }

        later(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMsg.id ? { ...botMsg, typing: false } : msg,
            ),
          )
          setBusy(false)
        }, 80)
      }

      later(tick, 30)
    }, 650)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = input.trim()
    if (!value || busy) return
    setInput('')
    send(value)
  }

  return (
    <>
      <motion.a
        href={whatsappUrl()}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab whatsapp-fab-safe"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="whatsapp-fab-ping" aria-hidden />
        <span className="whatsapp-fab-icon">
          <svg viewBox="0 0 24 24" aria-hidden className="whatsapp-fab-svg">
            <path
              fill="currentColor"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
        </span>
        <span className="whatsapp-fab-label">WhatsApp</span>
      </motion.a>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="chatbot-panel"
            role="dialog"
            aria-label={`${site.shortName} help chat`}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="chatbot-header">
              <img src="/logo-brand.png" alt="" className="chatbot-logo" />
              <div className="chatbot-header-text">
                <p>Vidya Assistant</p>
                <span>Quick help · Survey engineering</span>
                <strong className="chatbot-status">
                  <span aria-hidden className="chatbot-status-dot" />
                  Online now
                </strong>
              </div>
              <button
                type="button"
                className="chatbot-close"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className="chatbot-messages" ref={listRef}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {thinking ? <ThinkingBubble /> : null}
            </div>

            <div className="chatbot-footer">
              <div className="chatbot-quick">
                {quickOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={busy}
                    onClick={() => send('', opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <form className="chatbot-form" onSubmit={onSubmit}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, quotation, contact..."
                  aria-label="Chat message"
                  disabled={busy}
                />
                <button type="submit" disabled={busy || !input.trim()} aria-label="Send message">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <path
                      d="M4 12h14M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`chatbot-fab ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Close help chat' : 'Open help chat'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.942L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              fill="currentColor"
            />
          </svg>
        )}
      </motion.button>
    </>
  )
}
