import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const LS_KEY = 'TrueVisionMember'

// ── Configure this date when you're ready to reveal ──────────────────────────
const REVEAL_DATE = new Date('2026-08-01T12:00:00+01:00')

import { mono, serif } from '../lib/design'

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
  const [member, setMember]         = useState(null)
  const [timeLeft, setTimeLeft]     = useState(getTimeLeft(REVEAL_DATE))
  const [email, setEmail]           = useState('')
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [subError, setSubError]     = useState('')

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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubError(data.error || 'Something went wrong.')
      }
    } catch {
      setSubError('Connection error. Try again.')
    }
    setSubmitting(false)
  }

  const firstName = member?.name
    ? member.name.trim().split(/\s+/)[0]
    : null

  return (
    <div className="fixed inset-0 bg-[#0e0d0c] flex flex-col items-center justify-center overflow-hidden">
      <div className="grain" aria-hidden="true" style={{ opacity: 0.7 }} />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-[22px] flex items-center justify-between px-6 sm:px-10"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        aria-hidden="true"
      >
        <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.38em' }}>
          [ TRUE VISION PROJECT ]
        </span>
        <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.38em' }}>
          [ DROP 002 — CLASSIFIED ]
        </span>
      </motion.div>

      {/* Main */}
      <div className="relative flex flex-col items-center text-center px-6 max-w-md w-full">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.55em' }}
          className="uppercase mb-9"
        >
          Classified — Drop 002
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            ...serif,
            fontSize: 'clamp(44px, 9vw, 78px)',
            color: '#f5f3ee',
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
          }}
          className="mb-4"
        >
          Something<br />Is Coming.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.24em' }}
          className="uppercase mb-12"
        >
          The next chapter.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex items-start gap-3 sm:gap-5 mb-12"
          aria-label="Countdown to reveal"
        >
          {[
            { value: pad(timeLeft.days),  label: 'Days' },
            { value: pad(timeLeft.hours), label: 'Hours' },
            { value: pad(timeLeft.mins),  label: 'Mins' },
            { value: pad(timeLeft.secs),  label: 'Secs' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div
                className="flex items-center justify-center"
                style={{
                  width: '62px',
                  height: '62px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span style={{
                  ...mono,
                  fontSize: '22px',
                  color: '#f5f3ee',
                  letterSpacing: '0.04em',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {value}
                </span>
              </div>
              <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.38em' }}
                className="uppercase">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="origin-center w-8 h-px mb-10"
          style={{ background: 'rgba(255,255,255,0.10)' }}
          aria-hidden="true"
        />

        {/* Access section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="w-full flex flex-col items-center"
        >
          {member ? (
            /* Archive member — priority access confirmed */
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                <span style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.28em' }}
                  className="uppercase">
                  {firstName ? `${firstName} — ` : ''}Priority access secured
                </span>
              </div>
              <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.18em' }}>
                You will be first. Watch this space.
              </p>
            </div>
          ) : submitted ? (
            /* Submitted waitlist email */
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                <span style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.28em' }}
                  className="uppercase">
                  You're on the list
                </span>
              </div>
              <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.18em' }}>
                We'll reach out when it drops.
              </p>
            </div>
          ) : (
            /* Non-member — capture email */
            <div className="flex flex-col items-center gap-5 w-full max-w-[280px]">
              <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.26)', letterSpacing: '0.22em' }}
                className="uppercase">
                Archive members go first.
              </p>
              <form onSubmit={handleSubmit} className="flex w-full gap-0">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubError('') }}
                  style={{ ...mono, color: '#f5f3ee', caretColor: '#f5f3ee' }}
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
                style={{
                  ...mono,
                  fontSize: '8px',
                  color: 'rgba(255,255,255,0.20)',
                  letterSpacing: '0.22em',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}
                className="uppercase pb-px hover:opacity-60 transition-opacity duration-300"
              >
                Join the Archive for priority access →
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom back link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.85 }}
        className="absolute bottom-7 left-0 right-0 flex items-center justify-center"
      >
        <Link
          to="/"
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity duration-300"
        >
          ← True Vision Project
        </Link>
      </motion.div>
    </div>
  )
}
