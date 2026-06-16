import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mono, serif, inter, ease, reveal, lineGrow } from '../lib/design'

const COLOURWAYS = [
  { id: 'black', label: 'Black', panel: '#111111', logoInvert: false },
  { id: 'cream', label: 'Cream', panel: '#E8E6E1', logoInvert: true },
]
const SIZES = ['S', 'M', 'L', 'XL']
const PRICE = 25

const MEMBER_KEY = 'TrueVisionMember'
function loadMember() {
  try { const r = localStorage.getItem(MEMBER_KEY); return r ? JSON.parse(r) : null } catch { return null }
}

const SectionTag = ({ n, label }) => (
  <div className="flex items-center gap-4 mb-10 sm:mb-14">
    <motion.div {...lineGrow()} className="h-px w-10 origin-left shrink-0" style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />
    <motion.p {...reveal(0.05, 0)} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.42em' }} className="uppercase">
      {n} / {label}
    </motion.p>
  </div>
)

export default function Tee() {
  const [colour, setColour]   = useState('black')
  const [size, setSize]       = useState('')
  const [qty, setQty]         = useState(1)
  const [email, setEmail]     = useState('')
  const [name, setName]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [member, setMember]   = useState(null)

  useEffect(() => { setMember(loadMember()) }, [])

  const active = COLOURWAYS.find(c => c.id === colour)
  const subtotal = PRICE * qty
  const shipping = qty * 6
  const total = subtotal + shipping

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!size)  { setError('Pick a size.'); return }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email.'); return }
    if (!name)  { setError('Enter your name.'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/create-tee-checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), colour, size, qty }),
      })
      const data = await res.json()
      if (res.ok && data.url) { window.location.href = data.url }
      else { setError(data.error || 'Checkout failed.'); setLoading(false) }
    } catch { setError('Connection error. Try again.'); setLoading(false) }
  }

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 sm:px-12 text-center pt-28 sm:pt-32 pb-10">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.08, ease }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }} className="uppercase mb-7">
          Wear it. Represent it.
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease }}
          style={{ ...serif, fontSize: 'clamp(44px, 9vw, 72px)', color: '#111111', fontWeight: 400, lineHeight: 1.08 }} className="mb-5">
          The Tee.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.28, ease }}
          style={{ ...mono, fontSize: 'clamp(8px, 1.6vw, 9px)', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.28em' }} className="uppercase">
          The simplest way to be part of this.
        </motion.p>
      </section>

      {/* Product */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-start">

          {/* Visual — logo print on colourway panel.
              Swap this block for real product photos when shot: drop /tee-black.jpg + /tee-cream.jpg
              and replace the panel with an <img>. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.75, ease }}
            className="relative w-full aspect-[4/5] overflow-hidden flex items-center justify-center"
            style={{ background: active.panel, transition: 'background 0.5s ease' }}
          >
            {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r',
              'bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c,i)=>(
              <span key={i} aria-hidden="true" className={`absolute w-5 h-5 z-10 ${c}`}
                style={{ borderColor: active.logoInvert ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.14)' }} />
            ))}
            <img src="/logo.svg" alt="True Vision Project — The Tee"
              className="w-[42%] max-w-[200px] h-auto object-contain select-none"
              style={{ filter: active.logoInvert ? 'none' : 'invert(1)', opacity: 0.92 }}
              draggable="false" />
            <p className="absolute bottom-4 left-0 right-0 text-center"
              style={{ ...mono, fontSize: '7px', letterSpacing: '0.42em',
                color: active.logoInvert ? 'rgba(0,0,0,0.30)' : 'rgba(255,255,255,0.30)' }}>
              TVP-TEE-001 — {active.label.toUpperCase()}
            </p>
          </motion.div>

          {/* Detail + buy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.75, delay: 0.1, ease }}
            className="flex flex-col"
          >
            <div className="grid grid-cols-3 gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              {[['€25','Each'], ['2','Colourways'], ['S–XL','Sizing']].map(([n,l]) => (
                <div key={l}>
                  <p style={{ ...serif, fontSize: 'clamp(22px, 4vw, 32px)', color: '#111111', fontWeight: 500, lineHeight: 1 }} className="mb-1">{n}</p>
                  <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.28em' }} className="uppercase">{l}</p>
                </div>
              ))}
            </div>

            <p style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.60)', lineHeight: 1.8 }} className="mb-8">
              Heavyweight cotton. The mark on the chest. Clean, simple, made to wear every day.
              When you put it on, you're not wearing a logo — you're representing the movement.
            </p>

            {/* Colourway */}
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.4em' }} className="uppercase mb-3">Colourway</p>
            <div className="flex gap-3 mb-7">
              {COLOURWAYS.map(c => (
                <button key={c.id} onClick={() => setColour(c.id)} aria-pressed={colour === c.id}
                  className="flex items-center gap-2 px-4 py-2 transition-all duration-300 cursor-pointer"
                  style={{ border: `1px solid ${colour === c.id ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.12)'}` }}>
                  <span className="w-3 h-3 rounded-full" style={{ background: c.panel, border: '1px solid rgba(0,0,0,0.15)' }} />
                  <span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.65)', letterSpacing: '0.18em' }} className="uppercase">{c.label}</span>
                </button>
              ))}
            </div>

            {/* Size */}
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.4em' }} className="uppercase mb-3">Size</p>
            <div className="flex gap-2 mb-7">
              {SIZES.map(s => (
                <button key={s} onClick={() => { setSize(s); setError('') }} aria-pressed={size === s}
                  className="w-12 h-12 transition-all duration-300 cursor-pointer"
                  style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em',
                    border: `1px solid ${size === s ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.12)'}`,
                    background: size === s ? '#111111' : 'transparent',
                    color: size === s ? '#F5F3EE' : 'rgba(0,0,0,0.55)' }}>
                  {s}
                </button>
              ))}
            </div>

            {/* Qty */}
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.4em' }} className="uppercase mb-3">Quantity</p>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity"
                className="w-10 h-10 flex items-center justify-center cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.12)', ...mono, color: 'rgba(0,0,0,0.55)' }}>−</button>
              <span style={{ ...mono, fontSize: '13px', color: '#111111' }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(10, q + 1))} aria-label="Increase quantity"
                className="w-10 h-10 flex items-center justify-center cursor-pointer" style={{ border: '1px solid rgba(0,0,0,0.12)', ...mono, color: 'rgba(0,0,0,0.55)' }}>+</button>
            </div>

            {member && (
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
                <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.18em' }} className="uppercase">
                  {member.name ? `${member.name.split(' ')[0]} — ` : ''}You're a member. You're part of this.
                </span>
              </div>
            )}

            {/* Totals */}
            <div className="flex flex-col gap-2 mb-5 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div className="flex justify-between"><span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.2em' }} className="uppercase">Subtotal</span><span style={{ ...mono, fontSize: '11px', color: '#111111' }}>€{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.2em' }} className="uppercase">Shipping</span><span style={{ ...mono, fontSize: '11px', color: '#111111' }}>€{shipping.toFixed(2)}</span></div>
              <div className="flex justify-between"><span style={{ ...mono, fontSize: '10px', color: '#111111', letterSpacing: '0.2em' }} className="uppercase">Total</span><span style={{ ...serif, fontSize: '20px', color: '#111111', fontWeight: 400 }}>€{total.toFixed(2)}</span></div>
            </div>

            <form onSubmit={handleCheckout} className="flex flex-col gap-3">
              <input type="email" placeholder="YOUR@EMAIL.COM" value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', color: '#111111', caretColor: '#111111', background: 'rgba(0,0,0,0.02)' }}
                className="w-full h-[48px] border border-black/12 outline-none px-4 text-center uppercase placeholder:text-black/20 focus:border-black/25 transition-colors" />
              <input type="text" placeholder="YOUR FULL NAME" value={name}
                onChange={e => { setName(e.target.value); setError('') }}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', color: '#111111', caretColor: '#111111', background: 'rgba(0,0,0,0.02)' }}
                className="w-full h-[48px] border border-black/12 outline-none px-4 text-center uppercase placeholder:text-black/20 focus:border-black/25 transition-colors" />
              {error && <p style={{ ...mono, fontSize: '9px', color: 'rgba(200,80,80,0.75)', letterSpacing: '0.08em' }} className="text-center">{error}</p>}
              <button type="submit" disabled={loading}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.40em', background: '#111111', color: '#F5F3EE' }}
                className="w-full py-[18px] uppercase hover:bg-[#2a2a2a] disabled:opacity-50 active:scale-[0.98] transition-all duration-300">
                {loading ? 'Processing...' : '[ Checkout ]'}
              </button>
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.18em' }} className="text-center">
                Secure checkout. Ships in 3–5 days, rolled and protected.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Movement line */}
      <section className="w-full max-w-3xl mx-auto px-6 sm:px-10 py-12 sm:py-16 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <SectionTag n="02" label="Why Wear It" />
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }}
          style={{ ...serif, fontSize: 'clamp(22px, 4.5vw, 34px)', color: '#111111', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.4 }}>
          "Built from nothing.<br />Worn by those who understand."
        </motion.p>
        <motion.div {...reveal(0.14)} className="mt-9">
          <Link to="/archive" style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.28)', borderBottom: '1px solid rgba(0,0,0,0.09)' }}
            className="uppercase pb-px hover:opacity-50 transition-opacity duration-300">
            Join the Movement →
          </Link>
        </motion.div>
      </section>

      <div className="flex items-center justify-center py-12">
        <Link to="/" style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity">← True Vision Project</Link>
      </div>
    </div>
  )
}
