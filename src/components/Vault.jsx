import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      duration: 1.4,
      ease: 'easeOut',
      delay,
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

    // Replace this with your actual email capture endpoint (e.g. Mailchimp, Klaviyo, Resend)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStatus('success')
  }

  return (
    <main className="relative min-h-screen w-full bg-[#000000] flex flex-col items-center justify-center px-8 overflow-hidden">

      {/* Cinematic top-down key light — faint cool source from above center */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 45% at 50% -5%, rgba(255,255,255,0.045) 0%, transparent 100%)',
        }}
      />

      {/* Subtle rim light — low warm fill from bottom-right, like a practical source off frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 102% 105%, rgba(180,155,120,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Vignette — pulls focus to center, crushes the corners to absolute black */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.92) 100%)',
        }}
      />

      {/* Film grain — fine, tight, mid-opacity for texture without noise */}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-sm gap-0">

        {/* Logo */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center justify-center mb-16"
          aria-label="True Vision Project logo"
        >
          <img
            src="/logo.svg"
            alt="True Vision Project"
            width="260"
            height="260"
            style={{ filter: 'invert(1)' }}
            className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] object-contain select-none"
            draggable="false"
          />
        </motion.div>

        {/* Brand name */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="flex flex-col items-center gap-5 mb-14"
        >
          <p className="text-[9px] font-light tracking-[0.55em] text-white/30 uppercase">
            True Vision Project
          </p>

          <h1 className="text-[11px] sm:text-[13px] font-light tracking-[0.45em] text-white/90 uppercase leading-relaxed">
            Built From Nothing
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="w-px h-16 bg-white/[0.08] mb-14"
          aria-hidden="true"
        />

        {/* Email capture */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.9}
          className="w-full"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[9px] tracking-[0.45em] text-white/35 uppercase"
              >
                You're in.
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-8 w-full"
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
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') {
                      setStatus('idle')
                      setErrorMsg('')
                    }
                  }}
                  className="
                    w-full bg-transparent border-b border-white/[0.12]
                    text-white text-[11px] font-light tracking-[0.2em]
                    placeholder:text-white/20 placeholder:tracking-[0.2em]
                    py-4 text-center outline-none
                    focus:border-white/40
                    transition-colors duration-700
                  "
                  aria-describedby={errorMsg ? 'vault-email-error' : undefined}
                />

                {errorMsg && (
                  <p
                    id="vault-email-error"
                    role="alert"
                    className="text-[9px] tracking-[0.25em] text-red-400/50 uppercase -mt-4"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  aria-label="Join the Project"
                  className="
                    px-12 py-4
                    border border-white/[0.12]
                    text-[9px] font-light tracking-[0.5em] text-white/40 uppercase
                    hover:border-white/30 hover:text-white/70
                    disabled:opacity-20 disabled:cursor-not-allowed
                    transition-all duration-700
                    cursor-pointer
                  "
                >
                  {status === 'loading' ? (
                    <span className="inline-flex items-center gap-3">
                      <span className="w-2.5 h-2.5 border border-white/30 border-t-white/60 rounded-full animate-spin" />
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

      {/* Bottom year stamp */}
      <motion.p
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1.5}
        className="absolute bottom-10 text-[8px] font-light tracking-[0.5em] text-white/10 uppercase z-10"
        aria-hidden="true"
      >
        © {new Date().getFullYear()} True Vision Project
      </motion.p>

    </main>
  )
}
