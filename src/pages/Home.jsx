import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'

const CAP = getProduct('foundation-cap')

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }

const CAP_COLORS = [
  { name: 'Black', hex: '#0a0a0a', imgSrc: '/cap-black.jpg' },
  { name: 'White', hex: '#f5f2ec', imgSrc: '/cap-white.jpg' },
]

const CornerMarks = () => (
  <>
    <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l border-black/12 z-10" />
    <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r border-black/12 z-10" />
    <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-black/12 z-10" />
    <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-black/12 z-10" />
  </>
)

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
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />

      {/* ─── Hero — Full-screen split ─────────────────────────────────── */}
      <section
        className="relative flex flex-col lg:flex-row min-h-[100dvh]"
        aria-label="Foundation Cap — Drop 001"
      >
        {/* Left — Cap image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative overflow-hidden bg-[#DEDAD4] flex-shrink-0 lg:w-[58%]"
          style={{
            height: '72vw',
            filter: 'saturate(0.18) brightness(0.93)',
          }}
        >
          {/* On desktop the height is controlled by the flex row, so override */}
          <style>{`@media (min-width: 1024px) { .hero-img-panel { height: 100% !important; } }`}</style>
          <div className="hero-img-panel absolute inset-0">
            <CornerMarks />

            <AnimatePresence mode="wait">
              <motion.img
                key={activeColor}
                src={CAP_COLORS[activeColor].imgSrc}
                alt={`Foundation Cap — ${CAP_COLORS[activeColor].name}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
            </AnimatePresence>

            <div className="absolute top-5 left-5 z-10">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.42em' }}>
                TVP
              </p>
            </div>
            <div className="absolute bottom-5 right-5 z-10">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.26em' }}>
                {CAP_COLORS[activeColor].name.toUpperCase()} &nbsp;·&nbsp; 0{activeColor + 1}/02
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — Product info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center flex-1 px-8 sm:px-12 lg:px-14 py-12 lg:py-0"
        >

          {/* Label */}
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }}
            className="uppercase mb-7">
            Drop 001 &nbsp;·&nbsp; True Vision Project
          </p>

          {/* Name */}
          <h1
            style={{
              ...serif,
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: '#111111',
              fontWeight: 500,
              lineHeight: 1.06,
              letterSpacing: '0.01em',
            }}
            className="mb-3"
          >
            The Foundation<br />Cap
          </h1>

          {/* Origin */}
          <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.28em' }}
            className="uppercase mb-10">
            Wexford / Ireland &nbsp;×&nbsp; Bergamo / Italy
          </p>

          {/* Rule */}
          <div className="w-8 h-px mb-9" style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />

          {/* Specs */}
          <div className="flex flex-col gap-[10px] mb-10">
            {[
              ['Material', '300gsm Washed Chino Twill'],
              ['Fit',      'One Size'],
              ['Edition',  'Drop 001 — 24 Units'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center gap-5">
                <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em', minWidth: '64px' }}
                  className="uppercase shrink-0">
                  {k}
                </span>
                <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.58)', letterSpacing: '0.1em' }}
                  className="uppercase">
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '34px', color: '#111111', fontWeight: 300, letterSpacing: '-0.01em' }}>
              €{CAP.price}
            </span>
            <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }}>
              + €6 SHIPPING
            </span>
          </div>

          {/* Colour */}
          <div className="mb-8">
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
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              aria-label="Add Foundation Cap to cart"
              className={`w-full py-[15px] text-center text-[9px] tracking-[0.45em] uppercase transition-all duration-500 cursor-pointer ${
                addedFeedback
                  ? 'bg-black/5 border border-black/10'
                  : 'bg-[#111111] text-[#F5F3EE] hover:bg-[#2a2a2a]'
              }`}
              style={addedFeedback ? { ...mono, color: 'rgba(0,0,0,0.40)' } : mono}
            >
              {addedFeedback ? '[ Added to Cart ]' : '[ Add to Cart ]'}
            </button>
            <Link
              to="/product/foundation-cap"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.28)' }}
              className="text-center uppercase hover:opacity-60 transition-opacity duration-300"
            >
              Full Details →
            </Link>
          </div>

          {/* Scroll prompt — desktop only */}
          <div className="hidden lg:flex items-center gap-3 mt-auto pt-12">
            <div className="w-5 h-px" style={{ background: 'rgba(0,0,0,0.12)' }} aria-hidden="true" />
            <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.20)', letterSpacing: '0.4em' }}
              className="uppercase">Scroll for more</span>
          </div>

        </motion.div>
      </section>

      {/* ─── Mission statement ────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center text-center px-6 sm:px-16 py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Mission"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            ...serif,
            fontSize: 'clamp(24px, 5vw, 44px)',
            color: '#111111',
            fontWeight: 400,
            lineHeight: 1.3,
            maxWidth: '580px',
          }}
        >
          We Are Not Building A Brand.
          <br />
          <em style={{ color: 'rgba(0,0,0,0.38)' }}>We Are Documenting A Mission.</em>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.18)', letterSpacing: '0.42em' }}
          className="uppercase mt-8"
        >
          [ Wexford / Ireland &nbsp;×&nbsp; Bergamo / Italy ]
        </motion.p>
      </section>

      {/* ─── Quote ────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center text-center px-6 sm:px-16 py-14 sm:py-20"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Manifesto"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="origin-top w-px h-9 mb-10"
          style={{ background: 'rgba(0,0,0,0.10)' }}
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          style={{
            ...serif,
            fontSize: 'clamp(18px, 4vw, 28px)',
            color: '#111111',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.55,
            maxWidth: '480px',
          }}
        >
          Two small towns. One fire.<br />Built from nothing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.18)', letterSpacing: '0.36em' }}
          className="uppercase mt-6"
        >
          [ TVP is not a store — it is a record ]
        </motion.p>

        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="origin-top w-px h-9 mt-10"
          style={{ background: 'rgba(0,0,0,0.10)' }}
          aria-hidden="true"
        />
      </section>

      {/* ─── Marquee ──────────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden py-[10px]"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-hidden="true"
      >
        <div className="marquee-track" style={{ opacity: 0.30 }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{ ...mono, fontSize: '8px', color: '#111111', letterSpacing: '0.22em', whiteSpace: 'nowrap', paddingRight: '4rem' }}
            >
              [ DROP 001 — NOW AVAILABLE ] &nbsp;&nbsp;·&nbsp;&nbsp; [ FOUNDATION CAP ] &nbsp;&nbsp;·&nbsp;&nbsp; [ WEXFORD / IRELAND ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BERGAMO / ITALY ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BUILT FROM NOTHING ] &nbsp;&nbsp;·&nbsp;&nbsp;
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
          <Link
            to="/archive"
            style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.28)' }}
            className="uppercase hover:opacity-60 transition-opacity duration-300"
          >
            [ Archive ]
          </Link>
          <a
            href="https://www.instagram.com/truevisionproject/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: 'rgba(0,0,0,0.28)' }}
            className="hover:opacity-60 transition-opacity duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </footer>

    </div>
  )
}
