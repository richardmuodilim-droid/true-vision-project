import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const manifest = [
  { key: 'PROJECT ID',  value: '001' },
  { key: 'OBJECT',      value: 'THE FOUNDATION CAP' },
  { key: 'COMPOSITION', value: '300GSM WASHED CHINO TWILL' },
  { key: 'EDITION',     value: 'DROP 001' },
  { key: 'ORIGIN',      value: 'IRELAND / ITALY' },
  { key: 'STATUS',      value: 'IN PRODUCTION', live: true },
]

const processItems = [
  {
    src: '/process-1.png',
    caption: '[ LOC: WEXFORD / IRELAND - INITIAL CONCEPT ]',
    timestamp: '2026.01.14_09:32',
    fileRef: 'TVP-ARCHIVE-001',
  },
  {
    src: '/process-2.png',
    caption: '[ LOC: BERGAMO / ITALY - TEXTILE SELECTION ]',
    timestamp: '2026.02.03_14:17',
    fileRef: 'TVP-ARCHIVE-002',
  },
  {
    src: '/process-3.png',
    caption: '[ STATUS: PROTOTYPE 001 - PENDING ]',
    timestamp: '2026.03.21_11:45',
    fileRef: 'TVP-ARCHIVE-003',
  },
]

const images = [
  { src: '/cap-black.jpg', label: 'BLACK' },
  { src: '/cap-white.jpg', label: 'WHITE' },
]

const mono = { fontFamily: "'Space Mono', monospace" }

function formatMemberTag(name) {
  if (!name) return 'PROJECT_MEMBER_TVP001'
  return name.trim().toUpperCase().replace(/\s+/g, '_') + '_TVP001'
}

function getFirstName(name) {
  if (!name) return 'MEMBER'
  return name.trim().split(/\s+/)[0].toUpperCase()
}

const LS_KEY = 'TrueVisionMember'

export default function ArchiveEntry({ onLogout, userId, memberName }) {
  const [activeImg, setActiveImg] = useState(0)
  const [flickering, setFlickering] = useState(false)

  const handleDisconnect = () => {
    setFlickering(true)
    setTimeout(() => {
      try { localStorage.removeItem(LS_KEY) } catch {}
      onLogout()
    }, 420)
  }

  return (
    <motion.div
      className={`relative min-h-[100dvh] w-full bg-[#F5F3EE] flex flex-col${flickering ? ' vault-glitch' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.05) 100%)' }} />
      <div aria-hidden="true" className="grain" />

      {/* ── Sticky Technical Header ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 h-[26px] sm:h-8 bg-[#F5F3EE]"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Technical status bar"
      >
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.2em' }}>
          [ TRUE VISION PROJECT ]
        </span>
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.2em' }}
          className="hidden sm:block">
          [ PROJECT_MEMBER: {formatMemberTag(memberName)} ]
        </span>
        <span className="flex items-center gap-2" style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.18em' }}>
          [ STATUS:&nbsp;
          <span style={{ color: '#888' }}>LIVE</span>
          &nbsp;]
          <span className="status-dot" aria-hidden="true" />
        </span>
      </motion.div>

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 shrink-0 flex items-center justify-between px-6 sm:px-12 pt-7 mt-8"
      >
        <img src="/logo-archive.svg" alt="True Vision Project"
          width="80" height="80"
          className="w-16 h-16 sm:w-14 sm:h-14 object-contain select-none mb-3 sm:mb-2"
          style={{ filter: 'invert(1)' }}
          draggable="false" />
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.2em' }}>
          ARCHIVE // ENTRY_001
        </p>
      </motion.header>

      {/* ── Welcome Greeting ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
        className="relative z-10 text-center uppercase px-4 sm:px-0"
        style={{ ...mono, fontSize: 'clamp(10px, 2.2vw, 12px)', letterSpacing: '0.14em', color: '#111111', paddingBottom: '4px' }}
      >
        WELCOME TO THE ARCHIVE, {getFirstName(memberName)}. ACCESS GRANTED.
      </motion.p>

      {/* ── Main ── */}
      <main className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 px-4 sm:px-12 pt-6 md:pt-10 pb-6">

        {/* Left — image gallery */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-2 md:pr-10 mb-8 md:mb-0"
        >
          {/* Main image */}
          <div className="relative w-full aspect-square sm:aspect-[3/2] md:aspect-[4/5] overflow-hidden bg-[#E8E6E1]"
            style={{ filter: 'saturate(0.18) brightness(0.95)' }}>

            {/* Corner marks */}
            {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r',
              'bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c,i)=>(
              <span key={i} aria-hidden="true" className={`absolute w-5 h-5 z-10 ${c}`}
                style={{ borderColor: 'rgba(0,0,0,0.12)' }}/>
            ))}

            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={images[activeImg].src}
                alt={`Foundation Cap — ${images[activeImg].label}`}
                width="900" height="900"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center select-none"
                draggable="false"
              />
            </AnimatePresence>

            {/* Labels */}
            <div className="absolute bottom-3 left-4 z-10">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.25em' }}>
                {images[activeImg].label}
              </p>
            </div>
            <div className="absolute bottom-3 right-4 z-10">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.2em' }}>
                {String(activeImg+1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}
              </p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                aria-label={`View ${img.label}`} aria-pressed={activeImg === i}
                className={`relative flex-1 aspect-square overflow-hidden transition-all duration-300 cursor-pointer ${
                  activeImg === i ? 'opacity-100' : 'opacity-40 hover:opacity-65'
                }`}
                style={{
                  border: `1px solid ${activeImg === i ? 'rgba(0,0,0,0.28)' : 'rgba(0,0,0,0.08)'}`,
                  filter: 'saturate(0.1)',
                }}
              >
                <img src={img.src} alt={img.label} loading="lazy"
                  width="200" height="200"
                  className="w-full h-full object-cover object-center select-none"
                  draggable="false" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right — manifest */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center md:pl-10 md:border-l"
          style={{ borderColor: 'rgba(0,0,0,0.06)' }}
        >
          {/* Section label */}
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="mb-8 uppercase">
            Product Manifest
          </p>

          {/* Manifest rows */}
          <div className="flex flex-col mb-10 sm:mb-14">
            {manifest.map(({ key, value, live }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.07, ease: 'easeOut' }}
                className="flex items-start py-[16px] gap-4"
                style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
              >
                {/* Key */}
                <span
                  className="shrink-0 leading-snug"
                  style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.25em', minWidth: 'min(140px, 38vw)' }}
                >
                  [ {key} ]
                </span>
                {/* Value */}
                {live ? (
                  <span className="leading-snug status-live" style={{ ...mono, fontSize: '11px', letterSpacing: '0.06em' }}>
                    {value}
                  </span>
                ) : (
                  <span className="leading-snug" style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.72)', letterSpacing: '0.06em' }}>
                    {value}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left w-10 h-px mb-10"
            style={{ background: 'rgba(0,0,0,0.12)' }}
            aria-hidden="true"
          />

          {/* Serif statement */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.1, delay: 1.2, ease: 'easeOut' }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: '17px',
              color: '#111111',
              lineHeight: '1.85',
            }}
            className="text-center md:text-left"
          >
            The Foundation Cap. Built between Ireland and Italy.
          </motion.p>

        </motion.div>
      </main>

      {/* ── Manifesto ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 shrink-0 flex flex-col items-center text-center px-6 sm:px-16 py-8 sm:py-20"
        aria-label="Manifesto"
      >
        {/* Top rule */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="origin-top w-px h-10 mb-14"
          style={{ background: 'rgba(0,0,0,0.12)' }}
          aria-hidden="true"
        />

        {/* Main statement */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.85, ease: 'easeOut' }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: 'clamp(22px, 5.5vw, 42px)',
            color: '#111111',
            lineHeight: '1.25',
            letterSpacing: '-0.03em',
            maxWidth: '780px',
          }}
        >
          WE ARE NOT BUILDING A BRAND.<br />WE ARE DOCUMENTING A MISSION.
        </motion.p>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1.2, delay: 2.2, ease: 'easeOut' }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            color: '#111111',
            letterSpacing: '0.2em',
            marginTop: '28px',
          }}
          className="uppercase"
        >
          Two small towns. One fire. Built from nothing.
        </motion.p>

        {/* Bottom rule */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          className="origin-top w-px h-10 mt-14"
          style={{ background: 'rgba(0,0,0,0.12)' }}
          aria-hidden="true"
        />
      </motion.section>

      {/* ── Process Archive ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 shrink-0 px-4 sm:px-12 pt-2 pb-10"
        aria-label="Process Archive"
      >
        {/* Section label */}
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="mb-5 uppercase">
          Process Archive
        </p>

        {/* Mobile: vertical stack / Desktop: horizontal scroll */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-3 sm:overflow-x-auto pb-2 scrollbar-none" style={{ scrollSnapType: 'x mandatory' }}>
          {processItems.map((item, i) => (
            <div
              key={i}
              className="w-full sm:w-[280px] sm:shrink-0 flex flex-col gap-2"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image frame */}
              <div
                className="w-full relative overflow-hidden"
                style={{ aspectRatio: '4/3', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r',
                  'bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c, j) => (
                  <span key={j} aria-hidden="true" className={`absolute w-3 h-3 z-10 ${c}`}
                    style={{ borderColor: 'rgba(0,0,0,0.12)' }} />
                ))}
                <span
                  aria-hidden="true"
                  className="absolute top-3 left-3 z-10"
                  style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.2em' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  width="560"
                  height="420"
                  className="w-full h-full object-cover object-center select-none"
                  draggable="false"
                  style={{ filter: 'saturate(0.10) brightness(0.92) contrast(1.05)' }}
                />
              </div>

              {/* Caption */}
              <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.2em', lineHeight: '1.6' }}>
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Live Archive Feed ── */}
      <div
        className="relative z-10 shrink-0 w-full overflow-hidden py-2"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-hidden="true"
      >
        <div className="marquee-track" style={{ opacity: 0.35 }}>
          {[0, 1].map(i => (
            <span
              key={i}
              style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.2em', whiteSpace: 'nowrap', paddingRight: '4rem' }}
            >
              [ CONNECTION_SECURE ] &nbsp;&nbsp;...&nbsp;&nbsp; [ WEXFORD_ARCHIVE_SYNCED ] &nbsp;&nbsp;...&nbsp;&nbsp; [ BERGAMO_TEXTILE_VERIFIED ] &nbsp;&nbsp;...&nbsp;&nbsp; [ DROP_001_PENDING ] &nbsp;&nbsp;...&nbsp;&nbsp; [ RELENTLESS_EFFORT_REQUIRED ] &nbsp;&nbsp;...&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="relative z-10 shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-12 py-4 sm:py-6"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="flex items-center gap-4 justify-center sm:justify-start">
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.2em' }}>
            [SESSION: ACTIVE]
          </p>
          <a
            href="https://www.instagram.com/truevisionproject/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-colors duration-300"
            style={{ color: 'rgba(0,0,0,0.22)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.55)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.22)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleDisconnect}
            aria-label="Disconnect member and clear access"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.22)' }}
            className="uppercase transition-colors duration-300 cursor-pointer min-h-[44px] flex items-center hover:text-red-500/60"
          >
            [ switch member ]
          </button>
          <Link
            to="/our-story"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.35)', borderColor: 'rgba(0,0,0,0.08)' }}
            className="hidden sm:flex flex-none uppercase border px-4 sm:px-5 min-h-[44px] items-center justify-center transition-all duration-300"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.22)'; e.currentTarget.style.color = 'rgba(0,0,0,0.65)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; e.currentTarget.style.color = 'rgba(0,0,0,0.35)' }}
          >
            [ OUR STORY ]
          </Link>
          <Link
            to="/"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', borderColor: 'rgba(0,0,0,0.12)' }}
            className="flex-1 sm:flex-none uppercase border px-4 sm:px-6 min-h-[44px] flex items-center justify-center transition-all duration-300"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.28)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'rgba(0,0,0,0.45)' }}
          >
            [ SHOP DROP 001 ]
          </Link>
          <button
            onClick={onLogout}
            aria-label="Exit Archive"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', borderColor: 'rgba(0,0,0,0.12)' }}
            className="flex-1 sm:flex-none uppercase border px-4 sm:px-6 min-h-[44px] transition-all duration-300 cursor-pointer"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.28)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'rgba(0,0,0,0.45)' }}
          >
            [ EXIT ARCHIVE ]
          </button>
        </div>
      </motion.footer>
    </motion.div>
  )
}
