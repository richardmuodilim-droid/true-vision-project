import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mono, serif } from '../lib/design'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%/\\'

function useScramble(target, { startDelay = 0, duration = 500 } = {}) {
  const [output, setOutput] = useState('')
  useEffect(() => {
    let raf, timeout
    let start = null
    const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)]
    const tick = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const resolved = Math.floor(progress * target.length)
      setOutput(target.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < resolved) return ch
        return rand()
      }).join(''))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    timeout = setTimeout(() => { raf = requestAnimationFrame(tick) }, startDelay)
    return () => { cancelAnimationFrame(raf); clearTimeout(timeout) }
  }, [target, startDelay, duration])
  return output
}

function StatusLine({ text, delay, accent }) {
  const [visible, setVisible] = useState(false)
  const scrambled = useScramble(text, { startDelay: delay + 40, duration: 350 })
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  if (!visible) return null
  return (
    <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.18em', lineHeight: '2.1', color: accent || 'rgba(255,255,255,0.35)' }}>
      {scrambled || text}
    </p>
  )
}

const STATUS_LINES = [
  { text: 'SUBMITTING ACCESS REQUEST...',   delay: 0,    accent: 'rgba(255,255,255,0.35)' },
  { text: 'VERIFYING EMAIL ADDRESS...',     delay: 380,  accent: 'rgba(255,255,255,0.35)' },
  { text: 'ADDING TO DROP 002 LIST...',     delay: 740,  accent: 'rgba(255,255,255,0.35)' },
  { text: 'REGISTRATION CONFIRMED.',        delay: 1080, accent: 'rgba(255,255,255,0.80)' },
]

const COLOURWAYS = [
  { label: 'PURPLE / BLACK', color: '#7B2FBE' },
  { label: 'LIGHT BLUE / GREY', color: '#7DD3DA' },
  { label: 'PINK / BLACK', color: '#EC008C' },
]

export default function WaitlistConfirmScreen({ onComplete }) {
  const headline    = useScramble('PROCESSING REQUEST...', { startDelay: 60, duration: 520 })
  const [showFinal, setShowFinal] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowFinal(true), 1600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!onComplete) return
    const t = setTimeout(onComplete, 4200)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-[#050404] flex flex-col items-center justify-center overflow-hidden">
      <div className="grain" aria-hidden="true" style={{ opacity: 0.5 }} />

      {/* Scanning line */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 z-20 pointer-events-none"
        style={{ height: '1px' }}
        initial={{ top: '-1px' }}
        animate={{ top: '100%' }}
        transition={{ duration: 1.2, delay: 0.08, ease: 'linear' }}
      >
        <div className="w-full h-full" style={{ background: 'rgba(255,255,255,0.6)' }} />
        <div className="absolute inset-x-0 top-0 pointer-events-none"
          style={{ height: '60px', marginTop: '-58px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06))' }} />
      </motion.div>

      {/* Flicker */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-white pointer-events-none"
        animate={{ opacity: [0, 0.05, 0, 0.03, 0, 0.06, 0, 0.02, 0] }}
        transition={{ duration: 1.4, ease: 'linear' }}
      />

      {/* Corner marks */}
      {['top-6 left-6 border-t border-l', 'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l', 'bottom-6 right-6 border-b border-r'].map((cls, i) => (
        <span key={i} aria-hidden="true" className={`absolute w-5 h-5 border-white/[0.07] z-30 ${cls}`} />
      ))}

      <div className="relative z-30 flex flex-col items-center gap-8 px-8 w-full max-w-sm text-center">

        {/* Phase 1 — processing */}
        <AnimatePresence mode="wait">
          {!showFinal ? (
            <motion.div key="processing"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              <p style={{ ...mono, fontSize: '12px', color: '#ffffff', letterSpacing: '0.35em' }} className="uppercase">
                {headline || 'PROCESSING REQUEST...'}
              </p>
              <div className="w-px h-6 bg-white/10" aria-hidden="true" />
              <div className="flex flex-col items-start w-full gap-0">
                {STATUS_LINES.map(line => (
                  <StatusLine key={line.text} text={line.text} delay={line.delay} accent={line.accent} />
                ))}
              </div>
            </motion.div>

          ) : (
            /* Phase 2 — confirmed + suspense */
            <motion.div key="confirmed"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-7 w-full"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-2 h-2 rounded-full bg-green-400 shrink-0"
                  aria-hidden="true"
                />
                <p style={{ ...mono, fontSize: '11px', color: 'rgba(255,255,255,0.70)', letterSpacing: '0.38em' }} className="uppercase">
                  You're on the list
                </p>
              </div>

              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-10 h-px origin-center"
                style={{ background: 'rgba(255,255,255,0.12)' }}
                aria-hidden="true"
              />

              <motion.h2
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ ...serif, fontSize: 'clamp(32px, 8vw, 52px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.08 }}
              >
                Drop 002.<br />
                <span style={{ color: 'rgba(255,255,255,0.32)', fontStyle: 'italic' }}>The Tracksuit.</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-col items-center gap-3 w-full"
              >
                <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.38em' }} className="uppercase">
                  3 colourways
                </p>
                <div className="flex items-center gap-4">
                  {COLOURWAYS.map((c, i) => (
                    <motion.div key={c.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.65 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-4 h-4 rounded-full" style={{ background: c.color, boxShadow: `0 0 10px ${c.color}55` }} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.28em' }}
                className="uppercase"
              >
                August 2026 — You'll be first.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="absolute bottom-7 z-30"
        style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.10)', letterSpacing: '0.25em' }}
        aria-hidden="true"
      >
        [TVP // DROP 002 — CLASSIFIED]
      </p>
    </div>
  )
}
