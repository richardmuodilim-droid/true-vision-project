import { motion } from 'framer-motion'

const specs = [
  { label: 'PROJECT ID', value: '001' },
  { label: 'PRODUCT',    value: 'THE FOUNDATION CAP' },
  { label: 'FABRIC',     value: '300GSM WASHED COTTON' },
  { label: 'HARDWARE',   value: 'METAL SLIDER' },
  { label: 'STATUS',     value: 'IN PRODUCTION' },
]

const mono = { fontFamily: "'Space Mono', monospace" }

export default function ArchiveEntry({ onLogout }) {
  return (
    <motion.div
      className="relative min-h-[100dvh] w-full bg-[#000000] text-white flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% -5%, rgba(255,255,255,0.035) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.96) 100%)' }} />
      <div aria-hidden="true" className="grain" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-8 pb-0"
      >
        <img
          src="/logo-archive.svg"
          alt="True Vision Project"
          width="40"
          height="40"
          className="w-9 h-9 object-contain select-none"
          draggable="false"
        />
        <p style={{ ...mono, fontSize: '8px', color: '#444', letterSpacing: '0.15em' }}>
          ARCHIVE // ENTRY_001
        </p>
      </motion.header>

      {/* Main — single column on mobile, 2 col on md+ */}
      <main className="relative z-10 flex-1 flex flex-col md:grid md:grid-cols-2 gap-0 px-6 sm:px-12 pt-8 pb-10 md:pt-14">

        {/* Left — hero image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center md:pr-10 mb-10 md:mb-0"
        >
          <div
            className="w-full max-w-[340px] mx-auto md:max-w-none aspect-square md:aspect-[4/5] bg-[#0c0c0c] flex items-center justify-center relative overflow-hidden"
            style={{ filter: 'saturate(0)' }}
          >
            {/* Placeholder hat silhouette */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 opacity-20">
              <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 sm:w-52" aria-hidden="true">
                <path d="M20 100 Q100 20 180 100" stroke="white" strokeWidth="1.5" fill="none"/>
                <path d="M20 100 Q100 60 180 100 L190 108 Q100 80 10 108 Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="0.5"/>
                <rect x="85" y="18" width="30" height="4" rx="1" fill="white" fillOpacity="0.3"/>
                <line x1="10" y1="108" x2="190" y2="108" stroke="white" strokeWidth="1" opacity="0.3"/>
              </svg>
              <p style={{ ...mono, fontSize: '7px', color: '#fff', letterSpacing: '0.4em' }}>IMAGE PENDING</p>
            </div>

            {/* Corner markers */}
            {[
              'top-3 left-3 border-t border-l',
              'top-3 right-3 border-t border-r',
              'bottom-3 left-3 border-b border-l',
              'bottom-3 right-3 border-b border-r',
            ].map((cls, i) => (
              <span key={i} aria-hidden="true" className={`absolute w-4 h-4 border-white/20 ${cls}`} />
            ))}
          </div>
        </motion.div>

        {/* Right — spec block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center md:pl-10 md:border-l border-white/[0.05]"
        >
          {/* Section label */}
          <p style={{ ...mono, fontSize: '7px', color: '#333', letterSpacing: '0.35em' }} className="mb-6 uppercase">
            Technical Specification
          </p>

          {/* Specs */}
          <div className="flex flex-col mb-10 sm:mb-14">
            {specs.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row sm:items-baseline py-3 sm:py-3 border-b border-white/[0.05] gap-1 sm:gap-0"
              >
                <span style={{ ...mono, fontSize: '8px', color: '#3a3a3a', letterSpacing: '0.18em', minWidth: '0', flexShrink: 0 }}
                  className="w-full sm:w-[155px]">
                  [{label}]
                </span>
                <span style={{ ...mono, fontSize: '10px', color: '#999', letterSpacing: '0.12em' }}>
                  {value}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Statement */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            style={{ ...mono, fontSize: '13px', color: '#ffffff', letterSpacing: '0.08em', lineHeight: '2' }}
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
        transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 sm:py-8 border-t border-white/[0.04]"
      >
        <p style={{ ...mono, fontSize: '8px', color: '#2a2a2a', letterSpacing: '0.15em' }}>
          [SESSION: ACTIVE]
        </p>

        <button
          onClick={onLogout}
          aria-label="Return to Vault"
          style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}
          className="
            text-white/20 uppercase
            border border-white/[0.08]
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
