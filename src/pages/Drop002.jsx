import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mono, serif, inter, ease, reveal } from '../lib/design'

const PRICE = 70
const TOTAL = 100
const SIZES = ['S', 'M', 'L']
const MEMBER_KEY = 'TrueVisionMember'

const COLORWAYS = [
  { id: 'pink',   name: 'Pink / Black',      accent: '#EC008C', img: '/ts-pink.jpg' },
  { id: 'blue',   name: 'Light Blue / Grey', accent: '#7DD3DA', img: '/ts-blue.jpg' },
  { id: 'purple', name: 'Purple / Black',    accent: '#7B2FBE', img: '/ts-purple.jpg' },
]

function loadMember() {
  try { const r = localStorage.getItem(MEMBER_KEY); return r ? JSON.parse(r) : null } catch { return null }
}

export default function Drop002() {
  const [member, setMember]     = useState(null)
  const [colorway, setColorway] = useState('')
  const [size, setSize]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [counter, setCounter]   = useState({ next: 23, remaining: 78 })
  const orderRef = useRef(null)

  const publicOpen = import.meta.env.VITE_TRACKSUIT_PUBLIC === 'true'
  const canOrder = publicOpen || !!(member && member.userId)
  const activeCw = COLORWAYS.find(c => c.id === colorway)

  useEffect(() => {
    setMember(loadMember())
    fetch('/api/lookup?tracksuit=1')
      .then(r => r.json())
      .then(d => { if (d && typeof d.remaining === 'number') setCounter({ next: d.next, remaining: d.remaining }) })
      .catch(() => {})
  }, [])

  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: 'smooth' })

  const handleClaim = async (e) => {
    e.preventDefault()
    if (!colorway) { setError('Choose your version.'); return }
    if (!size) { setError('Pick a size.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: member?.email || undefined,
          items: [{ name: 'TVP Hidden-Pocket Tracksuit', price: PRICE, qty: 1, color: activeCw?.name, size }],
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
            [ TVP // The Hidden-Pocket Tracksuit ]
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease }}
            style={{ ...serif, fontSize: 'clamp(42px, 10vw, 88px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.01em' }} className="mb-6">
            You'll never find it.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.4 }}
            style={{ ...mono, fontSize: 'clamp(9px, 1.8vw, 11px)', color: 'rgba(255,255,255,0.42)', letterSpacing: '0.32em' }} className="uppercase mb-12">
            A pocket only the owner knows. Three versions. Numbered.
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
            onClick={scrollToOrder}
            style={{ ...mono, fontSize: '10px', letterSpacing: '0.4em', border: '1px solid rgba(255,255,255,0.35)', color: '#F5F3EE' }}
            className="px-9 py-4 uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
            Claim yours →
          </motion.button>
        </div>
      </section>

      {/* ── 2. THE SECRET ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div {...reveal(0)}>
            <h2 style={{ ...serif, fontSize: 'clamp(28px, 5.5vw, 44px)', color: '#111', fontWeight: 400, lineHeight: 1.12 }} className="mb-6">
              Every tracksuit hides a pocket.
            </h2>
            <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.9 }}>
              A seamless zip on the jacket. A hidden pocket sewn inside the waistband. Invisible when closed — impossible to find unless you know it's there. Your cash, your keys, your cards, held where nobody looks. Some things are only for the ones who understand.
            </p>
          </motion.div>
          <motion.div {...reveal(0.12)} className="relative w-full aspect-[4/5] overflow-hidden" style={{ background: '#111' }}>
            {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c,i)=>(
              <span key={i} aria-hidden="true" className={`absolute w-5 h-5 z-10 ${c}`} style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
            ))}
            <img src="/ts-pocket.jpg" alt="Hidden pocket — closed to open"
              className="w-full h-full object-cover" style={{ filter: 'saturate(0.9) brightness(0.85)' }}
              onError={e => { e.currentTarget.style.display = 'none' }} />
          </motion.div>
        </div>
      </section>

      {/* ── 3. THE THREE ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.p {...reveal(0)} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-8">
          [ Choose your version ]
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {COLORWAYS.map((c, i) => (
            <motion.button key={c.id} {...reveal(i * 0.08)}
              onClick={() => { setColorway(c.id); setError(''); }}
              aria-pressed={colorway === c.id}
              className="flex flex-col text-left cursor-pointer transition-all duration-300"
              style={{ border: `1px solid ${colorway === c.id ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.10)'}`, padding: '10px' }}>
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-3"
                style={{ background: `linear-gradient(160deg, ${c.accent}22, #1a1a1a 85%)` }}>
                <img src={c.img} alt={c.name} className="absolute inset-0 w-full h-full object-cover"
                  onError={e => { e.currentTarget.style.display = 'none' }} />
                <span className="absolute top-3 left-3 w-3 h-3 rounded-full z-10" style={{ background: c.accent, boxShadow: `0 0 10px ${c.accent}` }} />
                {colorway === c.id && (
                  <span className="absolute bottom-3 right-3 z-10" style={{ ...mono, fontSize: '8px', color: '#fff', letterSpacing: '0.2em' }}>✓ SELECTED</span>
                )}
              </div>
              <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.7)', letterSpacing: '0.14em' }} className="uppercase">{c.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── 4. THE PIECE ── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.p {...reveal(0)} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-8">
          [ The Set — Jacket + Bottoms ]
        </motion.p>
        <div className="flex flex-col">
          {[
            '92% Polyester / 8% Elastane · ~300 GSM · Four-way stretch',
            'Moisture-wicking · Breathable · Athletic fit',
            'Hidden zip pocket (jacket) + hidden waistband pocket (bottoms)',
            'TV embroidered — left chest + back neck',
            'Each set numbered — N° __ / 100',
            'Sizes S / M / L',
          ].map((line, i) => (
            <motion.div key={i} {...reveal(0.04 + i * 0.05)} className="flex items-start gap-4 py-4" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.07)' }}>
              <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.1em', paddingTop: '3px' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.68)', letterSpacing: '0.06em', lineHeight: 1.7 }} className="uppercase">{line}</span>
            </motion.div>
          ))}
        </div>
        <motion.p {...reveal(0.34)} style={{ ...serif, fontSize: 'clamp(22px, 4vw, 32px)', color: '#111', fontWeight: 500 }} className="mt-8">
          €{PRICE} <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.2em' }}>+ €6 SHIPPING</span>
        </motion.p>
      </section>

      {/* ── 5. THE RULES ── */}
      <section className="px-6 sm:px-10 py-16 sm:py-24" style={{ background: '#111' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {[
            'One hundred sets. Numbered. Never repeated.',
            'Members see it 48 hours before anyone.',
            'Every buyer receives 2 invites.',
            "Pre-order funds the drop. When it's claimed, the door closes.",
          ].map((line, i) => (
            <motion.p key={i} {...reveal(i * 0.08)}
              style={{ ...mono, fontSize: 'clamp(10px, 1.8vw, 13px)', color: 'rgba(245,243,238,0.78)', letterSpacing: '0.14em', lineHeight: 1.6 }} className="uppercase">
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── 6. ORDER BLOCK ── */}
      <section ref={orderRef} className="max-w-md mx-auto px-6 py-20 sm:py-28 text-center scroll-mt-6">
        <motion.h2 {...reveal(0)} style={{ ...serif, fontSize: 'clamp(30px, 6vw, 48px)', color: '#111', fontWeight: 400 }} className="mb-6">
          Claim your number.
        </motion.h2>
        <motion.p {...reveal(0.06)} style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.28em' }} className="uppercase mb-12">
          N° {String(counter.next).padStart(2, '0')} — {counter.remaining} of {TOTAL} remaining
        </motion.p>

        {canOrder ? (
          <motion.div {...reveal(0.12)} className="flex flex-col items-center">
            {/* Colorway (mirror of section 3) */}
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.4em' }} className="uppercase mb-3">Version</p>
            <div className="flex gap-2 mb-7">
              {COLORWAYS.map(c => (
                <button key={c.id} onClick={() => { setColorway(c.id); setError('') }} aria-pressed={colorway === c.id}
                  className="flex items-center gap-2 px-3 h-11 transition-all duration-300 cursor-pointer"
                  style={{ border: `1px solid ${colorway === c.id ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.12)'}` }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: c.accent }} />
                  <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.6)', letterSpacing: '0.1em' }} className="uppercase">{c.name}</span>
                </button>
              ))}
            </div>

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
              Pre-order. Production starts when the drop is claimed. Ships in 3–4 weeks. We film the whole process.
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

      {/* ── 7. FOOTER ── */}
      <footer className="px-6 py-14 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.3em' }} className="uppercase mb-2">
          Built from nothing · Ireland × Italy · Est. 2026
        </p>
        <p style={{ ...serif, fontSize: '16px', color: 'rgba(0,0,0,0.6)', fontStyle: 'italic' }}>
          Nobody saw us coming.
        </p>
      </footer>
    </div>
  )
}
