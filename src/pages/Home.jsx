import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const mono = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }

const CAP_COLORS = [
  { name: 'Black', hex: '#0a0a0a', imgSrc: '/cap-black.jpg' },
  { name: 'White', hex: '#f5f2ec', imgSrc: '/cap-white.jpg' },
]

const MANIFEST = [
  { key: 'OBJECT',       value: 'THE FOUNDATION CAP' },
  { key: 'COMPOSITION',  value: '300GSM WASHED CHINO TWILL' },
  { key: 'ORIGIN',       value: 'IRELAND / ITALY' },
  { key: 'EDITION',      value: 'DROP 001' },
]

const CornerMarks = () =>
  ['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r',
   'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((c, i) => (
    <span key={i} aria-hidden="true" className={`absolute w-5 h-5 border-white/10 z-10 ${c}`} />
  ))

export default function Home() {
  const { onCartOpen } = useOutletContext()
  const { dispatch } = useCart()

  const [activeColor, setActiveColor] = useState(0)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD',
      item: {
        id: 'foundation-cap',
        name: 'Foundation Cap',
        price: 32,
        size: 'One Size',
        color: CAP_COLORS[activeColor].name,
        qty: 1,
      },
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
    onCartOpen()
  }

  return (
    <div className="bg-[#000000] min-h-screen text-white">

      {/* Animated grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* ── Hero — Manifesto ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        aria-label="Mission statement"
      >
        {/* Atmospheric gradients */}
        <div aria-hidden="true" className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(255,255,255,0.045) 0%, transparent 100%)' }} />
        <div aria-hidden="true" className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.97) 100%)' }} />

        <div className="relative z-10 flex flex-col items-center gap-9 max-w-2xl">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.48em' }}
            className="uppercase"
          >
            [ TRUE VISION PROJECT — 2026 ]
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              ...serif,
              fontWeight: 500,
              fontSize: 'clamp(28px, 6.5vw, 56px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            We Are Not<br />Building A Brand.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 1.1, delay: 1.0, ease: 'easeOut' }}
            style={{ ...mono, fontSize: '9px', color: '#ffffff', letterSpacing: '0.28em' }}
            className="uppercase"
          >
            We Are Documenting A Mission.
          </motion.p>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.65, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="origin-top w-px h-12 bg-white/10"
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
            style={{ ...mono, fontSize: '8px', color: '#ffffff', letterSpacing: '0.28em' }}
            className="uppercase"
          >
            [ WEXFORD / IRELAND × BERGAMO / ITALY ]
          </motion.p>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.5em' }}
            className="uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/14 to-transparent" />
        </motion.div>
      </section>

      {/* ── Foundation Cap Editorial ── */}
      <section
        className="relative max-w-screen-xl mx-auto px-6 sm:px-12 pt-20 pb-24 sm:pt-28 sm:pb-36"
        aria-labelledby="object-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — Image gallery */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            <p style={{ ...mono, fontSize: '7px', color: '#3d3d3d', letterSpacing: '0.48em' }} className="mb-5 uppercase">
              Drop 001
            </p>

            {/* Main image */}
            <div
              className="relative w-full overflow-hidden bg-[#040404]"
              style={{ aspectRatio: '3/4', filter: 'saturate(0.14) brightness(0.9)' }}
            >
              <CornerMarks />

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeColor}
                  src={CAP_COLORS[activeColor].imgSrc}
                  alt={`Foundation Cap — ${CAP_COLORS[activeColor].name}`}
                  width="900"
                  height="1200"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />
              </AnimatePresence>

              {/* Image labels */}
              <div className="absolute bottom-4 left-5 z-10">
                <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.28em' }}>
                  {CAP_COLORS[activeColor].name.toUpperCase()}
                </p>
              </div>
              <div className="absolute bottom-4 right-5 z-10">
                <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.32)', letterSpacing: '0.22em' }}>
                  {String(activeColor + 1).padStart(2, '0')} / {String(CAP_COLORS.length).padStart(2, '0')}
                </p>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {CAP_COLORS.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setActiveColor(i)}
                  aria-label={`View ${c.name}`}
                  aria-pressed={activeColor === i}
                  className={`relative flex-1 overflow-hidden border transition-all duration-400 cursor-pointer ${
                    activeColor === i
                      ? 'border-white/28 opacity-100'
                      : 'border-white/[0.05] opacity-32 hover:opacity-58 hover:border-white/14'
                  }`}
                  style={{ aspectRatio: '1/1', filter: 'saturate(0.1)' }}
                >
                  <img
                    src={c.imgSrc}
                    alt={c.name}
                    loading="lazy"
                    width="200"
                    height="200"
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Manifest + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:pt-[72px]"
          >
            {/* Heading */}
            <header className="mb-10">
              <p style={{ ...mono, fontSize: '7px', color: '#3d3d3d', letterSpacing: '0.42em' }} className="mb-3 uppercase">
                Object 001
              </p>
              <h2
                id="object-heading"
                style={{ ...serif, fontWeight: 500, fontSize: 'clamp(22px, 4vw, 32px)', color: 'rgba(255,255,255,0.88)', letterSpacing: '0.03em', lineHeight: 1.25 }}
              >
                The Foundation Cap
              </h2>
            </header>

            {/* Manifest table */}
            <div className="flex flex-col mb-10">
              {MANIFEST.map(({ key, value }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: 'easeOut' }}
                  className="flex items-start py-[15px] border-b border-white/[0.07] gap-4"
                >
                  <span
                    style={{ ...mono, fontSize: '8px', color: '#585858', letterSpacing: '0.26em', minWidth: 'min(136px, 37vw)' }}
                    className="shrink-0 leading-snug"
                  >
                    [ {key} ]
                  </span>
                  <span
                    style={{ ...mono, fontSize: '10px', color: '#cccccc', letterSpacing: '0.07em' }}
                    className="leading-snug"
                  >
                    {value}
                  </span>
                </motion.div>
              ))}

              {/* Price row */}
              <div className="flex items-center py-[15px] border-b border-white/[0.07] gap-4">
                <span
                  style={{ ...mono, fontSize: '8px', color: '#585858', letterSpacing: '0.26em', minWidth: 'min(136px, 37vw)' }}
                  className="shrink-0 leading-snug"
                >
                  [ PRICE ]
                </span>
                <span
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', color: '#ffffff', fontWeight: 300, letterSpacing: '0.03em' }}
                >
                  €32
                </span>
              </div>
            </div>

            {/* Serif statement */}
            <div className="mb-10">
              <div className="w-8 h-px bg-white/10 mb-6" aria-hidden="true" />
              <p style={{ ...serif, fontStyle: 'italic', fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9 }}>
                Built between Ireland and Italy.
              </p>
            </div>

            {/* Color selector */}
            <div className="mb-7">
              <p style={{ ...mono, fontSize: '7px', color: '#4a4a4a', letterSpacing: '0.38em' }} className="mb-3 uppercase">
                Color — {CAP_COLORS[activeColor].name}
              </p>
              <div className="flex gap-3">
                {CAP_COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setActiveColor(i)}
                    aria-label={c.name}
                    aria-pressed={activeColor === i}
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                      activeColor === i ? 'border-white/55' : 'border-white/10 hover:border-white/28'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                aria-label="Add Foundation Cap to cart"
                className={`
                  w-full py-[14px] text-center
                  text-[9px] tracking-[0.45em] uppercase
                  transition-all duration-500 cursor-pointer
                  ${addedFeedback
                    ? 'bg-white/8 text-white/40 border border-white/10'
                    : 'bg-white text-black hover:bg-white/92'
                  }
                `}
              >
                {addedFeedback ? '[ Added to Cart ]' : '[ Add to Cart ]'}
              </button>

              <Link
                to="/product/foundation-cap"
                style={{ ...mono, fontSize: '8px', letterSpacing: '0.28em' }}
                className="text-center text-white/18 uppercase hover:text-white/38 transition-colors duration-400"
              >
                View Full Details →
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section
        className="relative flex flex-col items-center text-center px-6 sm:px-16 py-16 sm:py-24"
        aria-label="Manifesto"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="origin-top w-px h-12 bg-white/10 mb-14"
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            ...serif,
            fontWeight: 400,
            fontSize: 'clamp(20px, 4.5vw, 36px)',
            color: '#ffffff',
            lineHeight: 1.45,
            maxWidth: '600px',
          }}
        >
          Two small towns.<br />One fire. Built from nothing.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35, ease: 'easeOut' }}
          style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.32em' }}
          className="uppercase mt-8"
        >
          [ TVP IS NOT A STORE — IT IS A RECORD ]
        </motion.p>

        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="origin-top w-px h-12 bg-white/10 mt-14"
          aria-hidden="true"
        />
      </section>

      {/* ── Live marquee ── */}
      <div
        className="w-full overflow-hidden border-t border-white/[0.04] py-[10px]"
        aria-hidden="true"
      >
        <div className="marquee-track" style={{ opacity: 0.32 }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{ ...mono, fontSize: '8px', color: '#ffffff', letterSpacing: '0.22em', whiteSpace: 'nowrap', paddingRight: '4rem' }}
            >
              [ DROP 001 — NOW AVAILABLE ] &nbsp;&nbsp;·&nbsp;&nbsp; [ FOUNDATION CAP ] &nbsp;&nbsp;·&nbsp;&nbsp; [ WEXFORD / IRELAND ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BERGAMO / ITALY ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BUILT FROM NOTHING ] &nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Minimal footer ── */}
      <footer className="border-t border-white/[0.05] px-6 sm:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p style={{ ...mono, fontSize: '7px', color: '#3a3a3a', letterSpacing: '0.22em' }}>
          © 2026 TRUE VISION PROJECT
        </p>
        <div className="flex items-center gap-7">
          <Link
            to="/archive"
            style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em' }}
            className="text-white/18 uppercase hover:text-white/40 transition-colors duration-400"
          >
            [ Archive ]
          </Link>
          <a
            href="https://www.instagram.com/truevisionproject/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/18 hover:text-white/50 transition-colors duration-400"
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
