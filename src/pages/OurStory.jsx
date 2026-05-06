import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

// ─── Animation helpers ────────────────────────────────────────────────────────

const reveal = (delay = 0) => ({
  initial:     { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

const fadeIn = (delay = 0) => ({
  initial:     { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.7, delay },
})

const lineGrow = (delay = 0) => ({
  initial:     { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport:    { once: true },
  transition:  { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
})

const wipeDown = (delay = 0) => ({
  initial:     { clipPath: 'inset(0 0 100% 0)' },
  whileInView: { clipPath: 'inset(0 0 0% 0)' },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
})

// Slides a text line up from below its container (parent needs overflow:hidden)
function LineReveal({ children, style, delay = 0 }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'block', ...style }}
        initial={{ y: '108%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Image slot — swap src prop when you have photos
function Photo({ label, aspect = 'aspect-[3/4]', dark = false, src }) {
  const bg         = dark ? '#1c1c1c' : '#D8D4CD'
  const borderCol  = dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'
  const textCol    = dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.20)'

  return (
    <motion.div {...wipeDown()} className={`relative overflow-hidden w-full ${aspect}`} style={{ background: bg }}>
      {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r',
        'bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c, i) => (
        <span key={i} aria-hidden="true" className={`absolute w-6 h-6 z-10 ${c}`}
          style={{ borderColor: borderCol }} />
      ))}
      {src ? (
        <img src={src} alt={label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.20) brightness(0.92)' }}
          draggable="false" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <p style={{ ...mono, fontSize: '7px', color: textCol, letterSpacing: '0.38em', lineHeight: 1.9 }}
            className="uppercase">{label}</p>
        </div>
      )}
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurStory() {
  return (
    <div className="bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      {/* ══════════════════════════════════════════════════════════════
          01  OPENING  — full screen, light
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.05 }}
          style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }}
          className="uppercase mb-9"
        >
          True Vision Project &nbsp;·&nbsp; Est. 2026
        </motion.p>

        <div style={{ maxWidth: '720px' }}>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.10, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...serif, fontSize: 'clamp(54px, 12vw, 110px)', color: '#111111', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.02em' }}
            >
              Two towns.
            </motion.h1>
          </span>
          <span style={{ display: 'block', overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...serif, fontSize: 'clamp(54px, 12vw, 110px)', color: '#111111', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.02em', fontStyle: 'italic' }}
            >
              One road.
            </motion.h1>
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.36 }}
          style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.42em' }}
          className="uppercase mt-9"
        >
          Wexford, Ireland &nbsp;×&nbsp; Bergamo, Italy
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.55 }}
          className="absolute bottom-8 flex flex-col items-center" aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }} transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '34px', background: 'rgba(0,0,0,0.14)' }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          02  OPENING QUOTE  — dark
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#111111] px-6 sm:px-14 py-20 sm:py-28 flex flex-col items-center text-center">
        <motion.p {...fadeIn()}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.48em' }}
          className="uppercase mb-10"
        >
          The beginning
        </motion.p>

        <div style={{ maxWidth: '660px' }}>
          {[
            { t: '"We didn\'t start because we had money,',          col: '#ffffff',                   d: 0.04 },
            { t: 'connections, or a blueprint.',                     col: '#ffffff',                   d: 0.10 },
            { t: 'We started because we had nothing —',             col: 'rgba(255,255,255,0.38)',    d: 0.17 },
            { t: 'and decided that was enough to begin."',          col: '#ffffff',                   d: 0.24 },
          ].map(({ t, col, d }) => (
            <LineReveal key={t} delay={d}
              style={{ ...serif, fontSize: 'clamp(22px, 4.5vw, 38px)', color: col, fontWeight: 400, lineHeight: 1.38, fontStyle: 'italic' }}>
              {t}
            </LineReveal>
          ))}
        </div>

        <motion.div {...lineGrow(0.38)} className="origin-left h-px mt-12 mb-5 w-10"
          style={{ background: 'rgba(255,255,255,0.10)' }} aria-hidden="true" />
        <motion.p {...fadeIn(0.42)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.38em' }}
          className="uppercase">
          — True Vision Project, 2026
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          03  CHAPTER 01 · ORIGINS  — light, two-col
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <motion.p {...fadeIn()}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.20)', letterSpacing: '0.55em' }}
          className="uppercase mb-14"
        >
          01 / 03 &nbsp;·&nbsp; Where It Started
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 items-start">

          {/* Photo slot A — replace src="/your-image.jpg" when ready */}
          <div>
            <Photo label={'Founder photo\nReplace: add src="/your-image.jpg"'} aspect="aspect-[3/4]" />
            <motion.p {...fadeIn(0.1)}
              style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.28em' }}
              className="uppercase mt-3">
              Wexford, Ireland
            </motion.p>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6 sm:pt-10">
            <div>
              <LineReveal style={{ ...serif, fontSize: 'clamp(28px, 4vw, 44px)', color: '#111111', fontWeight: 500, lineHeight: 1.1 }}>
                Two ordinary kids.
              </LineReveal>
              <LineReveal delay={0.08}
                style={{ ...serif, fontSize: 'clamp(28px, 4vw, 44px)', color: 'rgba(0,0,0,0.30)', fontWeight: 500, lineHeight: 1.1, fontStyle: 'italic' }}>
                Extraordinary purpose.
              </LineReveal>
            </div>

            <motion.div {...lineGrow(0.1)} className="origin-left h-px w-8"
              style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />

            <motion.p {...reveal(0.14)}
              style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.95, fontWeight: 300 }}>
              One grew up in a small town in Italy. One in a small town in Ireland. Different languages, different skies — but underneath it all, the same story.
            </motion.p>
            <motion.p {...reveal(0.20)}
              style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.95, fontWeight: 300 }}>
              Families who worked hard, asked for little, and gave everything. The kind of upbringing that teaches you the value of something before you ever have it.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          04  PULL QUOTE  — light, centered
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-6 sm:px-14 py-16 sm:py-24 flex flex-col items-center text-center"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: '560px' }}>
          {[
            { t: 'That background does one of two things.',  col: '#111111',           d: 0,    w: 600 },
            { t: 'It makes you accept less.',               col: 'rgba(0,0,0,0.35)',  d: 0.09, w: 400, i: true },
            { t: 'Or it makes you refuse to.',              col: 'rgba(0,0,0,0.35)',  d: 0.17, w: 400, i: true },
            { t: 'We refused.',                             col: '#111111',           d: 0.26, w: 700 },
          ].map(({ t, col, d, w, i }) => (
            <LineReveal key={t} delay={d}
              style={{ ...serif, fontSize: 'clamp(20px, 4vw, 34px)', color: col, fontWeight: w, lineHeight: 1.45, fontStyle: i ? 'italic' : 'normal', marginBottom: '2px' }}>
              {t}
            </LineReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          05  FULL-BLEED IMAGE  — dark, wide
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#111111]">
        {/* Photo slot B — replace contents with <img src="/both-founders.jpg" .../> */}
        <motion.div {...wipeDown()}
          className="relative w-full overflow-hidden bg-[#1a1a1a] flex items-center justify-center"
          style={{ aspectRatio: '21/9', minHeight: '220px' }}
        >
          {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r',
            'bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c, i) => (
            <span key={i} aria-hidden="true" className={`absolute w-7 h-7 z-10 ${c}`}
              style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
          ))}
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.42em' }}
            className="uppercase z-10 text-center px-6">
            [ Both founders — add src="/both-founders.jpg" to this section ]
          </p>
        </motion.div>

        <motion.div {...fadeIn(0.2)} className="px-6 sm:px-10 py-4 flex justify-between items-center">
          <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.16)', letterSpacing: '0.32em' }} className="uppercase">
            Drop 001 — 2026
          </span>
          <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.16)', letterSpacing: '0.32em' }} className="uppercase">
            Wexford &nbsp;×&nbsp; Bergamo
          </span>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          06  CHAPTER 02 · THE MISSION  — light, reversed
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <motion.p {...fadeIn()}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.20)', letterSpacing: '0.55em' }}
          className="uppercase mb-14 text-right"
        >
          02 / 03 &nbsp;·&nbsp; Why We Built This
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-14 items-start">

          {/* Text — left on desktop */}
          <div className="flex flex-col gap-6 sm:pt-10 order-2 sm:order-1">
            <div>
              <LineReveal style={{ ...serif, fontSize: 'clamp(28px, 4vw, 44px)', color: '#111111', fontWeight: 500, lineHeight: 1.1 }}>
                We built it for
              </LineReveal>
              <LineReveal delay={0.08}
                style={{ ...serif, fontSize: 'clamp(28px, 4vw, 44px)', color: 'rgba(0,0,0,0.28)', fontWeight: 500, lineHeight: 1.1, fontStyle: 'italic' }}>
                our families.
              </LineReveal>
            </div>

            <motion.div {...lineGrow(0.1)} className="origin-left h-px w-8"
              style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />

            <motion.p {...reveal(0.14)}
              style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.95, fontWeight: 300 }}>
              No investors. No backing. No industry connections. Just two young men from small towns with a vision clear enough to build on and a story real enough to stand behind.
            </motion.p>
            <motion.p {...reveal(0.20)}
              style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.95, fontWeight: 300 }}>
              To prove that where you start does not decide where you finish. That ordinary beginnings can produce extraordinary things.
            </motion.p>
          </div>

          {/* Photo slot C */}
          <div className="order-1 sm:order-2">
            <Photo label={'Second founder photo\nReplace: add src="/your-image-2.jpg"'} aspect="aspect-[3/4]" />
            <motion.p {...fadeIn(0.1)}
              style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.28em' }}
              className="uppercase mt-3 text-right">
              Bergamo, Italy
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          07  CHAPTER 03 · WHO THIS IS FOR  — dark
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#111111] px-6 sm:px-14 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.p {...fadeIn()}
            style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.55em' }}
            className="uppercase mb-14"
          >
            03 / 03 &nbsp;·&nbsp; Who This Is For
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 items-start">
            <div>
              <LineReveal style={{ ...serif, fontSize: 'clamp(26px, 4vw, 42px)', color: '#ffffff', fontWeight: 400, lineHeight: 1.25 }}>
                This is for the ones
              </LineReveal>
              <LineReveal delay={0.08}
                style={{ ...serif, fontSize: 'clamp(26px, 4vw, 42px)', color: '#ffffff', fontWeight: 400, lineHeight: 1.25 }}>
                who work in silence.
              </LineReveal>
              <LineReveal delay={0.16}
                style={{ ...serif, fontSize: 'clamp(26px, 4vw, 42px)', color: 'rgba(255,255,255,0.32)', fontWeight: 400, lineHeight: 1.25, fontStyle: 'italic' }}>
                Who build without applause.
              </LineReveal>
            </div>

            <div className="flex flex-col gap-5">
              <motion.p {...reveal(0.10)}
                style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.46)', lineHeight: 1.95, fontWeight: 300 }}>
                Most people are not born into opportunity. Most come from ordinary places, ordinary families, ordinary beginnings — and are told, by circumstance if not by words, to be realistic.
              </motion.p>
              <motion.p {...reveal(0.18)}
                style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.46)', lineHeight: 1.95, fontWeight: 300 }}>
                True Vision exists for everyone who looked at that hand and decided to play differently.
              </motion.p>
              <motion.p {...reveal(0.26)}
                style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.95, fontWeight: 400 }}>
                If you understand that — you understand True Vision.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          08  CLOSING STATEMENT  — light, full-screen feel
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 sm:py-36 min-h-[65vh]">

        <motion.div {...lineGrow()} className="origin-center h-px w-10 mb-14"
          style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />

        <div style={{ maxWidth: '740px' }}>
          <LineReveal
            style={{ ...serif, fontSize: 'clamp(38px, 9vw, 82px)', color: '#111111', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.015em' }}>
            Built from nothing.
          </LineReveal>
          <LineReveal delay={0.1}
            style={{ ...serif, fontSize: 'clamp(38px, 9vw, 82px)', color: 'rgba(0,0,0,0.25)', fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.015em', fontStyle: 'italic' }}>
            Worn by those who understand.
          </LineReveal>
        </div>

        <motion.div {...lineGrow(0.22)} className="origin-center h-px w-10 mt-12 mb-10"
          style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />

        <motion.div {...reveal(0.28)} className="flex flex-col sm:flex-row items-center gap-5">
          <Link
            to="/"
            className="inline-block px-10 py-[14px] bg-[#111111] text-[#F5F3EE] hover:bg-[#2a2a2a] transition-colors duration-300"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.42em' }}
          >
            Shop Drop 001
          </Link>
          <Link
            to="/archive"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
            className="uppercase pb-px hover:opacity-50 transition-opacity duration-300"
          >
            Join the Archive →
          </Link>
        </motion.div>

        <motion.p {...fadeIn(0.42)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.16)', letterSpacing: '0.38em' }}
          className="uppercase mt-14"
        >
          True Vision. Est. 2026. This is only the beginning.
        </motion.p>
      </section>

    </div>
  )
}
