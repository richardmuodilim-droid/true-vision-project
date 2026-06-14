import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { mono, serif, inter, ease, reveal, lineGrow } from '../lib/design'

const POSTERS = [
  {
    id: 'map',
    name: 'The Map',
    code: 'TVP-POSTER-001',
    description: 'Wexford × Bergamo. Where it all started.',
    image: '/poster-map.jpg',
    price: 12,
  },
  {
    id: 'numbers',
    name: 'The Numbers',
    code: 'TVP-POSTER-002',
    description: '24 units. 24 hours. Sold out. No ads.',
    image: '/poster-numbers.jpg',
    price: 12,
  },
  {
    id: 'statement',
    name: 'The Statement',
    code: 'TVP-POSTER-003',
    description: 'Built from nothing. Worn by those who understand.',
    image: '/poster-statement.jpg',
    price: 12,
  },
]

const fast = (delay = 0) => ({ duration: 0.55, delay, ease })

const SectionTag = ({ n, label }) => (
  <div className="flex items-center gap-4 mb-10 sm:mb-14">
    <motion.div
      {...lineGrow()}
      className="h-px w-10 origin-left shrink-0"
      style={{ background: 'rgba(0,0,0,0.10)' }}
      aria-hidden="true"
    />
    <motion.p
      {...reveal(0.05, 0)}
      style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.42em' }}
      className="uppercase"
    >
      {n} / {label}
    </motion.p>
  </div>
)

export default function Posters() {
  const [selectedPosters, setSelectedPosters] = useState({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState('')

  const togglePoster = (posterId) => {
    setSelectedPosters(prev => ({
      ...prev,
      [posterId]: (prev[posterId] || 0) + 1,
    }))
  }

  const removePoster = (posterId) => {
    setSelectedPosters(prev => {
      const updated = { ...prev }
      if (updated[posterId] > 1) {
        updated[posterId] -= 1
      } else {
        delete updated[posterId]
      }
      return updated
    })
  }

  const totalItems = Object.values(selectedPosters).reduce((a, b) => a + b, 0)
  const subtotal = totalItems * 12
  const shipping = totalItems > 0 ? 3 : 0
  const total = subtotal + shipping

  const handleCheckout = async (e) => {
    e.preventDefault()
    if (!email || !name) { setError('Name and email required.'); return }
    if (totalItems === 0) { setError('Select at least one poster.'); return }

    setIsCheckingOut(true)
    setError('')

    try {
      const res = await fetch('/api/create-poster-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          posters: selectedPosters,
          total,
        }),
      })

      const data = await res.json()
      if (res.ok && data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Checkout failed.')
      }
    } catch (err) {
      setError('Connection error. Try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 sm:px-12 text-center pt-20 pb-10 overflow-hidden">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fast(0.08)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }}
          className="uppercase mb-8"
        >
          Limited Pre-Drop Release
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={fast(0.18)}
          style={{ ...serif, fontSize: 'clamp(44px, 9vw, 72px)', color: '#111111', fontWeight: 400, lineHeight: 1.08 }}
          className="mb-6"
        >
          Three Posters.
          <br />
          One Statement.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fast(0.32)}
          style={{ ...mono, fontSize: 'clamp(9px, 1.6vw, 10px)', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.28em' }}
          className="uppercase max-w-[500px] mb-8"
        >
          Documentation, not decoration. June 22 — Available for order.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={fast(0.40)}
          className="origin-center h-px w-10"
          style={{ background: 'rgba(0,0,0,0.15)' }}
          aria-hidden="true"
        />
      </section>

      {/* Posters Grid */}
      <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <SectionTag n="01" label="Poster Series" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {POSTERS.map((poster, i) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: i * 0.1, ease }}
              className="flex flex-col"
            >
              {/* Poster image */}
              <div
                className="relative overflow-hidden bg-[#DEDAD4] w-full aspect-[2/3] mb-5 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => togglePoster(poster.id)}
              >
                <div
                  className="absolute top-0 left-0 w-4 h-4 border-t border-l z-10"
                  style={{ borderColor: 'rgba(0,0,0,0.10)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute top-0 right-0 w-4 h-4 border-t border-r z-10"
                  style={{ borderColor: 'rgba(0,0,0,0.10)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 left-0 w-4 h-4 border-b border-l z-10"
                  style={{ borderColor: 'rgba(0,0,0,0.10)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 border-b border-r z-10"
                  style={{ borderColor: 'rgba(0,0,0,0.10)' }}
                  aria-hidden="true"
                />
                <img
                  src={poster.image}
                  alt={poster.name}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  style={{ filter: 'saturate(0.18) brightness(0.88)' }}
                  draggable="false"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 mb-4">
                <h3 style={{ ...serif, fontSize: '20px', color: '#111111', fontWeight: 400 }}>
                  {poster.name}
                </h3>
                <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }} className="uppercase">
                  {poster.code}
                </p>
                <p style={{ ...inter, fontSize: '13px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>
                  {poster.description}
                </p>
              </div>

              {/* Price + Add to Cart */}
              <div className="flex items-center justify-between">
                <p style={{ ...serif, fontSize: '24px', color: '#111111', fontWeight: 400 }}>
                  €{poster.price}
                </p>
                <button
                  onClick={() => togglePoster(poster.id)}
                  style={{ ...mono, fontSize: '10px', letterSpacing: '0.35em', background: '#111111', color: '#F5F3EE' }}
                  className="px-6 py-3 uppercase hover:bg-[#2a2a2a] active:scale-95 transition-all duration-300"
                >
                  {selectedPosters[poster.id] ? `+${selectedPosters[poster.id]}` : 'Add'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Checkout Section */}
        {totalItems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="max-w-md mx-auto"
            style={{ borderTop: '1px solid rgba(0,0,0,0.10)', paddingTop: '40px' }}
          >
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-center justify-between">
                <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
                  Subtotal
                </p>
                <p style={{ ...mono, fontSize: '11px', color: '#111111' }}>€{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
                  Shipping
                </p>
                <p style={{ ...mono, fontSize: '11px', color: '#111111' }}>€{shipping.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,0,0,0.10)', paddingTop: '8px' }}>
                <p style={{ ...mono, fontSize: '10px', color: '#111111', letterSpacing: '0.22em' }} className="uppercase">
                  Total
                </p>
                <p style={{ ...serif, fontSize: '20px', color: '#111111', fontWeight: 400 }}>€{total.toFixed(2)}</p>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', color: '#111111', caretColor: '#111111', background: 'rgba(0,0,0,0.02)' }}
                className="w-full h-[48px] border border-black/12 outline-none px-4 text-center uppercase placeholder:text-black/20 focus:border-black/25 transition-colors"
              />
              <input
                type="text"
                placeholder="YOUR FULL NAME"
                value={name}
                onChange={(e) => { setName(e.target.value); setError('') }}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', color: '#111111', caretColor: '#111111', background: 'rgba(0,0,0,0.02)' }}
                className="w-full h-[48px] border border-black/12 outline-none px-4 text-center uppercase placeholder:text-black/20 focus:border-black/25 transition-colors"
              />
              {error && (
                <p style={{ ...mono, fontSize: '9px', color: 'rgba(200,80,80,0.70)', letterSpacing: '0.08em' }} className="text-center">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={isCheckingOut}
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.40em', background: '#111111', color: '#F5F3EE' }}
                className="w-full py-[18px] uppercase hover:bg-[#2a2a2a] disabled:opacity-50 active:scale-[0.98] transition-all duration-300"
              >
                {isCheckingOut ? 'Processing...' : '[ Checkout ]'}
              </button>
            </form>

            <div className="flex flex-col gap-3 mt-6 text-center">
              {Object.entries(selectedPosters).map(([posterId, qty]) => {
                const poster = POSTERS.find(p => p.id === posterId)
                return (
                  <div key={posterId} className="flex items-center justify-between px-3 py-2" style={{ background: 'rgba(0,0,0,0.03)' }}>
                    <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.16em' }} className="uppercase">
                      {poster.name} × {qty}
                    </p>
                    <button
                      onClick={() => removePoster(posterId)}
                      style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }}
                      className="uppercase hover:opacity-50 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {totalItems === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto text-center py-12"
          >
            <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }} className="uppercase">
              Click on a poster to add to order
            </p>
          </motion.div>
        )}
      </section>

      {/* Info Section */}
      <section className="w-full max-w-3xl mx-auto px-6 sm:px-10 py-12 sm:py-16" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <SectionTag n="02" label="About" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, ease }}
          className="flex flex-col gap-6"
        >
          <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.8 }}>
            These aren't just posters. They're documentation.
          </p>
          <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.8 }}>
            Each design tells part of the TVP story: where we're from (The Map), proof it works (The Numbers), and what we believe (The Statement).
          </p>
          <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.8 }}>
            Frame them. Share them. Photograph them. Be part of the proof that representation matters.
          </p>

          <div className="flex flex-col gap-3 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
            <div className="flex items-center justify-between">
              <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
                Format
              </p>
              <p style={{ ...mono, fontSize: '10px', color: '#111111' }}>A2 (420 × 594mm)</p>
            </div>
            <div className="flex items-center justify-between">
              <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
                Paper
              </p>
              <p style={{ ...mono, fontSize: '10px', color: '#111111' }}>250gsm Poster Stock</p>
            </div>
            <div className="flex items-center justify-between">
              <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
                Finish
              </p>
              <p style={{ ...mono, fontSize: '10px', color: '#111111' }}>Matte Monochrome</p>
            </div>
            <div className="flex items-center justify-between">
              <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
                Shipping
              </p>
              <p style={{ ...mono, fontSize: '10px', color: '#111111' }}>€3 (Worldwide)</p>
            </div>
          </div>

          <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }} className="uppercase text-center">
            Rolled in tube. Ships in 2-3 business days.
          </p>
        </motion.div>
      </section>

      {/* Back Link */}
      <div className="flex items-center justify-center py-12 sm:py-16">
        <Link to="/"
          style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity">
          ← True Vision Project
        </Link>
      </div>
    </div>
  )
}
