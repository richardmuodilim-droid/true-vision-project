import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { mono, serif, inter, ease, reveal } from '../lib/design'
import WaitlistConfirmScreen from '../components/WaitlistConfirmScreen'

const LS_KEY     = 'TrueVisionMember'
const REVEAL_DATE = new Date('2026-08-01T12:00:00+01:00')

const COLOURWAYS = [
  {
    name:    'Purple / Black',
    code:    'TVP-002-PB',
    accent:  '#7B2FBE',
    bg:      'linear-gradient(160deg, #0e0c14 0%, #1a0d2e 60%, #2d1054 100%)',
    border:  'rgba(123,47,190,0.35)',
    img:     '/ts-all-front.png',
    imgPos:  '82% top',
  },
  {
    name:    'Light Blue / Grey',
    code:    'TVP-002-LG',
    accent:  '#7DD3DA',
    bg:      'linear-gradient(160deg, #141616 0%, #1a2626 60%, #1e3535 100%)',
    border:  'rgba(125,211,218,0.30)',
    img:     '/ts-blue.jpg',
    imgPos:  'center top',
  },
  {
    name:    'Pink / Black',
    code:    'TVP-002-PK',
    accent:  '#EC008C',
    bg:      'linear-gradient(160deg, #0e0b0d 0%, #2a0820 60%, #3d0a2a 100%)',
    border:  'rgba(236,0,140,0.32)',
    img:     '/ts-all-front.png',
    imgPos:  '15% top',
  },
]

function loadMember() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function getTimeLeft(target) {
  const diff = target - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, expired: true }
  return {
    days:  Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins:  Math.floor((diff % 3600000) / 60000),
    secs:  Math.floor((diff % 60000) / 1000),
    expired: false,
  }
}

function pad(n) { return String(n).padStart(2, '0') }

export default function Drop002() {
  const [member,      setMember]      = useState(null)
  const [timeLeft,    setTimeLeft]    = useState(getTimeLeft(REVEAL_DATE))
  const [email,       setEmail]       = useState('')
  const [submitted,   setSubmitted]   = useState(false)
  const [submitting,  setSubmitting]  = useState(false)
  const [subError,    setSubError]    = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => { setMember(loadMember()) }, [])

  useEffect(() => {
    if (timeLeft.expired) return
    const t = setInterval(() => setTimeLeft(getTimeLeft(REVEAL_DATE)), 1000)
    return () => clearInterval(t)
  }, [timeLeft.expired])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true); setSubError('')
    try {
      const res  = await fetch('/api/drop002-waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok) { setShowConfirm(true) }
      else { setSubError(data.error || 'Something went wrong.') }
    } catch { setSubError('Connection error. Try again.') }
    setSubmitting(false)
  }

  const firstName = member?.name ? member.name.trim().split(/\s+/)[0] : null

  return (
    <>
    <AnimatePresence>
      {showConfirm && (
        <WaitlistConfirmScreen onComplete={() => { setShowConfirm(false); setSubmitted(true) }} />
      )}
    </AnimatePresence>
    <div className="min-h-screen bg-[#0a0909]">
      <div className="grain" aria-hidden="true" style={{ opacity: 0.6 }} />

      {/* Status bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[22px] flex items-center justify-between px-5 sm:px-10"
        style={{ background: '#0a0909', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        aria-hidden="true"
      >
        <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.38em' }}>
          [ TRUE VISION PROJECT ]
        </span>
        <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.38em' }}>
          [ DROP 002 — CLASSIFIED ]
        </span>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="pt-[22px] min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center relative">

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.60em' }}
          className="uppercase mb-8"
        >
          Drop 002 — August 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          style={{ ...serif, fontSize: 'clamp(52px, 12vw, 96px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.01em' }}
          className="mb-5"
        >
          The<br />Tracksuit.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.38 }}
          style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em', maxWidth: '320px', lineHeight: 1.9 }}
          className="uppercase mb-14"
        >
          3 colourways. Hidden zip pocket.<br />Full set. Limited units.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.48 }}
          className="flex items-start gap-3 sm:gap-5 mb-6"
          aria-label="Countdown to Drop 002"
        >
          {[
            { value: pad(timeLeft.days),  label: 'Days'  },
            { value: pad(timeLeft.hours), label: 'Hours' },
            { value: pad(timeLeft.mins),  label: 'Mins'  },
            { value: pad(timeLeft.secs),  label: 'Secs'  },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center"
                style={{ width: '62px', height: '62px', border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ ...mono, fontSize: '22px', color: '#F5F3EE', letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
                  {value}
                </span>
              </div>
              <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.38em' }} className="uppercase">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.62 }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.28em' }}
          className="uppercase mb-16"
        >
          Archive members get access 48h early
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col items-center gap-[6px]" aria-hidden="true"
        >
          <motion.span
            style={{ ...mono, fontSize: '6px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.38em' }}
            animate={{ opacity: [0.22, 0.7, 0.22] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >SCROLL</motion.span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.16)' }}
          />
        </motion.div>
      </section>

      {/* ── THREE COLOURWAYS ─────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 py-16 sm:py-20 max-w-5xl mx-auto">

        <motion.p
          {...reveal(0, 0)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.52em' }}
          className="uppercase mb-10 text-center"
        >
          [ Drop 002 — Colourways ]
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {COLOURWAYS.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.76, delay: i * 0.1, ease }}
              className="relative overflow-hidden aspect-[3/4]"
              style={{ background: c.bg, border: `1px solid ${c.border}` }}
            >
              {/* Corner marks */}
              <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l z-10" style={{ borderColor: c.border }} />
              <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r z-10" style={{ borderColor: c.border }} />

              {/* Real image */}
              {c.img && (
                <img src={c.img} alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'saturate(0.88) brightness(0.70)', objectPosition: c.imgPos }} />
              )}

              {/* Colour accent glow */}
              <div className="absolute inset-0" style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 80%, ${c.accent}22 0%, transparent 70%)`
              }} aria-hidden="true" />

              {/* Accent stripe — mimics tracksuit panel */}
              <div className="absolute top-0 bottom-0 right-[28%] w-[4px] opacity-40"
                style={{ background: c.accent }} aria-hidden="true" />

              {/* CLASSIFIED stamp */}
              <div className="absolute top-5 left-5 z-20">
                <p style={{ ...mono, fontSize: '7px', color: c.accent, letterSpacing: '0.42em', opacity: 0.7 }} className="uppercase">
                  [ Classified ]
                </p>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 z-20 px-5 py-5"
                style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.75))' }}>
                <p style={{ ...mono, fontSize: '7px', color: c.accent, letterSpacing: '0.38em', opacity: 0.8 }} className="uppercase mb-1">
                  {c.code}
                </p>
                <p style={{ ...serif, fontSize: '22px', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.1 }}>
                  {c.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...reveal(0.1, 0)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.35em' }}
          className="uppercase text-center mt-6"
        >
          Full details revealed on drop day
        </motion.p>
      </section>

      {/* ── FEATURE CALLOUT — HIDDEN POCKET ──────────────────────────── */}
      <section
        className="max-w-3xl mx-auto px-6 sm:px-14 py-14 sm:py-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-center">

          {/* Hidden pocket photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.82, ease }}
            className="relative aspect-square overflow-hidden"
            style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l z-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r z-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <img
              src="/ts-pocket.jpg"
              alt="Hidden pocket detail"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 20%', filter: 'brightness(0.80)' }}
            />
          </motion.div>

          <div>
            <motion.p
              {...reveal(0.04, 0)}
              style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.48em' }}
              className="uppercase mb-6"
            >
              [ Hidden Zip Pocket ]
            </motion.p>
            <motion.h2
              {...reveal(0.08)}
              style={{ ...serif, fontSize: 'clamp(26px, 5vw, 42px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.1 }}
              className="mb-6"
            >
              Seamless.<br />Impossible to find.
            </motion.h2>
            <motion.p
              {...reveal(0.12)}
              style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.9 }}
              className="mb-5"
            >
              Every colourway comes with a hidden zip pocket built into the jacket — completely invisible when closed.
            </motion.p>
            <motion.p
              {...reveal(0.16)}
              style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.9 }}
            >
              Phone. Keys. Cash. Secure storage that goes unseen.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── SPEC BAR ─────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              ['€70',         'Full Set'],
              ['3',           'Colourways'],
              ['S / M / L',   'Sizing'],
              ['Limited Run', 'No Restock'],
            ].map(([val, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <p style={{ ...serif, fontSize: 'clamp(22px, 4vw, 32px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1 }}>
                  {val}
                </p>
                <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.28em' }} className="uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ─────────────────────────────────────────────── */}
      <section className="max-w-md mx-auto px-6 py-16 sm:py-20 flex flex-col items-center text-center">

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="origin-center w-8 h-px mb-10"
          style={{ background: 'rgba(255,255,255,0.10)' }}
          aria-hidden="true"
        />

        {member ? (
          <motion.div {...reveal(0.04)} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
              <span style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.28em' }} className="uppercase">
                {firstName ? `${firstName} — ` : ''}Priority access secured
              </span>
            </div>
            <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em' }}>
              You go first. 48 hours before anyone else.
            </p>
          </motion.div>
        ) : submitted ? (
          <motion.div {...reveal(0.04)} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
              <span style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.28em' }} className="uppercase">
                You're on the list
              </span>
            </div>
            <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em' }}>
              We'll reach out when it drops.
            </p>
          </motion.div>
        ) : (
          <motion.div {...reveal(0.04)} className="flex flex-col items-center gap-6 w-full">
            <p style={{ ...serif, fontSize: 'clamp(22px, 4vw, 32px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.2 }}>
              Get notified<br />before it drops.
            </p>
            <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.24)', letterSpacing: '0.22em' }} className="uppercase">
              Archive members get 48h early access.
            </p>

            <form onSubmit={handleSubmit} className="flex w-full gap-0 max-w-[300px]">
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubError('') }}
                style={{ ...mono, color: '#F5F3EE', caretColor: '#F5F3EE' }}
                className="flex-1 h-11 bg-transparent outline-none text-[11px] tracking-[0.06em] px-0
                  border-b border-white/[0.12] focus:border-white/30
                  placeholder:text-white/15 transition-colors duration-300"
              />
              <button
                type="submit"
                disabled={submitting}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)' }}
                className="h-11 px-4 border border-white/[0.10] hover:text-white/60 hover:border-white/25
                  transition-all duration-300 disabled:opacity-30 cursor-pointer"
              >
                {submitting ? '...' : '→'}
              </button>
            </form>

            {subError && (
              <p style={{ ...mono, fontSize: '9px', color: 'rgba(220,80,80,0.70)', letterSpacing: '0.08em' }}>
                {subError}
              </p>
            )}

            <Link
              to="/archive"
              style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.22em', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              className="uppercase pb-px hover:opacity-60 transition-opacity duration-300"
            >
              Join the Archive for priority access →
            </Link>
          </motion.div>
        )}
      </section>

      {/* Back link */}
      <div className="flex items-center justify-center pb-10">
        <Link
          to="/"
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity duration-300"
        >
          ← True Vision Project
        </Link>
      </div>
    </div>
    </>
  )
}
