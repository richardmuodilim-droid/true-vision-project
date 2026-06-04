import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import { mono, serif, inter, ease, reveal, lineGrow } from '../lib/design'

function Photo({ src, alt, aspect = 'aspect-[3/4]', dark = false, location = null }) {
  const bg = dark ? '#1a1a1a' : '#D8D4CD'
  const bc = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)'
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.85, ease }}
      className={`relative overflow-hidden w-full ${aspect}`}
      style={{ background: bg }}
    >
      <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l z-10" style={{ borderColor: bc }} />
      <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r z-10" style={{ borderColor: bc }} />
      <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l z-10" style={{ borderColor: bc }} />
      <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r z-10" style={{ borderColor: bc }} />
      {src && (
        <img
          src={src}
          alt={alt ?? ''}
          className="absolute inset-0 w-full h-full object-cover object-center select-none"
          style={{ filter: 'saturate(0.18) brightness(0.90)' }}
          draggable="false"
        />
      )}
      {location && (
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.45))' }}>
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.80)', letterSpacing: '0.40em' }} className="uppercase">
            {location}
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

      {/* ─── OPENING ──────────────────────────────────────────────────── */}
      <section className="pt-[78px] max-w-5xl mx-auto px-6 sm:px-14 py-14 sm:py-20">

        <motion.p
          {...reveal(0, 0)}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.52em' }}
          className="uppercase mb-10"
        >
          True Vision Project — Origin
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-16 items-start">

          {/* Photo — first on mobile, right on desktop */}
          <div className="order-first sm:order-last mb-8 sm:mb-0">
            <Photo src="/25962.jpg" alt="The two founders on the train" aspect="aspect-[3/4]" />
          </div>

          {/* Text */}
          <div className="order-last sm:order-first">
            <motion.h1
              {...reveal(0.06)}
              style={{ ...serif, fontSize: 'clamp(38px, 7.5vw, 68px)', color: '#111111', fontWeight: 500, lineHeight: 1.05 }}
              className="mb-2"
            >
              Two small towns.<br />
              Two countries.<br />
              <em style={{ color: 'rgba(0,0,0,0.28)', fontStyle: 'italic' }}>One road.</em>
            </motion.h1>

            <motion.div {...lineGrow(0.20)} className="h-px w-12 my-8 origin-left" style={{ background: 'rgba(0,0,0,0.10)' }} aria-hidden="true" />

            <motion.p
              {...reveal(0.26)}
              style={{ ...inter, fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(0,0,0,0.52)', lineHeight: 1.88 }}
            >
              Different languages, different skies, different corners of the world — but underneath it all, the same story.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── WHERE IT STARTED ─────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-14 py-14 sm:py-20"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-start">

          <div>
            <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.48em' }} className="uppercase mb-6">
              [ Where It Started ]
            </motion.p>
            <motion.h2 {...reveal(0.06)} style={{ ...serif, fontSize: 'clamp(26px, 5vw, 42px)', color: '#111111', fontWeight: 500, lineHeight: 1.12 }} className="mb-6">
              Ordinary families.<br />Extraordinary decision.
            </motion.h2>
            <motion.p {...reveal(0.10)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9 }} className="mb-4">
              Both came from ordinary households. Families that didn't have much, but never made you feel it. People who worked hard, asked for little, and gave everything they had.
            </motion.p>
            <motion.p {...reveal(0.14)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9 }}>
              The kind of upbringing that teaches you the value of something before you ever have it. No silver spoons. No shortcuts. No connections.
            </motion.p>
          </div>

          <div className="flex flex-col gap-3">
            <Photo src="/wexford.jpg" alt="Wexford, Ireland" aspect="aspect-[16/10]" location="Wexford / Ireland" />
            <Photo src="/bergamo.jpg" alt="Bergamo, Italy" aspect="aspect-[16/10]" location="Bergamo / Italy" />
          </div>
        </div>
      </section>

      {/* ─── THE TURNING POINT ────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#111111' }}>
        <div className="relative max-w-3xl mx-auto px-6 sm:px-14 py-14 sm:py-24">

          <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.48em' }} className="uppercase mb-8">
            [ The Turning Point ]
          </motion.p>

          <motion.p
            {...reveal(0.06, 0)}
            style={{ ...serif, fontSize: 'clamp(13px, 1.6vw, 15px)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.22em', lineHeight: 1 }}
            className="uppercase mb-5"
          >
            That kind of background does one of two things to you.
          </motion.p>

          <motion.h2
            {...reveal(0.10)}
            style={{ ...serif, fontSize: 'clamp(32px, 7vw, 62px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.06 }}
            className="mb-8"
          >
            It makes you accept less.<br />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>Or it makes you refuse to.</span>
          </motion.h2>

          <motion.p {...reveal(0.16)} style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: '500px' }} className="mb-4">
            We refused. Not out of anger. Not out of bitterness. Out of love — for the people who gave everything so we could have a chance.
          </motion.p>

          <motion.p {...reveal(0.20)} style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: '500px' }}>
            We looked at where we came from and made a decision. This is not where the story ends. This is where it begins.
          </motion.p>
        </div>
      </section>

      {/* ─── THE FOUNDERS ─────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-14 py-14 sm:py-20"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.1fr] gap-10 sm:gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease }}
            className="relative overflow-hidden w-full aspect-[4/5] sm:aspect-[9/16]"
            style={{ background: '#1a1a1a' }}
          >
            <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l z-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r z-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
            <video autoPlay muted loop playsInline preload="metadata"
              className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center' }}>
              <source src="/IMG_1831~3.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div>
            <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.48em' }} className="uppercase mb-6">
              [ How We Found Each Other ]
            </motion.p>
            <motion.h2 {...reveal(0.06)} style={{ ...serif, fontSize: 'clamp(26px, 5vw, 42px)', color: '#111111', fontWeight: 500, lineHeight: 1.12 }} className="mb-6">
              Not just a friendship.<br />A foundation.
            </motion.h2>
            <motion.p {...reveal(0.10)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9 }} className="mb-4">
              Two people from two different corners of the world ended up on the same road. Same mindset. Same fire. Same reason to keep going.
            </motion.p>
            <motion.p {...reveal(0.14)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9 }}>
              Years of knowing each other, building trust, and realising that what we had between us — the shared hunger, the shared values, the shared refusal to accept less — was something worth building on.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── WHY WE BUILT THIS ────────────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto px-6 sm:px-14 py-14 sm:py-20 text-center flex flex-col items-center"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <motion.div {...lineGrow(0)} className="h-px w-10 mb-10 origin-center" style={{ background: 'rgba(0,0,0,0.09)' }} aria-hidden="true" />

        <motion.p {...reveal(0.04, 0)} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.48em' }} className="uppercase mb-6">
          [ Why We Built True Vision ]
        </motion.p>

        <motion.h2 {...reveal(0.08)} style={{ ...serif, fontSize: 'clamp(28px, 5.5vw, 48px)', color: '#111111', fontWeight: 500, lineHeight: 1.15 }} className="mb-7 max-w-xl">
          We started because we had nothing — and decided that was enough to begin.
        </motion.h2>

        <motion.p {...reveal(0.12)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.50)', lineHeight: 1.9, maxWidth: '520px' }} className="mb-4">
          No investors. No backing. No industry connections. Just two young men from small towns with a vision clear enough to build on and a story real enough to stand behind.
        </motion.p>

        <motion.p {...reveal(0.16)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.50)', lineHeight: 1.9, maxWidth: '520px' }}>
          We built it for our families. To prove that where you start does not decide where you finish. That ordinary beginnings can produce extraordinary things.
        </motion.p>
      </section>

      {/* ─── THE PRODUCT ──────────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto px-6 sm:px-14 py-14 sm:py-20"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16 items-start">

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Photo src="/25963.jpg" alt="The founders wearing TVP caps" aspect="aspect-[3/4]" />
              <Photo src="/25964.jpg" alt="The two founders on the train" aspect="aspect-[3/4]" />
            </div>
            <Photo src="/cap-detail (2).jpg" alt="Foundation Cap — Black &amp; White" aspect="aspect-[4/3]" />
          </div>

          <div className="sm:pt-6">
            <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.48em' }} className="uppercase mb-6">
              [ Drop 001 — The Foundation ]
            </motion.p>
            <motion.h2 {...reveal(0.06)} style={{ ...serif, fontSize: 'clamp(26px, 5vw, 42px)', color: '#111111', fontWeight: 500, lineHeight: 1.12 }} className="mb-6">
              The first physical proof<br />that it is possible.
            </motion.h2>
            <motion.p {...reveal(0.10)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9 }} className="mb-4">
              One product. Made with purpose. Limited by design. The first stone laid in something we intend to build for a long time.
            </motion.p>
            <motion.p {...reveal(0.14)} style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.52)', lineHeight: 1.9 }} className="mb-8">
              24 units. Sold in 24 hours. No paid ads. Just the product and the people who understood what they were buying into.
            </motion.p>
            <motion.div {...reveal(0.18)}>
              <Link
                to="/"
                style={{ ...mono, fontSize: '9px', letterSpacing: '0.36em', background: '#111111', color: '#F5F3EE' }}
                className="inline-flex items-center px-7 py-[18px] uppercase hover:bg-[#2a2a2a] transition-all duration-300"
              >
                [ View Drop 001 ]
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHO THIS IS FOR ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#111111' }}>
        <div className="relative max-w-3xl mx-auto px-6 sm:px-14 py-14 sm:py-24">

          <motion.p {...reveal()} style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.48em' }} className="uppercase mb-8">
            [ Who This Is For ]
          </motion.p>

          <motion.h2 {...reveal(0.06)} style={{ ...serif, fontSize: 'clamp(28px, 5.5vw, 50px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.12 }} className="mb-7">
            We believe our story<br />is your story too.
          </motion.h2>

          <motion.p {...reveal(0.10)} style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: '520px' }} className="mb-4">
            Most people are not born into opportunity. Most people come from ordinary places, ordinary families, ordinary beginnings. Most people are told — by circumstance if not by words — to be realistic.
          </motion.p>

          <motion.p {...reveal(0.14)} style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: '520px' }} className="mb-4">
            True Vision exists for everyone who looked at that hand and decided to play differently.
          </motion.p>

          <motion.p {...reveal(0.18)} style={{ ...inter, fontSize: '15px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.9, maxWidth: '520px' }}>
            This is for the ones who work in silence. Who build without applause. Who carry their family's name like a responsibility. If you understand that — you understand True Vision.
          </motion.p>
        </div>
      </section>

      {/* ─── THE STATEMENT ────────────────────────────────────────────── */}
      <section
        className="flex flex-col items-center text-center px-6 sm:px-16 py-16 sm:py-24"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.85, ease }}
          className="h-px w-10 mb-12 origin-center"
          style={{ background: 'rgba(0,0,0,0.09)', transformOrigin: 'center' }}
          aria-hidden="true"
        />

        <motion.p
          {...reveal(0.04, 0)}
          style={{ ...serif, fontSize: 'clamp(24px, 5vw, 44px)', color: '#111111', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.46, maxWidth: '560px' }}
          className="mb-8"
        >
          "Built from nothing.<br />Worn by those who understand."
        </motion.p>

        <motion.p {...reveal(0.10, 0)} style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.38em' }} className="uppercase mb-10">
          True Vision Project — Est. 2026
        </motion.p>

        <motion.div {...reveal(0.16)} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm sm:max-w-none sm:w-auto">
          <Link
            to="/archive"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', background: '#111111', color: '#F5F3EE' }}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-5 uppercase hover:bg-[#2a2a2a] active:scale-[0.98] transition-all duration-300"
          >
            [ Enter the Archive ]
          </Link>
          <Link
            to="/"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.36em', color: 'rgba(0,0,0,0.38)', border: '1px solid rgba(0,0,0,0.13)' }}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-5 uppercase hover:border-black/30 hover:text-black/60 transition-all duration-300"
          >
            [ View Drop 001 ]
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
