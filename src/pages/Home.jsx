import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'

const CAP = getProduct('foundation-cap')

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const CAP_COLORS = [
  { name: 'Black', hex: '#0a0a0a', imgSrc: '/cap-black.jpg' },
  { name: 'White', hex: '#f5f2ec', imgSrc: '/cap-white.jpg' },
]

const CornerMarks = () => (
  <>
    <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l border-black/[0.10] z-10" />
    <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r border-black/[0.10] z-10" />
    <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-black/[0.10] z-10" />
    <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-black/[0.10] z-10" />
  </>
)

// Shared animation config — fast, clean, mobile-safe
const fade   = { initial: { opacity: 0 }, animate: { opacity: 1 } }
const fadeUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
const fast   = (delay = 0) => ({ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] })
const inview = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Home() {
  const { onCartOpen } = useOutletContext()
  const { dispatch }   = useCart()
  const [activeColor, setActiveColor]     = useState(0)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD',
      item: {
        id:    'foundation-cap',
        name:  'Foundation Cap',
        price: CAP.price,
        size:  'One Size',
        color: CAP_COLORS[activeColor].name,
        imgSrc: CAP_COLORS[activeColor].imgSrc,
        qty:   1,
      },
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
    onCartOpen()
  }

  return (
    <div className="bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 sm:px-10 text-center">

        <motion.p
          {...fade} transition={fast(0.05)}
          style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }}
          className="uppercase mb-7"
        >
          True Vision Project &nbsp;·&nbsp; 2026
        </motion.p>

        <motion.h1
          {...fadeUp} transition={fast(0.12)}
          style={{
            ...serif,
            fontSize: 'clamp(46px, 9vw, 78px)',
            color: '#111111',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
          }}
          className="mb-6"
        >
          We Are Not<br />Building A Brand.
        </motion.h1>

        <motion.p
          {...fade} transition={fast(0.22)}
          style={{ ...mono, fontSize: '11px', color: '#111111', letterSpacing: '0.32em', opacity: 0.52 }}
          className="uppercase mb-12"
        >
          We Are Documenting A Mission.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={fast(0.28)}
          className="origin-center h-px w-16 mb-12"
          style={{ background: 'rgba(0,0,0,0.10)' }}
          aria-hidden="true"
        />

        <motion.p
          {...fade} transition={fast(0.34)}
          style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.26)', letterSpacing: '0.4em' }}
          className="uppercase"
        >
          [ Wexford / Ireland &nbsp;×&nbsp; Bergamo / Italy ]
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          {...fade} transition={{ duration: 0.6, delay: 0.55 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '28px', background: 'rgba(0,0,0,0.14)' }}
          />
        </motion.div>
      </section>

      {/* ─── Product ──────────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Foundation Cap"
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-10 sm:gap-14 items-start">

          {/* Image */}
          <motion.div {...inview(0)} className="relative overflow-hidden bg-[#DEDAD4] w-full aspect-[4/5]">
            <CornerMarks />
            <AnimatePresence mode="wait">
              <motion.img
                key={activeColor}
                src={CAP_COLORS[activeColor].imgSrc}
                alt={`Foundation Cap — ${CAP_COLORS[activeColor].name}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover select-none"
                style={{ filter: 'saturate(0.18) brightness(0.94)' }}
                draggable="false"
              />
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div {...inview(0.08)} className="flex flex-col gap-0">

            {/* Label */}
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.48em' }}
              className="uppercase mb-5">
              Drop 001
            </p>

            {/* Name */}
            <h2 style={{ ...serif, fontSize: 'clamp(28px, 5vw, 42px)', color: '#111111', fontWeight: 500, lineHeight: 1.1 }}
              className="mb-8">
              The Foundation Cap
            </h2>

            {/* Spec rows */}
            <div className="flex flex-col mb-8" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              {[
                ['Material', '300gsm Washed Chino Twill'],
                ['Fit',      'One Size'],
                ['Origin',   'Wexford / Bergamo'],
                ['Edition',  '024 Units — Drop 001'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }}
                    className="uppercase">{k}</span>
                  <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.60)', letterSpacing: '0.10em' }}
                    className="uppercase">{v}</span>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-7">
              <span style={{ ...inter, fontSize: '32px', color: '#111111', fontWeight: 300, letterSpacing: '-0.01em' }}>
                €{CAP.price}
              </span>
              <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }}>
                + €6 SHIPPING
              </span>
            </div>

            {/* Colour */}
            <div className="mb-7">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.38em' }}
                className="mb-3 uppercase">
                Colour — {CAP_COLORS[activeColor].name}
              </p>
              <div className="flex gap-3">
                {CAP_COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveColor(i)}
                    aria-label={c.name}
                    aria-pressed={activeColor === i}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                      activeColor === i ? 'border-black/45 scale-110' : 'border-black/[0.12] hover:border-black/28'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAddToCart}
              aria-label="Add Foundation Cap to cart"
              className={`w-full py-4 text-[9px] tracking-[0.42em] uppercase transition-all duration-400 cursor-pointer ${
                addedFeedback
                  ? 'bg-black/5 border border-black/10'
                  : 'bg-[#111111] text-[#F5F3EE] hover:bg-[#2a2a2a] active:scale-[0.98]'
              }`}
              style={addedFeedback ? { ...mono, color: 'rgba(0,0,0,0.40)' } : mono}
            >
              {addedFeedback ? '[ Added ]' : '[ Add to Cart ]'}
            </button>

          </motion.div>
        </div>
      </section>

      {/* ─── Drop 002 Teaser ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.04)' }}
        aria-label="Drop 002 — Coming Soon"
      >
        <div className="grain" aria-hidden="true" style={{ opacity: 0.5 }} />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">

          <div className="flex flex-col gap-6">
            <motion.p
              {...inview()}
              style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.5em' }}
              className="uppercase"
            >
              Drop 002 — Classified
            </motion.p>
            <motion.h2
              {...inview(0.08)}
              style={{ ...serif, fontSize: 'clamp(32px, 6vw, 56px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.08 }}
            >
              Something<br />Is Coming.
            </motion.h2>
            <motion.p
              {...inview(0.14)}
              style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.20em', maxWidth: '300px', lineHeight: 1.85 }}
              className="uppercase"
            >
              The next chapter. Archive members get first access.
            </motion.p>
          </div>

          <motion.div {...inview(0.2)} className="flex flex-col items-start gap-4">
            <Link
              to="/drop-002"
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.36em', color: '#F5F3EE', border: '1px solid rgba(255,255,255,0.14)', padding: '14px 28px' }}
              className="uppercase hover:bg-white/[0.05] transition-all duration-300"
            >
              [ Get Early Access ]
            </Link>
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.22em' }}>
              Free. No commitment.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Quote ────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center text-center px-6 sm:px-16 py-16 sm:py-24"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Manifesto"
      >
        <motion.p
          {...inview()}
          style={{
            ...serif,
            fontSize: 'clamp(20px, 4vw, 32px)',
            color: '#111111',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '480px',
          }}
        >
          "Built from nothing.<br />Worn by those who understand."
        </motion.p>

        <motion.div {...inview(0.1)} className="mt-8 flex items-center gap-5">
          <Link to="/our-story"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
            className="uppercase pb-px hover:opacity-50 transition-opacity duration-300">
            Our Story →
          </Link>
        </motion.div>
      </section>

      {/* ─── Archive ──────────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-24 flex flex-col sm:flex-row items-start justify-between gap-10"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="The Archive"
      >
        <motion.div {...inview()} className="flex flex-col gap-5 max-w-sm">
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.48em' }} className="uppercase">
            The Archive
          </p>
          <h2 style={{ ...serif, fontSize: 'clamp(24px, 4vw, 36px)', color: '#111111', fontWeight: 500, lineHeight: 1.2 }}>
            Join the founding community.
          </h2>
          <p style={{ ...inter, fontSize: '13px', color: 'rgba(0,0,0,0.50)', lineHeight: 1.85 }}>
            Archive members are not customers. They are the foundation — people who believed before anyone else. First access to every drop. First to know. First to own.
          </p>
        </motion.div>

        <motion.div {...inview(0.1)} className="flex flex-col gap-4 sm:mt-14">
          <Link
            to="/archive"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.36em', color: '#F5F3EE', background: '#111111', padding: '14px 28px' }}
            className="uppercase hover:bg-[#2a2a2a] transition-all duration-300"
          >
            [ Enter the Archive ]
          </Link>
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.18em' }}>
            Free to join. Always.
          </p>
        </motion.div>
      </section>

      {/* ─── Marquee ──────────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden py-[10px]"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-hidden="true"
      >
        <div className="marquee-track" style={{ opacity: 0.28 }}>
          {[0, 1].map((i) => (
            <span key={i}
              style={{ ...mono, fontSize: '8px', color: '#111111', letterSpacing: '0.22em', whiteSpace: 'nowrap', paddingRight: '4rem' }}>
              [ DROP 001 — AVAILABLE ] &nbsp;&nbsp;·&nbsp;&nbsp; [ FOUNDATION CAP — €32 ] &nbsp;&nbsp;·&nbsp;&nbsp; [ DROP 002 — COMING SOON ] &nbsp;&nbsp;·&nbsp;&nbsp; [ ARCHIVE — JOIN NOW ] &nbsp;&nbsp;·&nbsp;&nbsp; [ WEXFORD / IRELAND ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BERGAMO / ITALY ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BUILT FROM NOTHING ] &nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer
        className="px-6 sm:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
      >
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }}>
          © 2026 TRUE VISION PROJECT
        </p>
        <div className="flex items-center gap-7">
          <Link to="/archive"
            style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.28)' }}
            className="uppercase hover:opacity-60 transition-opacity duration-300">
            [ Archive ]
          </Link>
          <Link to="/drop-002"
            style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.28)' }}
            className="uppercase hover:opacity-60 transition-opacity duration-300">
            [ Drop 002 ]
          </Link>
          <a href="https://www.instagram.com/truevisionproject/" target="_blank" rel="noopener noreferrer"
            aria-label="Instagram" style={{ color: 'rgba(0,0,0,0.28)' }}
            className="hover:opacity-60 transition-opacity duration-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@tvpofficial" target="_blank" rel="noopener noreferrer"
            aria-label="TikTok" style={{ color: 'rgba(0,0,0,0.28)' }}
            className="hover:opacity-60 transition-opacity duration-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
