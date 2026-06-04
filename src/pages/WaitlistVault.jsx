import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistConfirmScreen from '../components/WaitlistConfirmScreen'

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }

function useTyping(text, { startDelay = 0, charInterval = 45 } = {}) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0, timeout, interval
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

const inputCls = `
  w-full h-[52px] bg-transparent border rounded-none
  text-[12px] tracking-[0.15em] uppercase
  px-5 text-center outline-none transition-colors duration-300
`

export default function WaitlistVault() {
  const navigate = useNavigate()
  const [step,      setStep]      = useState('email')
  const [email,     setEmail]     = useState('')
  const [name,      setName]      = useState('')
  const [status,    setStatus]    = useState('idle')
  const [errorMsg,  setErrorMsg]  = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const [scanning,   setScanning]   = useState(false)
  const scanTimeout = useRef(null)

  const footer = useTyping('[PROJECT: 002] // TVP // EST. 2026', { startDelay: 2200, charInterval: 40 })

  const handleBtnEnter = () => {
    setBtnHovered(true); setScanning(false)
    clearTimeout(scanTimeout.current)
    scanTimeout.current = setTimeout(() => setScanning(true), 10)
  }
  const handleBtnLeave = () => { setBtnHovered(false); setScanning(false) }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Enter a valid email address.'); setStatus('error'); return
    }
    setErrorMsg(''); setStep('name')
  }

  const handleNameSubmit = async (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setErrorMsg('Enter your name.'); setStatus('error'); return
    }
    setStatus('loading'); setErrorMsg('')
    try {
      const res  = await fetch('/api/drop002-waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email.trim(), name: trimmedName }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.'); setStatus('error'); return
      }
      setStatus('idle')
      setShowConfirm(true)
    } catch {
      setErrorMsg('Connection error. Try again.'); setStatus('error')
    }
  }

  return (
    <>
      <AnimatePresence>
        {showConfirm && (
          <WaitlistConfirmScreen onComplete={() => navigate('/drop-002')} />
        )}
      </AnimatePresence>

      <main className="relative min-h-[100dvh] w-full bg-[#F5F3EE] flex flex-col items-center overflow-hidden">
        <div className="grain" aria-hidden="true" />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.05) 100%)' }} />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 sm:px-10 py-12" style={{ maxWidth: '560px' }}>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full flex flex-col items-center gap-5 mb-10 sm:mb-14"
          >
            <img src="/logo.svg" alt="True Vision Project" width="400" height="400"
              className="w-[72vw] max-w-[360px] sm:max-w-[460px] h-auto object-contain select-none"
              style={{ filter: 'invert(1)' }} draggable="false" />

            <div className="flex flex-col items-center gap-2">
              <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.50em' }} className="uppercase">
                Drop 002 — Waitlist
              </p>
              <p style={{ ...serif, fontSize: 'clamp(18px, 3.5vw, 24px)', color: 'rgba(0,0,0,0.55)', fontStyle: 'italic', lineHeight: 1.3 }}>
                The Tracksuit. August 2026.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          >
            <AnimatePresence mode="wait">

              {/* Step 1 — email */}
              {step === 'email' && (
                <motion.form key="email"
                  onSubmit={handleEmailSubmit}
                  className="flex flex-col items-center gap-4 w-full" noValidate
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.28em' }} className="uppercase text-center mb-2">
                    Enter your email to join
                  </p>
                  <input
                    type="email" autoComplete="email" placeholder="YOUR@EMAIL.COM"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setErrorMsg('') } }}
                    style={{ ...mono, borderColor: status === 'error' ? 'rgba(220,38,38,0.4)' : 'rgba(0,0,0,0.16)', color: '#111111', caretColor: '#111111' }}
                    className={inputCls + ' placeholder:text-black/22 focus:border-black/40'}
                  />
                  {errorMsg && (
                    <p style={{ ...mono, fontSize: '10px', color: 'rgba(220,38,38,0.7)', letterSpacing: '0.1em' }} className="uppercase -mt-1 text-center">
                      {errorMsg}
                    </p>
                  )}
                  <button type="submit"
                    onMouseEnter={handleBtnEnter} onMouseLeave={handleBtnLeave}
                    className={`btn-vault w-full h-[52px] border rounded-none text-[11px] tracking-[0.45em] uppercase transition-all duration-500 cursor-pointer ${scanning ? 'scanning' : ''}`}
                    style={{ ...mono, borderColor: btnHovered ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.14)', color: btnHovered ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.40)' }}
                  >
                    <span className="scanline" aria-hidden="true" />
                    {btnHovered ? '[ Continue ]' : 'Get Access'}
                  </button>
                </motion.form>
              )}

              {/* Step 2 — name */}
              {step === 'name' && (
                <motion.form key="name"
                  onSubmit={handleNameSubmit}
                  className="flex flex-col items-center gap-4 w-full" noValidate
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.28em' }} className="uppercase text-center mb-2">
                    One more thing — your name
                  </p>
                  <input
                    type="text" autoComplete="name" placeholder="YOUR FULL NAME" autoFocus
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (status === 'error') { setStatus('idle'); setErrorMsg('') } }}
                    style={{ ...mono, borderColor: status === 'error' ? 'rgba(220,38,38,0.4)' : 'rgba(0,0,0,0.16)', color: '#111111', caretColor: '#111111' }}
                    className={inputCls + ' placeholder:text-black/22 focus:border-black/40'}
                  />
                  {errorMsg && (
                    <p style={{ ...mono, fontSize: '10px', color: 'rgba(220,38,38,0.7)', letterSpacing: '0.1em' }} className="uppercase -mt-1 text-center">
                      {errorMsg}
                    </p>
                  )}
                  <button type="submit" disabled={status === 'loading'}
                    onMouseEnter={handleBtnEnter} onMouseLeave={handleBtnLeave}
                    className={`btn-vault w-full h-[52px] border rounded-none text-[11px] tracking-[0.45em] uppercase disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-500 cursor-pointer ${scanning ? 'scanning' : ''}`}
                    style={{ ...mono, borderColor: btnHovered ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.14)', color: btnHovered ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.40)' }}
                  >
                    <span className="scanline" aria-hidden="true" />
                    {status === 'loading' ? (
                      <span className="inline-flex items-center justify-center gap-3">
                        <span className="w-3 h-3 border border-black/20 border-t-black/50 rounded-full animate-spin" aria-hidden="true" />
                        <span>Registering</span>
                      </span>
                    ) : btnHovered ? '[ Secure My Spot ]' : 'Join the Waitlist'}
                  </button>

                  <button type="button"
                    onClick={() => { setStep('email'); setErrorMsg(''); setStatus('idle') }}
                    style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.2em' }}
                    className="uppercase cursor-pointer hover:opacity-50 transition-opacity duration-300"
                  >
                    ← back
                  </button>
                </motion.form>
              )}

            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="relative z-10 w-full text-center px-4 pb-7 pt-2 shrink-0"
          style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.20)', letterSpacing: '0.12em' }}>
          <span aria-hidden="true">{footer}</span>
          {footer.length < '[PROJECT: 002] // TVP // EST. 2026'.length && (
            <span aria-hidden="true" className="inline-block w-[1ch] animate-pulse" style={{ color: 'rgba(0,0,0,0.20)' }}>_</span>
          )}
        </p>
      </main>
    </>
  )
}
