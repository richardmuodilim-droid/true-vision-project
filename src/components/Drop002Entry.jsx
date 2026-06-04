import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { mono, serif, inter, ease } from '../lib/design'

const COLOURWAYS = [
  { name: 'Purple / Black',   code: 'TVP-002-PB', accent: '#7B2FBE', bg: 'linear-gradient(160deg, #0e0c14 0%, #2d1054 100%)' },
  { name: 'Light Blue / Grey',code: 'TVP-002-LG', accent: '#7DD3DA', bg: 'linear-gradient(160deg, #141616 0%, #1e3535 100%)' },
  { name: 'Pink / Black',     code: 'TVP-002-PK', accent: '#EC008C', bg: 'linear-gradient(160deg, #0e0b0d 0%, #3d0a2a 100%)' },
]

const REVEAL_DATE = new Date('2026-08-01T12:00:00+01:00')

function getTimeLeft() {
  const diff = REVEAL_DATE - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 }
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
    secs:  Math.floor((diff % 60000) / 1000),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

function formatTag(name) {
  if (!name) return 'TVP002_MEMBER'
  return name.trim().toUpperCase().replace(/\s+/g, '_') + '_TVP002'
}

function getFirstName(name) {
  if (!name) return 'MEMBER'
  return name.trim().split(/\s+/)[0].toUpperCase()
}

export default function Drop002Entry({ name, onExit }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const [flickering, setFlickering] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  const handleExit = () => {
    setFlickering(true)
    setTimeout(() => { onExit?.() }, 380)
  }

  return (
    <motion.div
      className={`relative min-h-[100dvh] w-full bg-[#F5F3EE] flex flex-col${flickering ? ' vault-glitch' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="grain" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.05) 100%)' }} />

      {/* Status bar */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 h-[26px] bg-[#F5F3EE]"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        aria-hidden="true"
      >
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.2em' }}>
          [ TRUE VISION PROJECT ]
        </span>
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.2em' }} className="hidden sm:block">
          [ {formatTag(name)} ]
        </span>
        <span className="flex items-center gap-2" style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.18em' }}>
          [ DROP 002:&nbsp;<span style={{ color: '#888' }}>REGISTERED</span>&nbsp;]
          <span className="status-dot" aria-hidden="true" />
        </span>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 shrink-0 flex items-center justify-between px-6 sm:px-12 pt-7 mt-8"
      >
        <img src="/logo.svg" alt="True Vision Project" width="80" height="80"
          className="w-14 h-14 object-contain select-none"
          style={{ filter: 'invert(1)' }} draggable="false" />
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.2em' }}>
          WAITLIST // DROP_002
        </p>
      </motion.header>

      {/* Welcome */}
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 text-center uppercase px-4 mt-2"
        style={{ ...mono, fontSize: 'clamp(10px, 2.2vw, 12px)', letterSpacing: '0.14em', color: '#111111' }}
      >
        YOU'RE ON THE LIST, {getFirstName(name)}. YOU GO FIRST.
      </motion.p>

      {/* Main grid */}
      <main className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 px-4 sm:px-12 pt-8 pb-6">

        {/* Left — colourways */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="flex flex-col gap-4 md:pr-10 mb-8 md:mb-0"
        >
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="mb-1 uppercase">
            Drop 002 — Colourways
          </p>

          <div className="flex flex-col gap-2">
            {COLOURWAYS.map((c, i) => (
              <motion.div
                key={c.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.5 + i * 0.1, ease }}
                className="relative overflow-hidden flex items-center justify-between px-5 py-4"
                style={{ background: c.bg, border: `1px solid ${c.accent}22` }}
              >
                <div>
                  <p style={{ ...mono, fontSize: '7px', color: c.accent, letterSpacing: '0.38em', opacity: 0.7 }} className="uppercase mb-1">
                    {c.code}
                  </p>
                  <p style={{ ...serif, fontSize: '18px', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.1 }}>
                    {c.name}
                  </p>
                </div>
                <div className="w-5 h-5 rounded-full shrink-0" style={{ background: c.accent, opacity: 0.8, boxShadow: `0 0 12px ${c.accent}55` }} />
              </motion.div>
            ))}
          </div>

          {/* Spec line */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-x-8 gap-y-3 mt-2"
          >
            {[['€70', 'Full Set'], ['S / M / L', 'Sizes'], ['Hidden Pocket', 'Feature'], ['Limited Run', 'Edition']].map(([v, l]) => (
              <div key={l}>
                <p style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.70)', letterSpacing: '0.06em' }}>{v}</p>
                <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.28em' }} className="uppercase">{l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — manifest */}
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="flex flex-col justify-between md:pl-10 md:border-l"
          style={{ borderColor: 'rgba(0,0,0,0.06)' }}
        >
          <div>
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="mb-6 uppercase">
              Access Status
            </p>

            {[
              { key: 'MEMBER TAG',    value: formatTag(name) },
              { key: 'WAITLIST',      value: 'CONFIRMED' },
              { key: 'ACCESS TIER',   value: 'PRIORITY — 48H EARLY' },
              { key: 'NEXT DROP',     value: 'DROP 002 — AUGUST 2026' },
              { key: 'PRODUCT',       value: 'THE TRACKSUIT' },
            ].map(({ key, value }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.07 }}
                className="flex items-start py-4 gap-4"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
              >
                <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.25em', minWidth: '140px' }}>
                  [ {key} ]
                </span>
                <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.72)', letterSpacing: '0.06em' }}>
                  {value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8"
          >
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.4em' }} className="uppercase mb-4">
              Countdown to Drop 002
            </p>
            <div className="flex items-start gap-4">
              {[
                { v: pad(timeLeft.days),  l: 'Days' },
                { v: pad(timeLeft.hours), l: 'Hours' },
                { v: pad(timeLeft.mins),  l: 'Mins' },
                { v: pad(timeLeft.secs),  l: 'Secs' },
              ].map(({ v, l }) => (
                <div key={l} className="flex flex-col items-center gap-1">
                  <div className="flex items-center justify-center w-14 h-12"
                    style={{ border: '1px solid rgba(0,0,0,0.10)', background: 'rgba(0,0,0,0.02)' }}>
                    <span style={{ ...mono, fontSize: '18px', color: '#111111', letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
                      {v}
                    </span>
                  </div>
                  <span style={{ ...mono, fontSize: '6px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.32em' }} className="uppercase">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Manifesto */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3, ease }}
        className="relative z-10 flex flex-col items-center text-center px-6 py-10 sm:py-14"
        style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
      >
        <p style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(18px, 3.5vw, 26px)', color: 'rgba(0,0,0,0.65)', lineHeight: 1.55, maxWidth: '520px' }}>
          "Built from nothing.<br />Worn by those who understand."
        </p>
        <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.35em' }} className="uppercase mt-5">
          True Vision Project — Est. 2026
        </p>
      </motion.section>

      {/* Live feed */}
      <div className="relative z-10 w-full overflow-hidden py-2" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} aria-hidden="true">
        <div className="marquee-track" style={{ opacity: 0.30 }}>
          {[0, 1].map(i => (
            <span key={i} style={{ ...mono, fontSize: '9px', color: '#111111', letterSpacing: '0.2em', whiteSpace: 'nowrap', paddingRight: '4rem' }}>
              [ CONNECTION_SECURE ] &nbsp;...&nbsp; [ DROP_002_INCOMING ] &nbsp;...&nbsp; [ AUGUST_2026 ] &nbsp;...&nbsp; [ PURPLE_BLACK / LIGHT_BLUE / PINK ] &nbsp;...&nbsp; [ MEMBERS_GO_FIRST ] &nbsp;...&nbsp; [ BUILT_FROM_NOTHING ] &nbsp;...&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="relative z-10 shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-12 py-4 sm:py-6"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="flex items-center gap-5">
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.2em' }}>[SESSION: ACTIVE]</p>
          <a href="https://www.tiktok.com/@truevisionproject" target="_blank" rel="noopener noreferrer"
            aria-label="TikTok" style={{ color: 'rgba(0,0,0,0.25)' }}
            className="hover:opacity-60 transition-opacity duration-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/truevisionproject/" target="_blank" rel="noopener noreferrer"
            aria-label="Instagram" style={{ color: 'rgba(0,0,0,0.25)' }}
            className="hover:opacity-60 transition-opacity duration-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button onClick={handleExit}
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.28)' }}
            className="uppercase cursor-pointer hover:opacity-50 transition-opacity duration-300 min-h-[44px] flex items-center">
            [ not you? ]
          </button>
          <Link to="/our-story"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', borderColor: 'rgba(0,0,0,0.10)' }}
            className="hidden sm:flex flex-none uppercase border px-5 min-h-[44px] items-center justify-center hover:border-black/25 hover:text-black/65 transition-all duration-300">
            [ OUR STORY ]
          </Link>
          <Link to="/"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', borderColor: 'rgba(0,0,0,0.10)' }}
            className="flex-1 sm:flex-none uppercase border px-5 min-h-[44px] flex items-center justify-center hover:border-black/25 hover:text-black/65 transition-all duration-300">
            [ TRUE VISION PROJECT ]
          </Link>
        </div>
      </motion.footer>
    </motion.div>
  )
}
