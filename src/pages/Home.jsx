import { useState, useRef } from 'react'
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

const ease = [0.16, 1, 0.3, 1]
const fast = (delay = 0) => ({ duration: 0.55, delay, ease })

const inview = (delay = 0, y = 22) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, delay, ease },
})

const lineGrow = (delay = 0) => ({
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease },
})

const CornerMarks = ({ color = 'rgba(0,0,0,0.10)' }) => (
  <>
    <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l z-10" style={{ borderColor: color }} />
    <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r z-10" style={{ borderColor: color }} />
    <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l z-10" style={{ borderColor: color }} />
    <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r z-10" style={{ borderColor: color }} />
  </>
)

const TERMINAL_LINES = [
  '> WEXFORD, IRELAND',
  '> BERGAMO, ITALY',
  '> THE MARKET',
  '> THE BUILD',
  '> THE TRUTH',
]

export default function Home() {
  const { onCartOpen } = useOutletContext()
  const { dispatch }   = useCart()
  const [activeColor, setActiveColor]     = useState(0)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const productRef = useRef(null)

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD',
      item: {
        id:     'foundation-cap',
        name:   'Foundation Cap',
        price:  CAP.price,
        size:   'One Size',
        color:  CAP_COLORS[activeColor].name,
        imgSrc: CAP_COLORS[activeColor].imgSrc,
        qty:    1,
      },
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
    onCartOpen()
  }

  const scrollToProduct = () => {
    productRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 sm:px-10 text-center pt-[78px]">

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fast(0.05)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.52em' }}
          className="uppercase mb-8"
        >
          True Vision Project &nbsp;·&nbsp; Drop 001 — Available Now
        </motion.p>

        <h1
          aria-label="We Are Not Building A Brand."
          style={{ ...serif, fontSize: 'clamp(44px, 9vw, 82px)', color: '#111111', fontWeight: 500, lineHeight: 1.06, letterSpacing: '-0.01em' }}
          className="mb-4"
        >
          {['We', 'Are', 'Not'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.10 + i * 0.08, ease }}
              className="inline-block" style={{ marginRight: '0.28em' }}
              aria-hidden="true"
            >{word}</motion.span>
          ))}
          <br aria-hidden="true" />
          {['Building', 'A', 'Brand.'].map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.34 + i * 0.08, ease }}
              className="inline-block" style={{ marginRight: i < 2 ? '0.28em' : 0 }}
              aria-hidden="true"
            >{word}</motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fast(0.62)}
          style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.42)', letterSpacing: '0.32em' }}
          className="uppercase mb-14"
        >
          We Are Documenting A Mission.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={fast(0.68)}
          className="origin-center h-px w-12 mb-12"
          style={{ background: 'rgba(0,0,0,0.10)' }}
          aria-hidden="true"
        />

        {/* Dual CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={fast(0.74)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={scrollToProduct}
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', background: '#111111', color: '#F5F3EE', padding: '14px 32px' }}
            className="uppercase hover:bg-[#2a2a2a] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            [ View Drop 001 ]
          </button>
          <Link
            to="/archive"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.38)', border: '1px solid rgba(0,0,0,0.13)', padding: '14px 32px' }}
            className="uppercase hover:border-black/30 hover:text-black/60 transition-all duration-300"
          >
            [ Join the Archive ]
          </Link>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.20)', letterSpacing: '0.4em' }}
          className="uppercase absolute bottom-14 hidden sm:block"
          aria-hidden="true"
        >
          [ Wexford / Ireland &nbsp;×&nbsp; Bergamo / Italy ]
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="absolute bottom-7 flex flex-col items-center"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '28px', background: 'rgba(0,0,0,0.12)' }}
          />
        </motion.div>
      </section>

      {/* ─── Product ──────────────────────────────────────────────────── */}
      <section
        ref={productRef}
        className="max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28 scroll-mt-[78px]"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Foundation Cap"
      >
        <motion.div {...lineGrow()} className="origin-left h-px w-16 mb-10" style={{ background: 'rgba(0,0,0,0.09)' }} aria-hidden="true" />

        <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr] gap-10 sm:gap-14 items-start">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease }}
            className="relative overflow-hidden bg-[#DEDAD4] w-full aspect-[4/5]"
          >
            <CornerMarks />
            <AnimatePresence mode="wait">
              <motion.img
                key={activeColor}
                src={CAP_COLORS[activeColor].imgSrc}
                alt={`Foundation Cap — ${CAP_COLORS[activeColor].name}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease }}
                className="absolute inset-0 w-full h-full object-cover select-none"
                style={{ filter: 'saturate(0.18) brightness(0.94)' }}
                draggable="false"
              />
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="flex flex-col gap-0"
          >
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.48em' }} className="uppercase mb-5">
              Drop 001
            </p>

            <h2 style={{ ...serif, fontSize: 'clamp(28px, 5vw, 44px)', color: '#111111', fontWeight: 500, lineHeight: 1.1 }} className="mb-8">
              The Foundation Cap
            </h2>

            <div className="flex flex-col mb-8" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              {[
                ['Material', '300gsm Washed Chino Twill'],
                ['Fit',      'One Size'],
                ['Origin',   'Wexford / Bergamo'],
                ['Edition',  '024 Units — Drop 001'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }} className="uppercase">{k}</span>
                  <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.60)', letterSpacing: '0.10em' }} className="uppercase">{v}</span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline gap-3 mb-7">
              <span style={{ ...inter, fontSize: '32px', color: '#111111', fontWeight: 300, letterSpacing: '-0.01em' }}>€{CAP.price}</span>
              <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }}>+ €6 SHIPPING</span>
            </div>

            <div className="mb-7">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.38em' }} className="mb-3 uppercase">
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

      {/* ─── Documentary ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#111111' }}
        aria-label="The Mission"
      >
        <div className="grain" aria-hidden="true" style={{ opacity: 0.55 }} />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 sm:gap-20 items-end">

            {/* Terminal readout */}
            <div>
              <motion.p
                {...inview()}
                style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.48em' }}
                className="uppercase mb-8"
              >
                [ RECORDING: ACTIVE ]
              </motion.p>
              <div className="flex flex-col gap-[10px]">
                {TERMINAL_LINES.map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08 + i * 0.1, ease }}
                    style={{ ...mono, fontSize: '11px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.18em' }}
                  >
                    {line}
                  </motion.p>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  style={{ ...mono, fontSize: '11px', color: 'rgba(255,255,255,0.28)' }}
                  aria-hidden="true"
                >
                  █
                </motion.span>
              </div>
            </div>

            {/* Statement */}
            <motion.div {...inview(0.18)} className="flex flex-col gap-6">
              <h2 style={{ ...serif, fontSize: 'clamp(30px, 5.5vw, 52px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.1 }}>
                We film<br />everything.
              </h2>
              <p style={{ ...inter, fontSize: '13px', color: 'rgba(255,255,255,0.32)', lineHeight: 1.88 }}>
                The market. The build. The failures. The first sale. Every drop documented from nothing.
              </p>
              <a
                href="https://www.tiktok.com/@tvpofficial"
                target="_blank" rel="noopener noreferrer"
                style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.28em' }}
                className="uppercase hover:text-white/40 transition-colors duration-300"
              >
                Follow @tvpofficial →
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── Drop 002 Teaser ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0c0c0c', borderTop: '1px solid rgba(255,255,255,0.03)' }}
        aria-label="Drop 002 — Coming Soon"
      >
        <div className="grain" aria-hidden="true" style={{ opacity: 0.5 }} />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 py-20 sm:py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">

          <div className="flex flex-col gap-6">
            <motion.p
              {...inview()}
              style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.5em' }}
              className="uppercase"
            >
              Drop 002 — Classified
            </motion.p>
            <motion.h2
              {...inview(0.08)}
              style={{ ...serif, fontSize: 'clamp(32px, 6vw, 58px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.08 }}
            >
              Something<br />Is Coming.
            </motion.h2>
            <motion.p
              {...inview(0.14)}
              style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.24)', letterSpacing: '0.20em', maxWidth: '300px', lineHeight: 1.85 }}
              className="uppercase"
            >
              The next chapter. Archive members get first access.
            </motion.p>
          </div>

          <motion.div {...inview(0.22)} className="flex flex-col items-start gap-4">
            <Link
              to="/drop-002"
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.36em', color: '#F5F3EE', border: '1px solid rgba(255,255,255,0.12)', padding: '14px 28px' }}
              className="uppercase hover:bg-white/[0.05] transition-all duration-300"
            >
              [ Get Early Access ]
            </Link>
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.16)', letterSpacing: '0.22em' }}>
              Free. No commitment.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ─── Quote ────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center text-center px-6 sm:px-16 py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Manifesto"
      >
        <motion.div {...lineGrow()} className="origin-center h-px w-12 mb-12" style={{ background: 'rgba(0,0,0,0.09)' }} aria-hidden="true" />

        <motion.p
          {...inview(0, 0)}
          style={{
            ...serif,
            fontSize: 'clamp(22px, 4.5vw, 38px)',
            color: '#111111',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '540px',
          }}
        >
          "Built from nothing.<br />Worn by those who understand."
        </motion.p>

        <motion.div {...inview(0.12)} className="mt-10">
          <Link to="/our-story"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.32)', borderBottom: '1px solid rgba(0,0,0,0.10)' }}
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
          <h2 style={{ ...serif, fontSize: 'clamp(24px, 4vw, 38px)', color: '#111111', fontWeight: 500, lineHeight: 1.15 }}>
            Not a customer list.<br />A founding community.
          </h2>
          <p style={{ ...inter, fontSize: '13px', color: 'rgba(0,0,0,0.48)', lineHeight: 1.88 }}>
            Archive members are the people who believed before anyone else. First access to every drop. First to know. Free to join. No spam — ever.
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
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.18em' }}>
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
        <div className="marquee-track" style={{ opacity: 0.24 }}>
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
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.22em' }}>
          © 2026 TRUE VISION PROJECT
        </p>
        <div className="flex items-center gap-7">
          <Link to="/archive"
            style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.25)' }}
            className="uppercase hover:opacity-60 transition-opacity duration-300">
            [ Archive ]
          </Link>
          <Link to="/drop-002"
            style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.25)' }}
            className="uppercase hover:opacity-60 transition-opacity duration-300">
            [ Drop 002 ]
          </Link>
          <a href="https://www.instagram.com/truevisionproject/" target="_blank" rel="noopener noreferrer"
            aria-label="Instagram" style={{ color: 'rgba(0,0,0,0.25)' }}
            className="hover:opacity-60 transition-opacity duration-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://www.tiktok.com/@tvpofficial" target="_blank" rel="noopener noreferrer"
            aria-label="TikTok" style={{ color: 'rgba(0,0,0,0.25)' }}
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
