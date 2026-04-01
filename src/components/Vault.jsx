import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Respect prefers-reduced-motion (UX guideline: Reduced Motion)
const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: reduced ? 0 : 1.6,
      ease: 'easeOut',
      delay: reduced ? 0 : delay,
    },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: reduced ? 0 : 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduced ? 0 : 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: reduced ? 0 : delay,
    },
  }),
}

export default function Vault() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

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

      {/* ── Background: cinematic lighting layers ── */}

      {/* Key light — cool overhead source from top-center */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 45% at 50% -5%, rgba(255,255,255,0.045) 0%, transparent 100%)',
        }}
      />

      {/* Rim light — faint warm fill from bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 102% 105%, rgba(180,155,120,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Vignette — crushes corners to black, forces eye to center */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* Film grain — desaturated fractalNoise */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: 0.055,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs sm:max-w-sm">

        {/* Logo — dominant, anchors the page */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          aria-label="True Vision Project"
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

        {/* Vast breathing space between logo and form — the silence is intentional */}
        <div className="h-16 sm:h-20" aria-hidden="true" />

        {/* Email capture — sole action on the page */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-center text-[9px] tracking-[0.45em] text-white/35 uppercase"
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
                    if (status === 'error') {
                      setStatus('idle')
                      setErrorMsg('')
                    }
                  }}
                  aria-describedby={errorMsg ? 'vault-email-error' : undefined}
                  aria-invalid={status === 'error' ? 'true' : undefined}
                  style={{ fontFamily: "'Space Mono', monospace" }}
                  className="
                    w-full min-h-[44px]
                    bg-transparent
                    border border-[#333333]
                    rounded-none
                    text-white text-[11px] tracking-[0.2em] uppercase
                    placeholder:text-white/20 placeholder:tracking-[0.2em]
                    px-5 py-[15px] text-center
                    outline-none
                    focus:border-white
                    transition-colors duration-300
                  "
                />

                {errorMsg && (
                  <p
                    id="vault-email-error"
                    role="alert"
                    className="text-[8px] tracking-[0.25em] text-red-400/50 uppercase -mt-1"
                  >
                    {errorMsg}
                  </p>
                )}

                {/* Button — min 44px height, full readable label */}
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
                    transition-colors duration-500
                    cursor-pointer
                  "
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center justify-center gap-3">
                      {/* Spinner — only acceptable continuous animation (UX guideline: loading-states) */}
                      <span
                        className="w-2.5 h-2.5 border border-white/25 border-t-white/55 rounded-full animate-spin"
                        aria-hidden="true"
                      />
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

      {/* Year stamp — absolute positioned, never competes with content */}
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1.2}
        className="absolute bottom-8 z-10"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '10px',
          color: '#666666',
          letterSpacing: '0.1em',
        }}
        aria-hidden="true"
      >
        [PROJECT: 001] // TRUE VISION ARCHIVE // EST. 2026
      </motion.p>

    </main>
  )
}
