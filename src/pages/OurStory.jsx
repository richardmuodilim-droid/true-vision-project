import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const ease = [0.16, 1, 0.3, 1]

const reveal = (delay = 0, y = 22) => ({
  initial:     { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.75, delay, ease },
})

const lineGrow = (delay = 0) => ({
  initial:     { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport:    { once: true },
  transition:  { duration: 0.85, delay, ease },
})

function LineReveal({ children, style, delay = 0 }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        style={{ display: 'block', ...style }}
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.7, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function PhotoSlot({ label, aspect = 'aspect-[3/4]', dark = false, src }) {
  const bg = dark ? '#1a1a1a' : '#D8D4CD'
  const borderColor = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)'
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.85, ease }}
      className={`relative overflow-hidden w-full ${aspect}`}
      style={{ background: bg }}
    >
      {/* Corner marks */}
      <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l z-10" style={{ borderColor }} />
      <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r z-10" style={{ borderColor }} />
      <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l z-10" style={{ borderColor }} />
      <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r z-10" style={{ borderColor }} />

      {src ? (
        <img
          src={src}
          alt={label ?? ''}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(0.18) brightness(0.92)' }}
          draggable="false"
        />
      ) : (
        <div className="absolute inset-0 flex items-end p-4">
          <p style={{ ...mono, fontSize: '7px', color: dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)', letterSpacing: '0.28em' }} className="uppercase">
            {label}
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default function OurStory() {
  return (
    <div className="bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      {/* ─── 01 / Opening ─────────────────────────────────────────────── */}
      <section className="pt-[78px] min-h-[100dvh] flex flex-col justify-center px-6 sm:px-12 max-w-3xl mx-auto">

        <motion.p
          {...reveal(0.05, 0)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.5em' }}
          className="uppercase mb-10"
        >
          Our Story
        </motion.p>

        <div className="mb-10">
          <LineReveal style={{ ...serif, fontSize: 'clamp(42px, 9vw, 78px)', color: '#111111', fontWeight: 500, lineHeight: 1.04 }} delay={0.08}>
            Two people.
          </LineReveal>
          <LineReveal style={{ ...serif, fontSize: 'clamp(42px, 9vw, 78px)', color: '#111111', fontWeight: 500, lineHeight: 1.04 }} delay={0.18}>
            One idea.
          </LineReveal>
          <LineReveal style={{ ...serif, fontSize: 'clamp(42px, 9vw, 78px)', color: 'rgba(0,0,0,0.25)', fontWeight: 500, lineHeight: 1.04, fontStyle: 'italic' }} delay={0.28}>
            No money.
          </LineReveal>
        </div>

        <motion.div {...lineGrow(0.45)} className="h-px w-16 origin-left mb-10" style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />

        <motion.p
          {...reveal(0.5)}
          style={{ ...inter, fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(0,0,0,0.55)', lineHeight: 1.85, maxWidth: '520px' }}
        >
          We didn't start with a brand strategy. We started with a conversation. Two friends, different cities, same hunger. Something had to be built.
        </motion.p>
      </section>

      {/* ─── 02 / Wexford ─────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-12 py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 items-center">

          <div>
            <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.45em' }} className="uppercase mb-6">
              Wexford / Ireland
            </motion.p>
            <motion.h2 {...reveal(0.08)} style={{ ...serif, fontSize: 'clamp(30px, 5vw, 46px)', color: '#111111', fontWeight: 500, lineHeight: 1.1 }} className="mb-6">
              Richard.<br />Built from the ground up.
            </motion.h2>
            <motion.p {...reveal(0.14)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.88 }}>
              From Wexford, Ireland. Working family. No connections, no backing, no safety net. The only thing available was the decision to start. So he started.
            </motion.p>
            <motion.div {...reveal(0.20)} className="mt-8">
              <motion.div {...lineGrow(0.2)} className="h-px w-10 origin-left" style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />
            </motion.div>
          </div>

          <PhotoSlot label="Richard — Wexford" aspect="aspect-[3/4]" />
        </div>
      </section>

      {/* ─── 03 / Bergamo ─────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-12 py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 items-center">

          <PhotoSlot label="The Partner — Bergamo" aspect="aspect-[3/4]" />

          <div>
            <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.45em' }} className="uppercase mb-6">
              Bergamo / Italy
            </motion.p>
            <motion.h2 {...reveal(0.08)} style={{ ...serif, fontSize: 'clamp(30px, 5vw, 46px)', color: '#111111', fontWeight: 500, lineHeight: 1.1 }} className="mb-6">
              The partner.<br />A different city, the same idea.
            </motion.h2>
            <motion.p {...reveal(0.14)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.88 }}>
              From Bergamo, Italy. Same background, different country. When they found each other, the conversation was immediate. Neither of them was waiting for permission.
            </motion.p>
            <motion.div {...reveal(0.20)} className="mt-8">
              <motion.div {...lineGrow(0.2)} className="h-px w-10 origin-left" style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 04 / The Beginning ───────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#111111' }}
      >
        <div className="relative max-w-3xl mx-auto px-6 sm:px-12 py-20 sm:py-28">

          <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.45em' }} className="uppercase mb-8">
            [ How It Started ]
          </motion.p>

          <motion.blockquote
            {...reveal(0.08, 0)}
            style={{ ...serif, fontSize: 'clamp(22px, 4vw, 34px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.55, fontStyle: 'italic' }}
            className="mb-10"
          >
            "No investor. No brand consultant. No budget. Just two people who decided that the idea was more important than the risk."
          </motion.blockquote>

          <motion.p {...reveal(0.16)} style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: '480px' }}>
            The first drop was 24 units. A cap. Made from 300gsm washed chino twill. Nothing special on paper. But it sold out in 24 hours — to people who understood what they were buying into.
          </motion.p>

          <motion.div {...reveal(0.22)} className="mt-10">
            <motion.div {...lineGrow(0.22)} className="h-px w-10 origin-left" style={{ background: 'rgba(255,255,255,0.14)' }} aria-hidden="true" />
          </motion.div>
        </div>
      </section>

      {/* ─── 05 / Drop 001 ────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-12 py-20 sm:py-28"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 items-start">

          <div>
            <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.45em' }} className="uppercase mb-6">
              Drop 001 — The Foundation Cap
            </motion.p>
            <motion.h2 {...reveal(0.08)} style={{ ...serif, fontSize: 'clamp(28px, 5vw, 42px)', color: '#111111', fontWeight: 500, lineHeight: 1.12 }} className="mb-6">
              The first thing<br />we ever made.
            </motion.h2>
            <motion.p {...reveal(0.14)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.88 }} className="mb-5">
              24 units. Two colours. One size. Sold out in 24 hours. No paid ads. No influencers. Just the product and the people who believed in it.
            </motion.p>
            <motion.p {...reveal(0.20)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.88 }}>
              That was the proof. Drop 002 is next.
            </motion.p>
          </div>

          <div className="flex flex-col gap-4">
            <PhotoSlot label="Foundation Cap — Drop 001" aspect="aspect-[4/5]" />
            <div className="grid grid-cols-2 gap-3">
              <PhotoSlot label="Black" aspect="aspect-square" />
              <PhotoSlot label="White" aspect="aspect-square" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06 / What This Is ────────────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto px-6 sm:px-12 py-20 sm:py-28 text-center flex flex-col items-center"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <motion.div {...lineGrow()} className="h-px w-10 origin-center mb-12" style={{ background: 'rgba(0,0,0,0.09)' }} aria-hidden="true" />

        <motion.p {...reveal(0.05, 0)} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.45em' }} className="uppercase mb-8">
          What This Is
        </motion.p>

        <motion.h2 {...reveal(0.10)} style={{ ...serif, fontSize: 'clamp(28px, 5vw, 46px)', color: '#111111', fontWeight: 500, lineHeight: 1.2 }} className="mb-8">
          This is not a brand.<br />It's a document.
        </motion.h2>

        <motion.p {...reveal(0.16)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9, maxWidth: '480px' }} className="mb-5">
          Every drop is a chapter. Every piece tells you where we are and where we're going. The Archive is the record of everyone who believed before this was anything.
        </motion.p>

        <motion.p {...reveal(0.22)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9, maxWidth: '480px' }}>
          If you're reading this, you found us early. That means something.
        </motion.p>
      </section>

      {/* ─── 07 / CTA ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#111111' }}
      >
        <div className="relative max-w-3xl mx-auto px-6 sm:px-12 py-20 sm:py-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">

          <div>
            <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.45em' }} className="uppercase mb-5">
              [ Join The Foundation ]
            </motion.p>
            <motion.h2 {...reveal(0.08)} style={{ ...serif, fontSize: 'clamp(26px, 4.5vw, 40px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.2 }}>
              "Built from nothing.<br />Worn by those<br />who understand."
            </motion.h2>
          </div>

          <motion.div {...reveal(0.14)} className="flex flex-col gap-3 shrink-0">
            <Link
              to="/archive"
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', background: '#F5F3EE', color: '#111111' }}
              className="flex items-center justify-center px-7 py-5 uppercase hover:bg-white/90 active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
            >
              [ Enter the Archive ]
            </Link>
            <Link
              to="/"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.30em', color: 'rgba(255,255,255,0.30)', border: '1px solid rgba(255,255,255,0.12)' }}
              className="flex items-center justify-center px-7 py-4 uppercase hover:bg-white/[0.05] transition-all duration-300 whitespace-nowrap"
            >
              [ View Drop 001 ]
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer
        className="px-6 sm:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
      >
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.22em' }}>
          © 2026 TRUE VISION PROJECT
        </p>
        <Link
          to="/"
          style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.22)' }}
          className="uppercase hover:opacity-60 transition-opacity duration-300"
        >
          ← Back to Store
        </Link>
      </footer>
    </div>
  )
}
