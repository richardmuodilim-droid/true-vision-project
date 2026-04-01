import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const FOOTER_TEXT = '[PROJECT: 001] // TRUE VISION ARCHIVE // EST. 2026'

// Typing hook — reveals text character by character after a start delay
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

export default function Vault() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Footer types in after logo (1.5s) + form slide-up (0.8s) + small buffer = ~2.8s
  const footerText = useTyping(FOOTER_TEXT, { startDelay: 2800, charInterval: 38 })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Enter a valid email address.')
      setStatus('error')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    // Replace with your email capture endpoint (Klaviyo, Mailchimp, Resend, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
  }

  return (
    <main className="relative min-h-screen w-full bg-[#000000] flex flex-col items-center justify-center px-8 overflow-hidden">

      {/* ── Background layers ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% -5%, rgba(255,255,255,0.045) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 102% 105%, rgba(180,155,120,0.04) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)' }} />
      <div aria-hidden="true" className="grain" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs sm:max-w-sm">

        {/* 1. Logo — slow fade, 1.5s */}
        <motion.div
          aria-label="True Vision Project"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduced ? 0 : 1.5,
            ease: 'easeOut',
          }}
        >
          <img
            src="/logo.svg"
            alt="True Vision Project"
            width="300"
            height="300"
            style={{ filter: 'invert(1)' }}
            className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] object-contain select-none"
            draggable="false"
          />
        </motion.div>

        <div className="h-16 sm:h-20" aria-hidden="true" />

        {/* 2. Form — slides up 0.8s, starts after logo is mostly visible (delay 1.3s) */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: reduced ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: reduced ? 0 : 1.3,
          }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-center text-[9px] tracking-[0.45em] text-white/35 uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                You're in.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-5 w-full"
                noValidate
              >
                <label htmlFor="vault-email" className="sr-only">
                  Email address
                </label>

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
                    w-full min-h-[44px]
                    bg-transparent border border-[#333333] rounded-none
                    text-white text-[11px] tracking-[0.2em] uppercase
                    placeholder:text-white/20 placeholder:tracking-[0.2em]
                    px-5 py-[15px] text-center outline-none
                    focus:border-white transition-colors duration-300
                  "
                />

                {errorMsg && (
                  <p
                    id="vault-email-error"
                    role="alert"
                    className="text-[8px] tracking-[0.25em] text-red-400/50 uppercase -mt-1"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  aria-label="Join the True Vision Project waitlist"
                  className="
                    mt-3 w-full min-h-[44px]
                    border border-white/[0.12]
                    text-[9px] font-light tracking-[0.5em] text-white/40 uppercase
                    hover:border-white/28 hover:text-white/65
                    disabled:opacity-20 disabled:cursor-not-allowed
                    transition-colors duration-500 cursor-pointer
                  "
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center justify-center gap-3">
                      <span className="w-2.5 h-2.5 border border-white/25 border-t-white/55 rounded-full animate-spin" aria-hidden="true" />
                      <span>Joining</span>
                    </span>
                  ) : (
                    'Join the Project'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 3. Footer — types in last, one character at a time */}
      <p
        className="absolute bottom-8 z-10 min-h-[1em]"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          color: '#666666',
          letterSpacing: '0.1em',
        }}
        aria-label={FOOTER_TEXT}
      >
        {/* Visible typed text */}
        <span aria-hidden="true">{footerText}</span>

        {/* Blinking cursor — only while typing */}
        {footerText.length < FOOTER_TEXT.length && (
          <span
            aria-hidden="true"
            className="inline-block w-[1ch] animate-pulse"
            style={{ color: '#666666' }}
          >
            _
          </span>
        )}
      </p>

    </main>
  )
}
