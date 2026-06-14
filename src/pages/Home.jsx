import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import { mono, serif, inter, ease, reveal, lineGrow } from '../lib/design'

const CAP_COLORS = [
  { name: 'Black', imgSrc: '/cap-black.jpg' },
  { name: 'White', imgSrc: '/cap-white.jpg' },
]

const fast = (delay = 0) => ({ duration: 0.55, delay, ease })

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
  const heroRef = useRef(null)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingCTA(!entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Floating mobile CTA — appears after scrolling past hero */}
      {showFloatingCTA && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
          style={{ background: 'rgba(10,9,9,0.96)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between px-5 py-4 gap-4">
            <div>
              <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.60)', letterSpacing: '0.28em' }} className="uppercase">
                Drop 002 — August 2026
              </p>
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.16em' }}>
                The Tracksuit. Free to join.
              </p>
            </div>
            <Link
              to="/drop-002"
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.30em', background: '#F5F3EE', color: '#111111' }}
              className="flex items-center justify-center px-5 py-3 uppercase shrink-0 hover:bg-white/90 transition-colors duration-300"
            >
              Join →
            </Link>
          </div>
        </motion.div>
      )}

    <div className="bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════════════
          01 — HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 sm:px-12 text-center pt-[78px] overflow-hidden"
        aria-label="True Vision Project"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/cap-hooded.jpg)', filter: 'saturate(0.10) brightness(0.42)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.35) 100%)' }} aria-hidden="true" />

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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fast(0.58)}
            style={{ ...mono, fontSize: 'clamp(8px, 1.6vw, 9px)', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.28em' }}
            className="uppercase mb-5"
          >
            Drop 001 — 24 units — Sold out in 24 hours — No ads.
          </motion.p>

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
            className="flex flex-col gap-3 w-full max-w-[340px]"
          >
            <Link
              to="/drop-002"
              style={{ ...mono, fontSize: '10px', letterSpacing: '0.40em', background: '#F5F3EE', color: '#111111' }}
              className="w-full flex items-center justify-center px-8 py-5 uppercase hover:bg-white/90 active:scale-[0.98] transition-all duration-300"
            >
              [ Join the Waitlist ]
            </Link>
            <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.22em' }} className="text-center">
              Drop 002 — August 2026. Free. No spam.
            </p>
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
          02 — THE MISSION
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-16 sm:py-24"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="The Mission"
      >
        <div className="w-full max-w-3xl mx-auto px-6 sm:px-10">
          <SectionTag n="02" label="The Mission" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease }}
            className="flex flex-col gap-6"
          >
            <h2
              style={{ ...serif, fontSize: 'clamp(28px, 5.5vw, 44px)', color: '#111111', fontWeight: 400, lineHeight: 1.12 }}
            >
              We're building for people from backgrounds most brands ignore.
            </h2>

            <div className="flex flex-col gap-5">
              <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.8 }}>
                We know what it's like to come from the same place, carry the same struggles, want the same thing: proof that building something real together is possible.
              </p>

              <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.8 }}>
                TVP started on a train between two small towns—Wexford and Bergamo. No capital. No hype machine. Just a decision: make something real, sell it to people who actually want it, tell the truth about how it's done.
              </p>

              <p style={{ ...inter, fontSize: 'clamp(14px, 2vw, 16px)', color: 'rgba(0,0,0,0.60)', lineHeight: 1.8 }}>
                When you wear TVP, you're not buying a product. You're buying membership in something that says: <span style={{ ...serif, fontStyle: 'italic' }}>representation matters. Unity matters. Building from nothing works.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          03 — DROP 001 PROOF (sold out)
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative scroll-mt-[78px]"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Foundation Cap — Drop 001"
      >
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <SectionTag n="03" label="Drop 001 — Closed" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-start">

            <div className="grid grid-cols-2 gap-3">
              {CAP_COLORS.map(c => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, ease }}
                  className="relative overflow-hidden bg-[#DEDAD4] w-full aspect-[3/4]"
                >
                  <CornerMarks />
                  <img
                    src={c.imgSrc}
                    alt={`Foundation Cap — ${c.name}`}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    style={{ filter: 'saturate(0.18) brightness(0.88)', objectPosition: 'center' }}
                    draggable="false"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.72, delay: 0.1, ease }}
              className="flex flex-col gap-0"
            >
              <h2 style={{ ...serif, fontSize: 'clamp(30px, 5.5vw, 46px)', color: '#111111', fontWeight: 500, lineHeight: 1.08 }} className="mb-8">
                The Foundation Cap
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                {[['024', 'Units'], ['24h', 'Sold Out'], ['€32', 'Drop 001']].map(([n, l]) => (
                  <div key={l}>
                    <p style={{ ...serif, fontSize: 'clamp(24px, 4vw, 36px)', color: '#111111', fontWeight: 500, lineHeight: 1 }} className="mb-1">{n}</p>
                    <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.28em' }} className="uppercase">{l}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col mb-8" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                {[
                  ['Material', '300gsm Washed Chino Twill'],
                  ['Origin',   'Wexford / Bergamo'],
                  ['Edition',  'Drop 001 — No Reorder'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-3" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                    <span style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }} className="uppercase">{k}</span>
                    <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.10em' }} className="uppercase">{v}</span>
                  </div>
                ))}
              </div>

              <div className="w-full py-4 mb-5 flex items-center justify-center" style={{ border: '1px solid rgba(0,0,0,0.12)' }}>
                <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.40em' }} className="uppercase">
                  [ Sold Out ]
                </p>
              </div>

              <Link
                to="/drop-002"
                style={{ ...mono, fontSize: '9px', letterSpacing: '0.36em', background: '#111111', color: '#F5F3EE' }}
                className="w-full flex items-center justify-center py-5 uppercase hover:bg-[#2a2a2a] active:scale-[0.98] transition-all duration-300"
              >
                [ Join Drop 002 Waitlist ]
              </Link>
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.18em' }} className="text-center mt-3">
                Free. Be first when Drop 002 drops.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          04 — SOMETHING IS COMING (moved up for conversion)
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
          <SectionTag n="04" label="Drop 002 — Classified" dark />
          <motion.h2
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.04, ease }}
            style={{ ...serif, fontSize: 'clamp(50px, 13vw, 100px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.01 }}
            className="mb-8 sm:mb-10"
          >
            Something<br />Is Coming.
          </motion.h2>
          <motion.div {...reveal(0.16)} className="flex flex-col gap-[10px] mb-10 sm:mb-12">
            <p style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.32em' }} className="uppercase">[ August 2026 — The Tracksuit ]</p>
            <p style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.22em', lineHeight: 1.9 }} className="uppercase">
              3 colourways. Hidden pocket. Limited run.
            </p>
          </motion.div>

          <motion.div {...reveal(0.26)} className="flex flex-col gap-3 w-full max-w-[360px]">
            <Link to="/drop-002"
              style={{ ...mono, fontSize: '10px', letterSpacing: '0.40em', background: '#F5F3EE', color: '#111111' }}
              className="w-full flex items-center justify-center py-[22px] uppercase hover:bg-white/90 active:scale-[0.98] transition-all duration-300">
              [ Join the Waitlist ]
            </Link>
            <div className="flex items-center justify-between px-1 pt-1">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.20em' }}>
                Free. No spam.
              </p>
              <Link to="/drop-002"
                style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.22em', borderBottom: '1px solid rgba(255,255,255,0.12)' }}
                className="uppercase pb-px hover:opacity-60 transition-opacity duration-300">
                See what's coming →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          05 — DOCUMENTARY
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100dvh] flex items-center overflow-hidden"
        style={{ background: '#111111' }}
        aria-label="The Mission"
      >
        <div className="relative w-full max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
          <SectionTag n="05" label="Drop 001 — Documented" dark />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.85, ease }}
              className="relative overflow-hidden w-full aspect-[3/4] sm:aspect-[4/5]"
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
              <a href="https://www.tiktok.com/@truevisionproject" target="_blank" rel="noopener noreferrer"
                style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.28em' }}
                className="uppercase hover:text-white/50 transition-colors duration-300 w-fit">
                @truevisionproject &nbsp;→
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          06 — THE PEOPLE
      ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-16 sm:py-24"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="The People"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <SectionTag n="06" label="The People" />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
            {[
              '/community-dublin.jpg',
              '/richard-cap.jpg',
              '/billy-cap.jpg',
              '/cap-hooded.jpg',
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {['/unbox-2.mp4', '/customer-wearing.mp4'].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease }}
                className="relative overflow-hidden w-full aspect-[3/4] sm:aspect-video"
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
              [ DROP 001 — SOLD OUT ] &nbsp;&nbsp;·&nbsp;&nbsp; [ FOUNDATION CAP — 24 UNITS ] &nbsp;&nbsp;·&nbsp;&nbsp; [ DROP 002 — AUGUST 2026 ] &nbsp;&nbsp;·&nbsp;&nbsp; [ ARCHIVE — JOIN FREE ] &nbsp;&nbsp;·&nbsp;&nbsp; [ WEXFORD / IRELAND ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BERGAMO / ITALY ] &nbsp;&nbsp;·&nbsp;&nbsp; [ BUILT FROM NOTHING ] &nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <Footer />
    </div>
    </>
  )
}
