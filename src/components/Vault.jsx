import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const FOOTER_TEXT = '[PROJECT: 001] // TVP // EST. 2026'

function useTyping(text, { startDelay = 0, charInterval = 45 } = {}) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (reduced) { setDisplayed(text); return }
    let i = 0
    let timeout
    let interval
    timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, charInterval)
    }, startDelay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [text, startDelay, charInterval])

  return displayed
}

export default function Vault({ onSuccess, glitching }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const footerText = useTyping(FOOTER_TEXT, { startDelay: 2800, charInterval: 45 })

  const [btnHovered, setBtnHovered] = useState(false)
  const [scanning, setScanning] = useState(false)
  const scanTimeout = useRef(null)

  const handleBtnEnter = () => {
    setBtnHovered(true)
    setScanning(false)
    clearTimeout(scanTimeout.current)
    scanTimeout.current = setTimeout(() => setScanning(true), 10)
  }

  const handleBtnLeave = () => {
    setBtnHovered(false)
    setScanning(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Enter a valid email.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg('Something went wrong. Try again.')
        setStatus('error')
        return
      }
      onSuccess?.(data.userId)
    } catch {
      setErrorMsg('Connection error. Try again.')
      setStatus('error')
    }
  }

  return (
    <main className={`relative min-h-[100dvh] w-full bg-[#000000] flex flex-col items-center overflow-hidden${glitching ? ' vault-glitch' : ''}`}>

      {/* Background layers */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(255,255,255,0.05) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 102% 105%, rgba(180,155,120,0.04) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.92) 100%)' }} />
      <div aria-hidden="true" className="grain" />

      {/* ── Centre section — grows to fill available space ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 sm:px-10 py-12 sm:py-16"
        style={{ maxWidth: '560px' }}>

        {/* 1. Logo */}
        <motion.div
          aria-label="True Vision Project"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 1.5, ease: 'easeOut' }}
          className="w-full flex items-center justify-center"
        >
          <img
            src="/logo.svg"
            alt="True Vision Project"
            width="400"
            height="400"
            style={{ filter: 'invert(1)' }}
            className="w-[75vw] max-w-[384px] sm:max-w-[494px] h-auto object-contain select-none"
            draggable="false"
          />
        </motion.div>

        {/* Breathing room between logo and form — extra 40px on mobile */}
        <div className="h-[88px] sm:h-16" aria-hidden="true" />

        {/* 2. Form */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, ease: [0.16, 1, 0.3, 1], delay: reduced ? 0 : 1.3 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-center uppercase"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.4em' }}
              >
                You're in.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4 w-full"
                noValidate
              >
                <label htmlFor="vault-email" className="sr-only">Email address</label>

                <input
                  id="vault-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="YOUR@EMAIL.COM"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') { setStatus('idle'); setErrorMsg('') }
                  }}
                  aria-describedby={errorMsg ? 'vault-email-error' : undefined}
                  aria-invalid={status === 'error' ? 'true' : undefined}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="
                    w-full h-[52px]
                    bg-transparent border border-[#333333] rounded-none
                    text-white text-[12px] tracking-[0.15em] uppercase
                    placeholder:text-white/20
                    px-5 text-center outline-none
                    focus:border-white transition-colors duration-300
                  "
                />

                {errorMsg && (
                  <p
                    id="vault-email-error"
                    role="alert"
                    className="-mt-1 text-center uppercase"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: 'rgba(248,113,113,0.6)', letterSpacing: '0.2em' }}
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  aria-label="Join the True Vision Project waitlist"
                  onMouseEnter={handleBtnEnter}
                  onMouseLeave={handleBtnLeave}
                  className={`
                    btn-vault
                    w-full h-[52px]
                    border border-white/[0.12] rounded-none
                    text-[11px] tracking-[0.45em] uppercase
                    disabled:opacity-20 disabled:cursor-not-allowed
                    transition-all duration-500 cursor-pointer
                    ${btnHovered ? 'text-white/80 border-white/25' : 'text-white/40'}
                    ${scanning ? 'scanning' : ''}
                  `}
                  style={btnHovered ? { fontFamily: "'Space Mono', monospace" } : {}}
                >
                  <span className="scanline" aria-hidden="true" />
                  {status === 'loading' ? (
                    <span className="inline-flex items-center justify-center gap-3">
                      <span className="w-3 h-3 border border-white/25 border-t-white/55 rounded-full animate-spin" aria-hidden="true" />
                      <span>Joining</span>
                    </span>
                  ) : btnHovered ? (
                    '[ Access Granted ]'
                  ) : (
                    'Join the Project'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Footer — always in flow, never absolute ── */}
      <p
        className="relative z-10 w-full text-center px-4 pb-7 pt-2 min-h-[1em] shrink-0"
        style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#555', letterSpacing: '0.12em' }}
        aria-label={FOOTER_TEXT}
      >
        <span aria-hidden="true">{footerText}</span>
        {footerText.length < FOOTER_TEXT.length && (
          <span aria-hidden="true" className="inline-block w-[1ch] animate-pulse" style={{ color: '#555' }}>_</span>
        )}
      </p>

    </main>
  )
}
