import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const mono = { fontFamily: "'Space Mono', monospace" }

// Scrambles text with random chars then resolves to the real string
function useScramble(target, { startDelay = 0, duration = 600 } = {}) {
  const [output, setOutput] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\[]{}#@!%'

  useEffect(() => {
    let raf
    let start = null
    let timeout

    const rand = () => chars[Math.floor(Math.random() * chars.length)]

    const tick = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const resolved = Math.floor(progress * target.length)
      const scrambled = target
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' '
          if (i < resolved) return ch
          return rand()
        })
        .join('')
      setOutput(scrambled)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    timeout = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, startDelay)

    return () => { cancelAnimationFrame(raf); clearTimeout(timeout) }
  }, [target, startDelay, duration])

  return output
}

// Status lines that appear sequentially
const STATUS_LINES = [
  { text: 'VERIFYING ACCESS TOKEN...',  delay: 0 },
  { text: 'DECRYPTING ARCHIVE...',      delay: 340 },
  { text: 'LOADING ASSET DATA...',      delay: 680 },
  { text: 'ARCHIVE UNLOCKED.',          delay: 980 },
]

function StatusLine({ text, delay, onDone }) {
  const [visible, setVisible] = useState(false)
  const scrambled = useScramble(text, { startDelay: delay + 40, duration: 320 })

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (onDone) {
      const t = setTimeout(onDone, delay + 360)
      return () => clearTimeout(t)
    }
  }, [delay, onDone])

  if (!visible) return null
  return (
    <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.2em', lineHeight: '2' }}
      className="text-white/40">
      {scrambled || text}
    </p>
  )
}

export default function DecryptionScreen({ onComplete }) {
  const headline = useScramble('LOADING ARCHIVE...', { startDelay: 80, duration: 500 })

  // Trigger onComplete after the full sequence (last status + small buffer)
  useEffect(() => {
    const t = setTimeout(onComplete, 1500)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-[#000] flex flex-col items-center justify-center overflow-hidden">

      {/* Scanning line — sweeps top → bottom once */}
      <motion.div
        aria-hidden="true"
        className="absolute left-0 right-0 z-20 pointer-events-none"
        style={{ height: '2px' }}
        initial={{ top: '-2px' }}
        animate={{ top: '100%' }}
        transition={{ duration: 1.1, delay: 0.1, ease: 'linear' }}
      >
        {/* Core line */}
        <div className="w-full h-full bg-white/70" />
        {/* Soft glow beneath */}
        <div
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '80px',
            marginTop: '-78px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.08) 100%)',
          }}
        />
      </motion.div>

      {/* Flicker overlay — rapid opacity pulses */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-white pointer-events-none"
        animate={{ opacity: [0, 0.04, 0, 0.06, 0, 0.03, 0, 0.05, 0] }}
        transition={{ duration: 1.2, ease: 'linear', times: [0, 0.1, 0.2, 0.35, 0.45, 0.6, 0.72, 0.88, 1] }}
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center gap-10 px-8 w-full max-w-sm">

        {/* Main headline — scrambles in */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{ ...mono, fontSize: '13px', color: '#ffffff', letterSpacing: '0.35em' }}
          className="uppercase text-center"
        >
          {headline || 'LOADING ARCHIVE...'}
        </motion.p>

        {/* Divider */}
        <div className="w-px h-8 bg-white/10" aria-hidden="true" />

        {/* Status log */}
        <div className="flex flex-col items-start w-full gap-0">
          {STATUS_LINES.map((line, i) => (
            <StatusLine
              key={line.text}
              text={line.text}
              delay={line.delay}
              onDone={i === STATUS_LINES.length - 1 ? undefined : undefined}
            />
          ))}
        </div>
      </div>

      {/* Corner marks */}
      {[
        'top-6 left-6 border-t border-l',
        'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l',
        'bottom-6 right-6 border-b border-r',
      ].map((cls, i) => (
        <span key={i} aria-hidden="true"
          className={`absolute w-5 h-5 border-white/10 z-30 ${cls}`} />
      ))}

      {/* Bottom stamp */}
      <p
        className="absolute bottom-7 z-30"
        style={{ ...mono, fontSize: '8px', color: '#222', letterSpacing: '0.25em' }}
        aria-hidden="true"
      >
        [TVP // SECURE ACCESS]
      </p>
    </div>
  )
}
