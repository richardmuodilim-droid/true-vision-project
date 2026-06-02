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

const reveal = (delay = 0, y = 30) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.75, delay, ease },
})

const lineGrow = (delay = 0) => ({
  initial: { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease },
})

const SectionTag = ({ n, label, dark = false }) => (
  <div className="flex items-center gap-4 mb-10 sm:mb-14">
    <motion.div
      {...lineGrow()}
      className="h-px w-10 origin-left shrink-0"
      style={{ background: dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.10)' }}
      aria-hidden="true"
    />
    <motion.p
      {...reveal(0.05, 0)}
      style={{ ...mono, fontSize: '7px', color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.28)', letterSpacing: '0.42em' }}
      className="uppercase"
    >
      {n} / {label}
    </motion.p>
  </div>
)

const CornerMarks = ({ dark = false }) => {
  const c = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'
  return (
    <>
      <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l z-10" style={{ borderColor: c }} />
      <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r z-10" style={{ borderColor: c }} />
      <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l z-10" style={{ borderColor: c }} />
      <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r z-10" style={{ borderColor: c }} />
    </>
  )
}

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

      {/* ═══════════════════════════════════════════════════════════════
          01 — HERO (static image)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 sm:px-12 text-center pt-[78px] overflow-hidden"
        aria-label="True Vision Project"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/cap-hooded.jpg)', filter: 'saturate(0.10) brightness(0.42)' }}
          aria-hidden="true"
        />
        {/* Subtle vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.35) 100%)' }} aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fast(0.08)}
            style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.5em' }}
            className="uppercase mb-8" aria-hidden="true"
          >
            01 &nbsp;/&nbsp; True Vision Project
          </motion.p>

          <h1
            aria-label="We Are Not Building A Brand."
            style={{ ...serif, fontSize: 'clamp(48px, 11vw, 88px)', color: '#F5F3EE', fontWeight: 500, lineHeight: 1.04, letterSpacing: '-0.01em' }}
            className="mb-5"
          >
            {['We', 'Are', 'Not'].map((w, i) => (
              <motion.span key={w} aria-hidden="true"
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.14 + i * 0.09, ease }}
                className="inline-block" style={{ marginRight: '0.26em' }}
              >{w}</motion.span>
            ))}
            <br aria-hidden="true" />
            {['Building', 'A', 'Brand.'].map((w, i) => (
              <motion.span key={w} aria-hidden="true"
                initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 + i * 0.09, ease }}
                className="inline-block" style={{ marginRight: i < 2 ? '0.26em' : 0 }}
              >{w}</motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fast(0.64)}
            style={{ ...mono, fontSize: 'clamp(8px, 1.8vw, 10px)', color: 'rgba(255,255,255,0.50)', letterSpacing: '0.32em' }}
            className="uppercase mb-12"
          >
            We Are Documenting A Mission.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={fast(0.70)}
            className="origin-center h-px w-10 mb-10"
            style={{ background: 'rgba(255,255,255,0.20)' }} aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={fast(0.76)}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-[340px] sm:max-w-none sm:w-auto"
          >
            <button
              onClick={scrollToProduct}
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.40em', background: '#F5F3EE', color: '#111111' }}
              className="w-full sm:w-auto px-8 py-5 uppercase hover:bg-white/90 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              [ View Drop 001 ]
            </button>
            <Link
              to="/archive"
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.36em', color: 'rgba(255,255,255,0.70)', border: '1px solid rgba(255,255,255,0.28)' }}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-5 uppercase hover:bg-white/[0.08] transition-all duration-300"
            >
              [ Join the Archive ]
            </Link>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.1 }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.38em' }}
          className="uppercase absolute bottom-16 hidden sm:block z-10" aria-hidden="true"
        >
          Wexford&nbsp;/&nbsp;Ireland &nbsp;×&nbsp; Bergamo&nbsp;/&nbsp;Italy
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-7 flex flex-col items-center gap-[6px] z-10" aria-hidden="true"
        >
          <motion.span
            style={{ ...mono, fontSize: '6px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.38em' }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >SCROLL</motion.span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '26px', background: 'rgba(255,255,255,0.22)' }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          02 — DROP 001 PRODUCT
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={productRef}
        className="relative min-h-[100dvh] flex items-center scroll-mt-[78px]"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Foundation Cap — Drop 001"
      >
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-14">
          <SectionTag n="02" label="Drop 001 — Available Now" />

          <div className="grid grid-cols-1 sm:grid-cols-[1.15fr_1fr] gap-8 sm:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.88, ease }}
              className="relative overflow-hidden bg-[#DEDAD4] w-full aspect-[3/4] sm:aspect-[4/5]"
            >
              <CornerMarks />
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeColor}
                  src={CAP_COLORS[activeColor].imgSrc}
                  alt={`Foundation Cap — ${CAP_COLORS[activeColor].name}`}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, ease }}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  style={{ filter: 'saturate(0.18) brightness(0.93)' }}
                  draggable="false"
                />
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.72, delay: 0.1, ease }}
              className="flex flex-col"
            >
              <h2 style={{ ...serif, fontSize: 'clamp(30px, 5.5vw, 46px)', color: '#111111', fontWeight: 500, lineHeight: 1.08 }} className="mb-6">
                The Foundation Cap
              </h2>
              <div className="flex flex-col mb-6" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                {[
                  ['Material', '300gsm Washed Chino Twill'],
                  ['Fit',      'One Size'],
                  ['Origin',   'Wexford / Bergamo'],
                  ['Edition',  '024 Units — Drop 001'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                    <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }} className="uppercase">{k}</span>
                    <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.58)', letterSpacing: '0.10em' }} className="uppercase">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <span style={{ ...inter, fontSize: '36px', color: '#111111', fontWeight: 300, letterSpacing: '-0.02em' }}>€{CAP.price}</span>
                <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.26)', letterSpacing: '0.22em' }}>+ €6 SHIPPING</span>
              </div>
              <div className="mb-6">
                <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.38em' }} className="mb-3 uppercase">
                  Colour — {CAP_COLORS[activeColor].name}
                </p>
                <div className="flex gap-3">
                  {CAP_COLORS.map((c, i) => (
                    <button
                      key={c.name} onClick={() => setActiveColor(i)}
                      aria-label={c.name} aria-pressed={activeColor === i}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 cursor-pointer ${
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
                className={`w-full py-5 text-[9px] tracking-[0.42em] uppercase transition-all duration-400 cursor-pointer ${
                  addedFeedback ? 'bg-black/5 border border-black/10' : 'bg-[#111111] text-[#F5F3EE] hover:bg-[#2a2a2a] active:scale-[0.98]'
                }`}
                style={addedFeedback ? { ...mono, color: 'rgba(0,0,0,0.38)' } : mono}
              >
                {addedFeedback ? '[ Added to Cart ]' : '[ Add to Cart — €32 ]'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          03 — DOCUMENTARY (unboxing video + statement)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100dvh] flex items-center overflow-hidden"
        style={{ background: '#111111' }}
        aria-label="The Mission"
      >
        <div className="relative w-full max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <SectionTag n="03" label="Drop 001 — Documented" dark />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-center">

            {/* Unboxing video */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, ease }}
              className="relative overflow-hidden w-full aspect-[9/16] sm:aspect-[4/5]"
              style={{ background: '#1a1a1a' }}
            >
              {['tl','tr','bl','br'].map(pos => (
                <span key={pos} aria-hidden="true" className={`absolute w-5 h-5 z-10 ${
                  pos==='tl' ? 'top-0 left-0 border-t border-l' :
                  pos==='tr' ? 'top-0 right-0 border-t border-r' :
                  pos==='bl' ? 'bottom-0 left-0 border-b border-l' :
                               'bottom-0 right-0 border-b border-r'
                }`} style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
              ))}
              <video autoPlay muted loop playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover">
                <source src="/unbox-1.mp4" type="video/mp4" />
              </video>
            </motion.div>

            <motion.div {...reveal(0.18)} className="flex flex-col gap-6">
              <h2 style={{ ...serif, fontSize: 'clamp(34px, 6.5vw, 58px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.06 }}>
                We film<br />everything.
              </h2>
              <p style={{ ...inter, fontSize: 'clamp(13px, 1.8vw, 15px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9 }}>
                The market. The build. The failures. The first sale. Every drop documented from nothing.
              </p>
              <a href="https://www.tiktok.com/@tvpofficial" target="_blank" rel="noopener noreferrer"
                style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.28em' }}
                className="uppercase hover:text-white/50 transition-colors duration-300 w-fit">
                @tvpofficial &nbsp;→
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          04 — COMMUNITY (people + two more videos)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-16 sm:py-24"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="The People"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionTag n="04" label="The People" />

          {/* Photo grid — 3 col */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            {[
              '/community-dublin.jpg',
              '/richard-cap.jpg',
              '/billy-cap.jpg',
              '/customer-2.jpg',
              '/customer-1.jpg',
              '/customer-3.jpg',
            ].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, delay: i * 0.07, ease }}
                className="relative overflow-hidden bg-[#DEDAD4] aspect-[3/4]"
              >
                <span aria-hidden="true" className="absolute top-0 left-0 w-4 h-4 border-t border-l z-10" style={{ borderColor: 'rgba(0,0,0,0.10)' }} />
                <span aria-hidden="true" className="absolute bottom-0 right-0 w-4 h-4 border-b border-r z-10" style={{ borderColor: 'rgba(0,0,0,0.10)' }} />
                <img src={src} alt="Foundation Cap — worn"
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  style={{ filter: 'saturate(0.18) brightness(0.92)' }}
                  draggable="false" />
              </motion.div>
            ))}
          </div>

          {/* Two videos side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {['/unbox-2.mp4', '/customer-wearing.mp4'].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease }}
                className="relative overflow-hidden w-full aspect-[9/16] sm:aspect-video"
                style={{ background: '#1a1a1a' }}
              >
                <span aria-hidden="true" className="absolute top-0 left-0 w-4 h-4 border-t border-l z-10" style={{ borderColor: 'rgba(0,0,0,0.12)' }} />
                <span aria-hidden="true" className="absolute bottom-0 right-0 w-4 h-4 border-b border-r z-10" style={{ borderColor: 'rgba(0,0,0,0.12)' }} />
                <video autoPlay muted loop playsInline preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover">
                  <source src={src} type="video/mp4" />
                </video>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...reveal(0.1, 0)}
            style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.35em' }}
            className="uppercase text-center"
          >
            Drop 001 — Received by the foundation
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          05 — SOMETHING IS COMING
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100dvh] flex items-center overflow-hidden"
        style={{ background: '#0a0a0a' }}
        aria-label="Drop 002"
      >
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.035 }} viewport={{ once: true }}
          transition={{ duration: 1.8 }}
          style={{ ...serif, fontSize: 'clamp(100px, 28vw, 260px)', color: '#ffffff', fontWeight: 500, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}
          className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 select-none"
          aria-hidden="true"
        >002</motion.p>

        <div className="relative w-full max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <SectionTag n="05" label="Drop 002 — Classified" dark />
          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.04, ease }}
            style={{ ...serif, fontSize: 'clamp(50px, 13vw, 100px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.01 }}
            className="mb-8 sm:mb-10"
          >
            Something<br />Is Coming.
          </motion.h2>
          <motion.div {...reveal(0.16)} className="flex flex-col gap-[10px] mb-12 sm:mb-14">
            <p style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.32em' }} className="uppercase">[ August 2026 ]</p>
            <p style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.40)', letterSpacing: '0.22em', lineHeight: 1.9 }} className="uppercase">
              Archive members get access before anyone else.
            </p>
          </motion.div>
          <motion.div {...reveal(0.26)} className="flex flex-col gap-3 w-full max-w-[360px]">
            <Link to="/archive"
              style={{ ...mono, fontSize: '10px', letterSpacing: '0.40em', background: '#F5F3EE', color: '#111111' }}
              className="w-full flex items-center justify-center py-[22px] uppercase hover:bg-white/90 active:scale-[0.98] transition-all duration-300">
              [ Secure Your Access ]
            </Link>
            <Link to="/drop-002"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.30em', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.12)' }}
              className="w-full flex items-center justify-center py-[17px] uppercase hover:bg-white/[0.04] transition-all duration-300">
              [ Join the Waitlist ]
            </Link>
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.20em' }} className="text-center pt-1">
              Free. No spam. No commitment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          QUOTE
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center text-center px-6 sm:px-16 py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.85, ease }} className="h-px w-10 mb-12 origin-center"
          style={{ background: 'rgba(0,0,0,0.09)' }} aria-hidden="true" />
        <motion.p {...reveal(0.04, 0)}
          style={{ ...serif, fontSize: 'clamp(24px, 5vw, 40px)', color: '#111111', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.46, maxWidth: '560px' }}>
          "Built from nothing.<br />Worn by those who understand."
        </motion.p>
        <motion.div {...reveal(0.14)} className="mt-10">
          <Link to="/our-story"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.28)', borderBottom: '1px solid rgba(0,0,0,0.09)' }}
            className="uppercase pb-px hover:opacity-50 transition-opacity duration-300">
            Our Story →
          </Link>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="w-full overflow-hidden py-[10px]" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} aria-hidden="true">
        <div className="marquee-track" style={{ opacity: 0.22 }}>
          {[0, 1].map(i => (
            <span key={i} style={{ ...mono, fontSize: '8px', color: '#111111', letterSpacing: '0.22em', whiteSpace: 'nowrap', paddingRight: '4rem' }}>
              [ DROP 001 — AVAILABLE ] &nbsp;&nbsp;·&nbsp;&nbsp; [ FOUNDATION CAP — €32 ] &nbsp;&nbsp;·&nbsp;&nbsp; [ DROP 002 — COMING AUGUST 2026 ] &nbsp;&nbsp;·&nbsp;&nbsp; [ ARCHIVE — JOIN FREE ] &nbsp;&nbsp;·&nbsp;&nbsp; [ WEXFORD / IRELAND ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BERGAMO / ITALY ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BUILT FROM NOTHING ] &nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="px-6 sm:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.22em' }}>© 2026 TRUE VISION PROJECT</p>
        <div className="flex items-center gap-7">
          <Link to="/our-story" style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.22)' }} className="uppercase hover:opacity-60 transition-opacity duration-300">[ Our Story ]</Link>
          <Link to="/archive" style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.22)' }} className="uppercase hover:opacity-60 transition-opacity duration-300">[ Archive ]</Link>
          <Link to="/drop-002" style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.22)' }} className="uppercase hover:opacity-60 transition-opacity duration-300">[ Drop 002 ]</Link>
          <a href="https://www.tiktok.com/@tvpofficial" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: 'rgba(0,0,0,0.22)' }} className="hover:opacity-60 transition-opacity duration-300">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/></svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
