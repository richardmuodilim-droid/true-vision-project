import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mono, serif, inter, ease, reveal } from '../lib/design'

const PRICE = 38
const TOTAL = 50
const SIZES = ['S', 'M', 'L', 'XL']
const MEMBER_KEY = 'TrueVisionMember'

// Illustrative eye-chart lines for the sample preview (real photo replaces this block).
const CHART = [
  { t: 'NOBODY SAW US COMING',            s: 30 },
  { t: 'BUILT FROM NOTHING',              s: 22 },
  { t: 'WORN BY THOSE WHO UNDERSTAND',    s: 15 },
  { t: 'FROM TWO SMALL TOWNS',            s: 11 },
  { t: 'NEVER FORGET WHERE YOU CAME FROM', s: 8 },
  { t: 'YOU LOOKED PROPERLY — YOU\'RE ONE OF US', s: 6 },
]

function loadMember() {
  try { const r = localStorage.getItem(MEMBER_KEY); return r ? JSON.parse(r) : null } catch { return null }
}

export default function Edition01() {
  const [member, setMember]   = useState(null)
  const [size, setSize]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [counter, setCounter] = useState({ next: 23, remaining: 28 })
  const orderRef = useRef(null)

  const publicOpen = import.meta.env.VITE_EDITION01_PUBLIC === 'true'
  const canOrder = publicOpen || !!(member && member.userId)

  useEffect(() => {
    setMember(loadMember())
    fetch('/api/lookup?edition01=1')
      .then(r => r.json())
      .then(d => { if (d && typeof d.remaining === 'number') setCounter({ next: d.next, remaining: d.remaining }) })
      .catch(() => {})
  }, [])

  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: 'smooth' })

  const handleClaim = async (e) => {
    e.preventDefault()
    if (!size) { setError('Pick a size.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: member?.email || undefined,
          items: [{ name: 'Edition 01 — The Document', price: PRICE, qty: 1, color: 'Cream', size }],
        }),
      })
      const data = await res.json()
      if (res.ok && data.url) { window.location.href = data.url }
      else { setError(data.error || 'Could not start checkout.'); setLoading(false) }
    } catch { setError('Connection error. Try again.'); setLoading(false) }
  }

  return (
    <div className="bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      {/* ── 1. HERO ── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6" style={{ background: '#0a0909' }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 40%, rgba(255,255,255,0.05), transparent 62%)' }} />
        <div className="relative z-10 flex flex-col items-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.1 }}
            style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.5em' }} className="uppercase mb-9">
            [ Edition 01 — The Vision Chart ]
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease }}
            style={{ ...serif, fontSize: 'clamp(38px, 9vw, 76px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.01em' }} className="mb-6 max-w-3xl">
            You either see it,<br />or you don't.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }}
            style={{ ...mono, fontSize: 'clamp(9px, 1.8vw, 11px)', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.34em' }} className="uppercase mb-12">
            50 pieces. Numbered. Members first.
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            onClick={scrollToOrder}
            style={{ ...mono, fontSize: '10px', letterSpacing: '0.4em', border: '1px solid rgba(255,255,255,0.35)', color: '#F5F3EE' }}
            className="px-9 py-4 uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            Claim your number →
          </motion.button>
        </div>
      </section>

      {/* ── 2. THE TEST ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <motion.h2 {...reveal(0)} style={{ ...serif, fontSize: 'clamp(28px, 5.5vw, 46px)', color: '#111', fontWeight: 400, lineHeight: 1.12 }} className="mb-8 max-w-2xl">
          The back of this shirt is an eye test.
        </motion.h2>
        <motion.p {...reveal(0.08)} style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.9 }} className="max-w-2xl mb-14">
          Six lines. They shrink. Most people read the top from across the street — <span style={{ ...mono, fontSize: '0.85em', letterSpacing: '0.06em' }}>NOBODY SAW US COMING</span> — and keep walking. The ones who come closer find the smaller lines. The ones who look properly find the last one, and the last one opens a door. That's the whole idea of True Vision: some people see it. Most don't.
        </motion.p>

        {/* Sample visual — REAL photo replaces this block */}
        <motion.div {...reveal(0.12)}
          className="relative w-full max-w-lg mx-auto aspect-[4/5] flex flex-col items-center justify-center gap-3 px-6"
          style={{ background: '#111', border: '1px solid rgba(0,0,0,0.14)' }}>
          {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c,i)=>(
            <span key={i} aria-hidden="true" className={`absolute w-5 h-5 ${c}`} style={{ borderColor: 'rgba(255,255,255,0.14)' }} />
          ))}
          {CHART.map((line, i) => (
            <p key={i} style={{ ...mono, fontSize: `${line.s}px`, color: 'rgba(245,243,238,0.92)', letterSpacing: '0.08em', textAlign: 'center', lineHeight: 1.2 }}>
              {line.t}
            </p>
          ))}
          <span className="absolute bottom-3" style={{ ...mono, fontSize: '6px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.3em' }}>
            [ SAMPLE VISUAL — REAL PHOTO REPLACES THIS ]
          </span>
        </motion.div>
      </section>

      {/* ── 3. THE PIECE ── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.p {...reveal(0)} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-8">
          [ The Garment ]
        </motion.p>
        <div className="flex flex-col">
          {[
            'Heavyweight 240–280 GSM cotton — structured, boxy, dropped shoulder',
            'Cream, black print — one colourway, never repeated',
            'Every piece hand-numbered — N° __ of 50',
            'Inside the collar, a line only you will see',
            'Sizes S / M / L / XL',
          ].map((line, i) => (
            <motion.div key={i} {...reveal(0.04 + i * 0.05)} className="flex items-start gap-4 py-4" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.07)' }}>
              <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.1em', paddingTop: '3px' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.68)', letterSpacing: '0.06em', lineHeight: 1.7 }} className="uppercase">{line}</span>
            </motion.div>
          ))}
        </div>
        <motion.p {...reveal(0.3)} style={{ ...serif, fontSize: 'clamp(22px, 4vw, 32px)', color: '#111', fontWeight: 500 }} className="mt-8">
          €{PRICE} <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.2em' }}>+ €6 SHIPPING</span>
        </motion.p>
      </section>

      {/* ── 4. THE RULES ── */}
      <section className="px-6 sm:px-10 py-16 sm:py-24" style={{ background: '#111' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {[
            "Fifty pieces. When they're claimed, the door closes.",
            'Members see it 48 hours before anyone else.',
            'Every buyer receives 2 invites to bring their people in.',
            'Numbers are assigned in order of claim. Low numbers go first.',
          ].map((line, i) => (
            <motion.p key={i} {...reveal(i * 0.08)}
              style={{ ...mono, fontSize: 'clamp(10px, 1.8vw, 13px)', color: 'rgba(245,243,238,0.78)', letterSpacing: '0.14em', lineHeight: 1.6 }} className="uppercase">
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── 5. ORDER BLOCK ── */}
      <section ref={orderRef} className="max-w-md mx-auto px-6 py-20 sm:py-28 text-center scroll-mt-6">
        <motion.h2 {...reveal(0)} style={{ ...serif, fontSize: 'clamp(30px, 6vw, 48px)', color: '#111', fontWeight: 400 }} className="mb-6">
          Claim your number.
        </motion.h2>
        <motion.p {...reveal(0.06)} style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.28em' }} className="uppercase mb-12">
          N° {String(counter.next).padStart(2, '0')} — {counter.remaining} of {TOTAL} remaining
        </motion.p>

        {canOrder ? (
          <motion.div {...reveal(0.12)} className="flex flex-col items-center">
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.4em' }} className="uppercase mb-3">Size</p>
            <div className="flex gap-2 mb-8">
              {SIZES.map(s => (
                <button key={s} onClick={() => { setSize(s); setError('') }} aria-pressed={size === s}
                  className="w-12 h-12 transition-all duration-300 cursor-pointer"
                  style={{ ...mono, fontSize: '10px',
                    border: `1px solid ${size === s ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.12)'}`,
                    background: size === s ? '#111' : 'transparent', color: size === s ? '#F5F3EE' : 'rgba(0,0,0,0.55)' }}>
                  {s}
                </button>
              ))}
            </div>
            {error && <p style={{ ...mono, fontSize: '9px', color: 'rgba(200,80,80,0.75)', letterSpacing: '0.08em' }} className="mb-4">{error}</p>}
            <button onClick={handleClaim} disabled={loading}
              style={{ ...mono, fontSize: '11px', letterSpacing: '0.32em', background: '#111', color: '#F5F3EE' }}
              className="w-full py-[20px] uppercase hover:bg-[#2a2a2a] disabled:opacity-50 active:scale-[0.98] transition-all duration-300">
              {loading ? 'Processing…' : `Claim N° ${String(counter.next).padStart(2, '0')} — €${PRICE}`}
            </button>
            <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.14em', lineHeight: 1.9 }} className="uppercase mt-5">
              Pre-order. Production starts when the edition is claimed. Ships in 3–4 weeks. You'll see everything — we film the whole process.
            </p>
          </motion.div>
        ) : (
          <motion.div {...reveal(0.12)} className="flex flex-col items-center gap-5">
            <p style={{ ...mono, fontSize: '11px', color: '#111', letterSpacing: '0.3em' }} className="uppercase">Members go first.</p>
            <Link to="/archive"
              style={{ ...mono, fontSize: '10px', letterSpacing: '0.36em', background: '#111', color: '#F5F3EE' }}
              className="px-9 py-4 uppercase hover:bg-[#2a2a2a] transition-all duration-300">
              Request access →
            </Link>
          </motion.div>
        )}
      </section>

      {/* ── 6. FOOTER LINE ── */}
      <footer className="px-6 py-14 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.3em' }} className="uppercase mb-2">
          Built from nothing · Ireland × Italy · Est. 2026
        </p>
        <p style={{ ...serif, fontSize: '16px', color: 'rgba(0,0,0,0.6)', fontStyle: 'italic' }}>
          Never forget where you came from.
        </p>
      </footer>
    </div>
  )
}
