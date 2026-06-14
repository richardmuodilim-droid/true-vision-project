import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { mono, serif, inter, ease, reveal } from '../lib/design'
import WaitlistConfirmScreen from '../components/WaitlistConfirmScreen'
import Drop002Entry from '../components/Drop002Entry'

const LS_KEY      = 'TVPWaitlist'
const ARCHIVE_KEY = 'TrueVisionMember'
const REVEAL_DATE = new Date('2026-08-01T12:00:00+01:00')

const COLOURWAYS = [
  { name: 'Purple / Black',    code: 'TVP-002-PB', accent: '#7B2FBE' },
  { name: 'Light Blue / Grey', code: 'TVP-002-LG', accent: '#7DD3DA' },
  { name: 'Pink / Black',      code: 'TVP-002-PK', accent: '#EC008C' },
]

function loadWaitlistMember() {
  try { const r = localStorage.getItem(LS_KEY); return r ? JSON.parse(r) : null } catch { return null }
}
function saveWaitlistMember(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch {}
}
function loadMember() {
  try { const r = localStorage.getItem(ARCHIVE_KEY); return r ? JSON.parse(r) : null } catch { return null }
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
  const [member,         setMember]         = useState(null)
  const [waitlistMember, setWaitlistMember] = useState(() => loadWaitlistMember())
  const [timeLeft,       setTimeLeft]       = useState(getTimeLeft(REVEAL_DATE))
  const [step,           setStep]           = useState('email')
  const [email,          setEmail]          = useState('')
  const [name,           setName]           = useState('')
  const [submitted,      setSubmitted]      = useState(false)
  const [submitting,     setSubmitting]     = useState(false)
  const [subError,       setSubError]       = useState('')
  const [showConfirm,    setShowConfirm]    = useState(false)
  const [btnHovered,     setBtnHovered]     = useState(false)
  const [scanning,       setScanning]       = useState(false)
  const scanTimeout = useRef(null)

  const handleBtnEnter = () => {
    setBtnHovered(true); setScanning(false)
    clearTimeout(scanTimeout.current)
    scanTimeout.current = setTimeout(() => setScanning(true), 10)
  }
  const handleBtnLeave = () => { setBtnHovered(false); setScanning(false) }

  useEffect(() => { setMember(loadMember()) }, [])
  useEffect(() => {
    if (timeLeft.expired) return
    const t = setInterval(() => setTimeLeft(getTimeLeft(REVEAL_DATE)), 1000)
    return () => clearInterval(t)
  }, [timeLeft.expired])

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setSubError('Enter a valid email.'); return
    }
    setSubError(''); setStep('name')
  }

  const handleNameSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) { setSubError('Enter your name.'); return }
    setSubmitting(true); setSubError('')
    try {
      const res  = await fetch('/api/drop002-waitlist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        saveWaitlistMember({ name: name.trim(), email: email.trim() })
        setShowConfirm(true)
      } else { setSubError(data.error || 'Something went wrong.') }
    } catch { setSubError('Connection error. Try again.') }
    setSubmitting(false)
  }

  const firstName = member?.name ? member.name.trim().split(/\s+/)[0] : null

  if (waitlistMember && !showConfirm) {
    return <Drop002Entry name={waitlistMember.name} onExit={() => { localStorage.removeItem(LS_KEY); setWaitlistMember(null) }} />
  }

  return (
    <>
    <AnimatePresence>
      {showConfirm && (
        <WaitlistConfirmScreen onComplete={() => {
          setShowConfirm(false)
          setWaitlistMember(loadWaitlistMember())
        }} />
      )}
    </AnimatePresence>

    <div className="min-h-screen bg-[#0a0909]">
      <div className="grain" aria-hidden="true" style={{ opacity: 0.5 }} />

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

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-[22px] min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center relative">

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.60em' }}
          className="uppercase mb-8"
        >
          True Vision Project — Drop 002
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          style={{ ...serif, fontSize: 'clamp(56px, 13vw, 108px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.01em' }}
          className="mb-2"
        >
          The Next<br />Statement.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.28em' }}
          className="uppercase mb-12"
        >
          [ Drop 002 — The Tracksuit ]
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.42 }}
          style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.22em' }}
          className="uppercase mb-12"
        >
          August 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="flex items-start gap-3 sm:gap-6 mb-8"
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
                style={{ width: '64px', height: '64px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                <span style={{ ...mono, fontSize: '24px', color: '#F5F3EE', letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
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
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.28em' }}
          className="uppercase mb-14"
        >
          Archive members get 48h early access
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
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

      {/* ── PRODUCT IMAGE ────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="relative w-full overflow-hidden"
          style={{ maxHeight: '80vh', background: '#0f0f0f' }}
        >
          <img
            src="/ts-all-front.png"
            alt="Drop 002 — Three colourways"
            className="w-full object-cover object-top"
            style={{ maxHeight: '80vh' }}
          />
          {/* Gradient overlay bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32"
            style={{ background: 'linear-gradient(transparent, #0a0909)' }}
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center">
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.42em' }} className="uppercase">
              Three colourways — Drop 002
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── WHY THIS MATTERS ──────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col gap-6"
        >
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.48em' }} className="uppercase">
            [ Why This Matters ]
          </p>
          <h2 style={{ ...serif, fontSize: 'clamp(28px, 5vw, 40px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.2 }}>
            Not just a tracksuit.
            <br />The next proof that representation works.
          </h2>
          <p style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.9 }}>
            Drop 001 proved the model. 24 units. Sold out in 24 hours. No ads.
          </p>
          <p style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.9 }}>
            Drop 002 proves we're building something that lasts. When you wear this, you're saying: <span style={{ ...serif, fontStyle: 'italic' }}>representation matters. I'm part of this mission.</span>
          </p>
        </motion.div>
      </section>

      {/* ── SPECS + COLOURWAYS ───────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20">

        {/* Specs row */}
        <motion.div
          {...reveal(0)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px mb-14"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {[
            ['€70',        'Full Set'],
            ['S / M / L',  'Sizing'],
            ['3',          'Colourways'],
            ['Ltd. Run',   'No Restock'],
          ].map(([val, label]) => (
            <div key={label} className="flex flex-col gap-1 px-5 py-5"
              style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ ...serif, fontSize: 'clamp(20px, 3.5vw, 28px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1 }}>
                {val}
              </p>
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.28em' }} className="uppercase">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Colourways — clean list */}
        <motion.p
          {...reveal(0.04, 0)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.52em' }}
          className="uppercase mb-6"
        >
          [ Colourways ]
        </motion.p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {COLOURWAYS.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="flex items-center justify-between py-5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full shrink-0"
                  style={{ background: c.accent, boxShadow: `0 0 10px ${c.accent}50` }} />
                <p style={{ ...serif, fontSize: 'clamp(18px, 3vw, 24px)', color: '#F5F3EE', fontWeight: 400 }}>
                  {c.name}
                </p>
              </div>
              <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.32em' }} className="uppercase">
                {c.code}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HIDDEN POCKET ────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 items-center pt-14 sm:pt-20">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.82, ease }}
            className="relative aspect-square overflow-hidden"
            style={{ background: '#111111' }}
          >
            <span aria-hidden="true" className="absolute top-0 left-0 w-4 h-4 border-t border-l z-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-4 h-4 border-b border-r z-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <img src="/ts-pocket.jpg" alt="Hidden pocket detail"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center 20%' }} />
          </motion.div>

          <div>
            <motion.p {...reveal(0.04, 0)}
              style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.48em' }}
              className="uppercase mb-5">
              [ Feature — Hidden Zip Pocket ]
            </motion.p>
            <motion.h2 {...reveal(0.08)}
              style={{ ...serif, fontSize: 'clamp(24px, 4.5vw, 38px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.12 }}
              className="mb-5">
              Seamless.<br />Impossible to find.
            </motion.h2>
            <motion.p {...reveal(0.12)}
              style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.9 }}>
              Built into every colourway. Completely invisible when closed. Phone, keys, cash — secured and unseen.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── SIGNUP ───────────────────────────────────────── */}
      <section
        className="max-w-md mx-auto px-6 py-16 sm:py-20 flex flex-col items-center text-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {member ? (
          <motion.div {...reveal(0.04)} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
              <span style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.28em' }} className="uppercase">
                {firstName ? `${firstName} — ` : ''}Priority access secured
              </span>
            </div>
            <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.18em' }}>
              You go first. 48 hours before anyone else.
            </p>
          </motion.div>

        ) : submitted ? (
          <motion.div {...reveal(0.04)} className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
              <span style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.28em' }} className="uppercase">
                You're in
              </span>
            </div>
            <p style={{ ...serif, fontSize: 'clamp(20px, 4vw, 28px)', color: '#F5F3EE', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.3 }}>
              Part of something that matters.
            </p>
          </motion.div>

        ) : (
          <AnimatePresence mode="wait">

            {step === 'email' ? (
              <motion.div key="email"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col items-center gap-6 w-full"
              >
                <div className="flex flex-col items-center gap-3">
                  <p style={{ ...serif, fontSize: 'clamp(24px, 4.5vw, 34px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.2 }}>
                    Get early access.<br />Be part of this.
                  </p>
                  <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.22em' }} className="uppercase">
                    Free. No spam. August 2026.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 w-full max-w-[320px]">
                  <input
                    type="email" autoComplete="email" placeholder="YOUR@EMAIL.COM"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSubError('') }}
                    style={{ ...mono, fontSize: '11px', letterSpacing: '0.12em', color: '#F5F3EE', caretColor: '#F5F3EE', background: 'rgba(255,255,255,0.04)', borderColor: subError ? 'rgba(220,80,80,0.5)' : 'rgba(255,255,255,0.12)' }}
                    className="w-full h-[52px] border outline-none px-5 text-center uppercase placeholder:text-white/18 focus:border-white/30 transition-colors duration-300"
                  />
                  {subError && (
                    <p style={{ ...mono, fontSize: '9px', color: 'rgba(220,80,80,0.70)', letterSpacing: '0.08em' }} className="text-center">{subError}</p>
                  )}
                  <button type="submit"
                    onMouseEnter={handleBtnEnter} onMouseLeave={handleBtnLeave}
                    className={`btn-vault w-full h-[52px] border text-[11px] tracking-[0.45em] uppercase transition-all duration-500 cursor-pointer ${scanning ? 'scanning' : ''}`}
                    style={{ ...mono, borderColor: btnHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.16)', color: btnHovered ? '#F5F3EE' : 'rgba(255,255,255,0.45)', background: btnHovered ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                  >
                    <span className="scanline" aria-hidden="true" />
                    {btnHovered ? '[ Next ]' : 'Continue'}
                  </button>
                </form>
              </motion.div>

            ) : (
              <motion.div key="name"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col items-center gap-6 w-full"
              >
                <p style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.28em' }} className="uppercase text-center">
                  One more thing — your name
                </p>

                <form onSubmit={handleNameSubmit} className="flex flex-col gap-3 w-full max-w-[320px]">
                  <input
                    type="text" autoComplete="name" placeholder="YOUR FULL NAME" autoFocus
                    value={name}
                    onChange={(e) => { setName(e.target.value); setSubError('') }}
                    style={{ ...mono, fontSize: '11px', letterSpacing: '0.12em', color: '#F5F3EE', caretColor: '#F5F3EE', background: 'rgba(255,255,255,0.04)', borderColor: subError ? 'rgba(220,80,80,0.5)' : 'rgba(255,255,255,0.12)' }}
                    className="w-full h-[52px] border outline-none px-5 text-center uppercase placeholder:text-white/18 focus:border-white/30 transition-colors duration-300"
                  />
                  {subError && (
                    <p style={{ ...mono, fontSize: '9px', color: 'rgba(220,80,80,0.70)', letterSpacing: '0.08em' }} className="text-center">{subError}</p>
                  )}
                  <button type="submit" disabled={submitting}
                    onMouseEnter={handleBtnEnter} onMouseLeave={handleBtnLeave}
                    className={`btn-vault w-full h-[52px] border text-[11px] tracking-[0.45em] uppercase disabled:opacity-30 transition-all duration-500 cursor-pointer ${scanning ? 'scanning' : ''}`}
                    style={{ ...mono, borderColor: btnHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.16)', color: btnHovered ? '#F5F3EE' : 'rgba(255,255,255,0.45)', background: btnHovered ? 'rgba(255,255,255,0.06)' : 'transparent' }}
                  >
                    <span className="scanline" aria-hidden="true" />
                    {submitting ? (
                      <span className="inline-flex items-center justify-center gap-3">
                        <span className="w-3 h-3 border border-white/20 border-t-white/60 rounded-full animate-spin" aria-hidden="true" />
                        <span>Registering</span>
                      </span>
                    ) : btnHovered ? '[ Secure My Spot ]' : 'Join the Waitlist'}
                  </button>
                  <button type="button"
                    onClick={() => { setStep('email'); setSubError('') }}
                    style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.22em' }}
                    className="uppercase cursor-pointer hover:opacity-50 transition-opacity duration-300"
                  >
                    ← back
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>

      {/* Back link */}
      <div className="flex items-center justify-center pb-10">
        <Link to="/"
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity duration-300">
          ← True Vision Project
        </Link>
      </div>
    </div>
    </>
  )
}
