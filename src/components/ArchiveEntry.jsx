import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const specs = [
  { label: 'PROJECT ID', value: '001' },
  { label: 'PRODUCT',    value: 'THE FOUNDATION CAP' },
  { label: 'FABRIC',     value: '300GSM WASHED COTTON' },
  { label: 'HARDWARE',   value: 'METAL SLIDER' },
  { label: 'STATUS',     value: 'IN PRODUCTION' },
]

const images = [
  { src: '/product-1.png', alt: 'Foundation Cap — Front view' },
  { src: '/product-3.png', alt: 'Foundation Cap — 3/4 angle view' },
  { src: '/product-2.png', alt: 'Foundation Cap — Back view, Built From Nothing' },
]

const mono = { fontFamily: "'Space Mono', monospace" }

export default function ArchiveEntry({ onLogout }) {
  const [activeImg, setActiveImg] = useState(0)

  return (
    <motion.div
      className="relative min-h-[100dvh] w-full bg-[#000000] text-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% -5%, rgba(255,255,255,0.03) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 40%, rgba(0,0,0,0.65) 85%, rgba(0,0,0,0.97) 100%)' }} />
      <div aria-hidden="true" className="grain" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-7 pb-0 shrink-0"
      >
        <img
          src="/logo-archive.svg"
          alt="True Vision Project"
          width="40"
          height="40"
          className="w-9 h-9 object-contain select-none"
          draggable="false"
        />
        <p style={{ ...mono, fontSize: '8px', color: '#3a3a3a', letterSpacing: '0.15em' }}>
          ARCHIVE // ENTRY_001
        </p>
      </motion.header>

      {/* Main grid */}
      <main className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 px-6 sm:px-12 pt-8 pb-6 gap-8 md:gap-12">

        {/* ── Left: Image Gallery ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3"
        >
          {/* Main image */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[4/5] overflow-hidden bg-[#080808]">
            {/* Corner markers */}
            {[
              'top-0 left-0 border-t border-l',
              'top-0 right-0 border-t border-r',
              'bottom-0 left-0 border-b border-l',
              'bottom-0 right-0 border-b border-r',
            ].map((cls, i) => (
              <span key={i} aria-hidden="true"
                className={`absolute w-5 h-5 border-white/15 z-10 ${cls}`} />
            ))}

            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={images[activeImg].src}
                alt={images[activeImg].alt}
                width="800"
                height="800"
                loading="eager"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center select-none"
                draggable="false"
              />
            </AnimatePresence>

            {/* Shot label */}
            <div className="absolute bottom-3 left-4 z-10">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.25em' }}>
                {activeImg === 0 ? 'FRONT' : activeImg === 1 ? '3/4 ANGLE' : 'BACK'}
              </p>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-3 right-4 z-10">
              <p style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>
                {String(activeImg + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={img.alt}
                aria-pressed={activeImg === i}
                className={`
                  relative flex-1 aspect-square overflow-hidden
                  border transition-all duration-400 cursor-pointer
                  ${activeImg === i
                    ? 'border-white/40'
                    : 'border-white/[0.06] hover:border-white/20 opacity-50 hover:opacity-80'
                  }
                `}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width="200"
                  height="200"
                  className="w-full h-full object-cover object-center select-none"
                  draggable="false"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Spec block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center md:pl-8 md:border-l border-white/[0.04]"
        >
          {/* Label */}
          <p style={{ ...mono, fontSize: '7px', color: '#2a2a2a', letterSpacing: '0.4em' }} className="mb-8 uppercase">
            Technical Specification
          </p>

          {/* Spec rows */}
          <div className="flex flex-col mb-10 sm:mb-14">
            {specs.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-white/[0.05] gap-1"
              >
                <span
                  className="shrink-0 sm:w-[148px]"
                  style={{ ...mono, fontSize: '7px', color: '#2e2e2e', letterSpacing: '0.2em' }}
                >
                  [{label}]
                </span>
                <span style={{ ...mono, fontSize: '11px', color: '#aaaaaa', letterSpacing: '0.08em' }}>
                  {value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-white/10 mb-10" aria-hidden="true" />

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }}
            style={{ ...mono, fontSize: '13px', color: '#ffffff', letterSpacing: '0.06em', lineHeight: '2.1' }}
            className="uppercase font-bold"
          >
            Two small towns.<br />One fire.<br />Built from nothing.
          </motion.p>
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
        className="relative z-10 shrink-0 flex items-center justify-between px-6 sm:px-12 py-6 border-t border-white/[0.04]"
      >
        <p style={{ ...mono, fontSize: '8px', color: '#222', letterSpacing: '0.15em' }}>
          [SESSION: ACTIVE]
        </p>

        <button
          onClick={onLogout}
          aria-label="Return to Vault"
          style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}
          className="
            text-white/20 uppercase
            border border-white/[0.07]
            px-5 py-3 min-h-[44px]
            hover:border-white/20 hover:text-white/50
            active:border-white/20 active:text-white/50
            transition-all duration-500 cursor-pointer
          "
        >
          [ Log Out ]
        </button>
      </motion.footer>
    </motion.div>
  )
}
