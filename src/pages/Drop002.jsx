import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mono, serif, inter, ease, reveal } from '../lib/design'

const PRICE = 70
const RETAIL = 80
const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const MEMBER_KEY = 'TrueVisionMember'

// Each colourway is cropped straight out of the poster (3 tracksuits side by side):
// pink = left third, grey/blue = centre, purple = right third.
// img = individual colour photo (drop into public/). Until it exists, the poster crop (pos) shows.
const COLORWAYS = [
  { id: 'pink',   name: 'Pink / Black',      accent: '#EC008C', pos: '0% 26%',   img: '/ts-pink.jpg' },
  { id: 'blue',   name: 'Light Blue / Grey', accent: '#7DD3DA', pos: '50% 26%',  img: '/ts-blue.jpg' },
  { id: 'purple', name: 'Purple / Black',    accent: '#7B2FBE', pos: '100% 26%', img: '/ts-purple.jpg' },
]

const boom = (d = 0) => ({
  initial: { opacity: 0, scale: 0.92, y: 20 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay: d, ease: [0.16, 1, 0.3, 1] },
})

function loadMember() {
  try { const r = localStorage.getItem(MEMBER_KEY); return r ? JSON.parse(r) : null } catch { return null }
}

export default function Drop002() {
  const [member, setMember]     = useState(null)
  const [colorway, setColorway] = useState('')
  const [size, setSize]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [counter, setCounter]   = useState({ next: 1 })
  const orderRef = useRef(null)

  const canOrder = import.meta.env.VITE_TRACKSUIT_PUBLIC !== 'false'
  const activeCw = COLORWAYS.find(c => c.id === colorway)

  useEffect(() => {
    setMember(loadMember())
    fetch('/api/lookup?tracksuit=1')
      .then(r => r.json())
      .then(d => { if (d && typeof d.next === 'number') setCounter({ next: d.next }) })
      .catch(() => {})
  }, [])

  const scrollToOrder = () => orderRef.current?.scrollIntoView({ behavior: 'smooth' })

  const handleClaim = async (e) => {
    e.preventDefault()
    if (!colorway) { setError('Choose your colour.'); return }
    if (!size) { setError('Pick a size.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: member?.email || undefined,
          items: [{ name: 'TVP Hidden-Pocket Tracksuit', price: PRICE, qty: 1, color: activeCw?.name, size }],
          meta: { drop: 'tracksuit', colour: activeCw?.name, size },
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

      {/* Free-shipping announcement bar */}
      <div className="w-full text-center py-3 px-4" style={{ background: '#111' }}>
        <span style={{ ...mono, fontSize: 'clamp(7px, 1.7vw, 9px)', color: '#F5F3EE', letterSpacing: '0.26em' }} className="uppercase">
          ★ &nbsp; Free Shipping Worldwide &nbsp;·&nbsp; Limited Drop &nbsp;·&nbsp; Pre-Order Live &nbsp; ★
        </span>
      </div>

      {/* ── 1. HERO — big poster, PRE-ORDER LIVE ── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-5 py-16" style={{ background: '#0a0909' }}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.06), transparent 65%)' }} />
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* Pulsing PRE-ORDER LIVE */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-7">
            <motion.span className="w-2 h-2 rounded-full" style={{ background: '#ff3b3b' }}
              animate={{ opacity: [1, 0.2, 1], scale: [1, 0.8, 1] }} transition={{ duration: 1.3, repeat: Infinity }} />
            <span style={{ ...mono, fontSize: 'clamp(9px, 2vw, 11px)', color: '#F5F3EE', letterSpacing: '0.42em' }} className="uppercase">
              Pre-Order Is Live
            </span>
          </motion.div>

          {/* Big poster */}
          <motion.img src="/pre-order.jpg" alt="TVP Tracksuit — three colours"
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }}
            className="w-full max-w-[560px] h-auto object-contain select-none"
            style={{ maxHeight: '58vh', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
            onError={e => { e.currentTarget.style.display = 'none' }} draggable="false" />

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ ...serif, fontSize: 'clamp(26px, 6vw, 46px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.05 }} className="mt-8 mb-2">
            You'll never find it.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            style={{ ...mono, fontSize: 'clamp(8px, 1.6vw, 10px)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em' }} className="uppercase mb-4">
            A pocket only the owner knows · Three colours · Numbered
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
            style={{ ...mono, fontSize: 'clamp(8px, 1.6vw, 10px)', color: '#F5F3EE', letterSpacing: '0.34em' }} className="uppercase mb-9">
            ✦ Free Shipping Worldwide ✦
          </motion.p>

          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
            onClick={scrollToOrder}
            style={{ ...mono, fontSize: 'clamp(10px, 2vw, 12px)', letterSpacing: '0.4em', background: '#F5F3EE', color: '#111' }}
            className="px-10 py-5 uppercase hover:bg-white active:scale-95 transition-all duration-300 cursor-pointer">
            Claim yours — €{PRICE} →
          </motion.button>
        </div>
      </section>

      {/* ── 2. THE SECRET — scanning pocket reveal ── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div {...boom(0)}>
            <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-5">[ The Secret ]</p>
            <h2 style={{ ...serif, fontSize: 'clamp(30px, 6vw, 50px)', color: '#111', fontWeight: 400, lineHeight: 1.08 }} className="mb-6">
              Every tracksuit<br />hides a pocket.
            </h2>
            <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.62)', lineHeight: 1.9 }}>
              A seamless zip on the jacket. A hidden pocket sewn inside the waistband. Invisible when closed — impossible to find unless you know it's there. Your cash, your keys, your cards, held where nobody looks. Some things are only for the ones who understand.
            </p>
          </motion.div>
          {/* Scanning image */}
          <motion.div {...boom(0.12)} className="relative w-full aspect-[4/5] overflow-hidden" style={{ background: '#111' }}>
            {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r','bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c,i)=>(
              <span key={i} aria-hidden="true" className={`absolute w-5 h-5 z-20 ${c}`} style={{ borderColor: 'rgba(255,255,255,0.18)' }} />
            ))}
            <img src="/ts-pocket.jpg" alt="Hidden pocket" className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.9) brightness(0.8)' }} onError={e => { e.currentTarget.style.display = 'none' }} />
            {/* scan line */}
            <motion.div aria-hidden="true" className="absolute left-0 right-0 z-10" style={{ height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)', boxShadow: '0 0 14px rgba(255,255,255,0.5)' }}
              initial={{ top: '0%' }} animate={{ top: ['2%', '96%', '2%'] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="absolute bottom-3 left-3 z-20" style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.3em' }}>[ SCANNING — POCKET FOUND ]</span>
          </motion.div>
        </div>
      </section>

      {/* ── 3. THE THREE — punchy colour cards from the poster ── */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.p {...boom(0)} style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-3">[ Choose your colour ]</motion.p>
        <motion.h2 {...boom(0.05)} style={{ ...serif, fontSize: 'clamp(28px, 5.5vw, 44px)', color: '#111', fontWeight: 400, lineHeight: 1.1 }} className="mb-12">
          Three colours. One standard.<br /><span style={{ fontStyle: 'italic', opacity: 0.7 }}>Which one are you?</span>
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {COLORWAYS.map((c, i) => {
            const sel = colorway === c.id
            return (
              <motion.button key={c.id} {...boom(i * 0.1)}
                onClick={() => { setColorway(c.id); setError(''); }} aria-pressed={sel}
                whileHover={{ y: -6 }}
                className="group flex flex-col text-left cursor-pointer transition-all duration-300"
                style={{ border: `1.5px solid ${sel ? c.accent : 'rgba(0,0,0,0.10)'}`, padding: '8px',
                  boxShadow: sel ? `0 18px 50px ${c.accent}40` : 'none', background: '#0a0909' }}>
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                    {/* base: crop from the poster (fallback) */}
                    <img src="/pre-order.jpg" alt="" aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: c.pos }} />
                    {/* individual colour photo — shows once added, hides if missing */}
                    <img src={c.img} alt={c.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={e => { e.currentTarget.style.display = 'none' }} />
                  </div>
                  <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 55%, ${c.accent}30, #0a0909f0)` }} />
                  <span className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full z-10" style={{ background: c.accent, boxShadow: `0 0 14px ${c.accent}` }} />
                  {sel && <span className="absolute top-3 right-3 z-10" style={{ ...mono, fontSize: '8px', color: '#fff', letterSpacing: '0.2em' }}>✓ YOURS</span>}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <span style={{ ...mono, fontSize: 'clamp(11px, 2.4vw, 13px)', color: '#fff', letterSpacing: '0.14em' }} className="uppercase font-bold">{c.name}</span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* ── 4. THE PIECE ── */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-20" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <motion.p {...boom(0)} style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-8">[ The Set — Jacket + Bottoms ]</motion.p>
        <div className="flex flex-col">
          {[
            '92% Polyester / 8% Elastane · ~300 GSM · Four-way stretch',
            'Moisture-wicking · Breathable · Athletic fit',
            'Hidden zip pocket (jacket) + hidden waistband pocket (bottoms)',
            'TV embroidered — left chest + back neck',
            'Each set numbered in order of purchase',
            'Sizes S / M / L / XL / XXL',
          ].map((line, i) => (
            <motion.div key={i} {...boom(0.04 + i * 0.05)} className="flex items-start gap-4 py-4" style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.07)' }}>
              <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.1em', paddingTop: '3px' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.68)', letterSpacing: '0.06em', lineHeight: 1.7 }} className="uppercase">{line}</span>
            </motion.div>
          ))}
        </div>
        <motion.div {...boom(0.34)} className="mt-8 flex items-baseline gap-4 flex-wrap">
          <p style={{ ...serif, fontSize: 'clamp(26px, 5vw, 38px)', color: '#111', fontWeight: 500 }}>
            €{PRICE} <span style={{ ...mono, fontSize: '10px', color: '#111', letterSpacing: '0.2em' }}>· FREE SHIPPING</span>
          </p>
          <p style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.14em' }} className="uppercase">
            Pre-order price · <span style={{ textDecoration: 'line-through' }}>€{RETAIL}</span> after the drop
          </p>
        </motion.div>
      </section>

      {/* ── 5. THE RULES ── */}
      <section className="px-6 sm:px-10 py-16 sm:py-24" style={{ background: '#111' }}>
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {[
            'Limited pre-order. Every set numbered in order of purchase.',
            'When the pre-order closes, production begins.',
            'No additional stock guaranteed. Not available in stores.',
            'Ships 2–3 weeks after the pre-order closes.',
          ].map((line, i) => (
            <motion.p key={i} {...boom(i * 0.08)}
              style={{ ...mono, fontSize: 'clamp(11px, 1.9vw, 14px)', color: 'rgba(245,243,238,0.82)', letterSpacing: '0.14em', lineHeight: 1.6 }} className="uppercase">
              {line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── 6. ORDER BLOCK ── */}
      <section ref={orderRef} className="max-w-md mx-auto px-6 py-20 sm:py-28 text-center scroll-mt-6">
        <motion.h2 {...boom(0)} style={{ ...serif, fontSize: 'clamp(32px, 6.5vw, 50px)', color: '#111', fontWeight: 400 }} className="mb-5">
          Pre-order the tracksuit.
        </motion.h2>
        <motion.p {...boom(0.06)} style={{ ...mono, fontSize: '11px', color: '#111', letterSpacing: '0.24em' }} className="uppercase mb-2">
          €{PRICE} · Free shipping
        </motion.p>
        <motion.p {...boom(0.1)} style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.2em' }} className="uppercase mb-12">
          Numbered in order · you'll be N° {String(counter.next).padStart(3, '0')}
        </motion.p>

        {canOrder ? (
          <motion.div {...boom(0.12)} className="flex flex-col items-center">
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.4em' }} className="uppercase mb-3">Colour</p>
            <div className="flex flex-wrap justify-center gap-2 mb-7">
              {COLORWAYS.map(c => (
                <button key={c.id} onClick={() => { setColorway(c.id); setError('') }} aria-pressed={colorway === c.id}
                  className="flex items-center gap-2 px-3 h-11 transition-all duration-300 cursor-pointer"
                  style={{ border: `1.5px solid ${colorway === c.id ? c.accent : 'rgba(0,0,0,0.12)'}`,
                    boxShadow: colorway === c.id ? `0 6px 18px ${c.accent}40` : 'none' }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: c.accent }} />
                  <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.65)', letterSpacing: '0.1em' }} className="uppercase">{c.name}</span>
                </button>
              ))}
            </div>

            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.4em' }} className="uppercase mb-3">Size</p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
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

            {error && <p style={{ ...mono, fontSize: '9px', color: 'rgba(200,80,80,0.8)', letterSpacing: '0.08em' }} className="mb-4">{error}</p>}
            <motion.button onClick={handleClaim} disabled={loading} whileTap={{ scale: 0.97 }}
              style={{ ...mono, fontSize: '13px', letterSpacing: '0.3em', background: '#111', color: '#F5F3EE' }}
              className="w-full py-[24px] uppercase hover:bg-[#2a2a2a] disabled:opacity-50 transition-all duration-300">
              {loading ? 'Processing…' : `Pre-order now — €${PRICE}`}
            </motion.button>
            <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.12em', lineHeight: 2 }} className="uppercase mt-5">
              Free shipping worldwide · €{RETAIL} after the drop<br />
              Numbered in order — the earlier you order, the lower your N°<br />
              Your number arrives by email · ships 2–3 weeks after the pre-order closes
            </p>
          </motion.div>
        ) : (
          <motion.div {...boom(0.12)} className="flex flex-col items-center gap-5">
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
