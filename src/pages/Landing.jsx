import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const mono = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }

const LS_KEY = 'TrueVisionMember'

function loadMember() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function getFirstName(name) {
  if (!name) return 'MEMBER'
  return name.trim().split(/\s+/)[0].toUpperCase()
}

export default function Landing() {
  const [member, setMember] = useState(null)
  const [memberCount, setMemberCount] = useState(null)
  const [hoveredDoor, setHoveredDoor] = useState(null)
  const [showAllDoors, setShowAllDoors] = useState(false)

  useEffect(() => {
    setMember(loadMember())
    fetch('/api/count').then(r => r.json()).then(d => setMemberCount(d.count)).catch(() => {})
  }, [])

  const isReturning = member && !showAllDoors

  return (
    <main className="relative min-h-[100dvh] w-full bg-[#000000] text-white flex flex-col" aria-label="True Vision Project">

      {/* Grain */}
      <div className="grain" aria-hidden="true" />

      {/* Atmospheric gradients */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -8%, rgba(255,255,255,0.055) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 28%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.97) 100%)' }} />

      <div className="relative z-10 flex-1 flex flex-col items-center px-6 pt-16 pb-12 sm:pt-20">

        {/* ── Logo ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="mb-10 sm:mb-12"
        >
          <img
            src="/landing-logo.svg"
            alt="True Vision Project"
            width="600"
            height="600"
            className="w-[72vw] max-w-[340px] sm:max-w-[440px] h-auto object-contain select-none"
            draggable="false"
          />
        </motion.div>

        {/* ── Manifesto ── */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.2, delay: 0.9, ease: 'easeOut' }}
          className="text-center mb-14 sm:mb-16 px-2"
          style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(18px, 3.8vw, 26px)', color: '#ffffff', lineHeight: 1.45, maxWidth: '520px' }}
        >
          We are not building a brand.<br />We are documenting a mission.
        </motion.p>

        {/* ── Cap image strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mb-14 sm:mb-16"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {['/cap-black.jpg', '/cap-white.jpg'].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ aspectRatio: '3/4', filter: 'saturate(0.12) brightness(0.88)' }}
              >
                {/* Corner marks */}
                <span aria-hidden="true" className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/25 z-10" />
                <span aria-hidden="true" className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/25 z-10" />
                <img
                  src={src}
                  alt={i === 0 ? 'Foundation Cap — Black' : 'Foundation Cap — White'}
                  width="600"
                  height="800"
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />
                <div className="absolute bottom-3 left-4 z-10">
                  <p style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.28em' }}>
                    {i === 0 ? 'BLACK' : 'WHITE'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Caption below images */}
          <div className="flex items-center justify-between mt-4 px-1">
            <p style={{ ...mono, fontSize: '9px', color: '#555', letterSpacing: '0.28em' }} className="uppercase">
              The Foundation Cap — Drop 001
            </p>
            <p style={{ ...mono, fontSize: '9px', color: '#444', letterSpacing: '0.22em' }}>
              €32
            </p>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center w-16 h-px bg-white/15 mb-12 sm:mb-14"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">

          {/* ── Returning member fast-track ── */}
          {isReturning ? (
            <motion.div
              key="returning"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.75, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5 w-full max-w-sm"
            >
              <p style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.35em' }} className="uppercase text-center">
                [ MEMBER_{getFirstName(member.name)} — RECOGNIZED ]
              </p>

              <Link
                to="/archive"
                className="w-full h-[56px] flex items-center justify-center
                  border border-white/20 text-white/55 hover:text-white/90 hover:border-white/40
                  transition-all duration-500 cursor-pointer"
                style={{ ...mono, fontSize: '12px', letterSpacing: '0.42em' }}
              >
                [ ENTER ARCHIVE ]
              </Link>

              <div className="flex w-full gap-3">
                <Link
                  to="/store"
                  className="flex-1 h-12 flex items-center justify-center
                    border border-white/10 text-white/35 hover:text-white/65 hover:border-white/25
                    transition-all duration-400 cursor-pointer"
                  style={{ ...mono, fontSize: '10px', letterSpacing: '0.3em' }}
                >
                  Drop 001
                </Link>
                <button
                  onClick={() => setShowAllDoors(true)}
                  className="flex-1 h-12 flex items-center justify-center
                    text-white/20 hover:text-white/45 transition-colors duration-400 cursor-pointer"
                  style={{ ...mono, fontSize: '9px', letterSpacing: '0.22em' }}
                >
                  Not you?
                </button>
              </div>
            </motion.div>

          ) : (

            /* ── Two doors ── */
            <motion.div
              key="doors"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.85, delay: showAllDoors ? 0.05 : 2.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">

                {/* Door — Archive */}
                <Link
                  to="/archive"
                  onMouseEnter={() => setHoveredDoor('archive')}
                  onMouseLeave={() => setHoveredDoor(null)}
                  aria-label="Enter the Archive — members only"
                  className="block"
                >
                  <motion.div
                    animate={{
                      opacity: hoveredDoor === 'store' ? 0.22 : 1,
                      backgroundColor: hoveredDoor === 'archive' ? 'rgba(255,255,255,0.03)' : 'transparent',
                    }}
                    transition={{ duration: 0.35 }}
                    className="relative flex flex-col justify-between p-8 sm:p-10 border border-white/10 min-h-[240px] sm:min-h-[280px] cursor-pointer"
                  >
                    <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/25" />
                    <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/25" />

                    <div>
                      <p style={{ ...mono, fontSize: '9px', color: '#555', letterSpacing: '0.4em' }} className="mb-5 uppercase">
                        Members only
                      </p>
                      <h2 style={{ ...serif, fontWeight: 500, fontSize: 'clamp(28px, 5vw, 42px)', color: '#ffffff', lineHeight: 1.1 }}>
                        The Archive
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      <p style={{ ...mono, fontSize: '10px', color: '#606060', letterSpacing: '0.14em', lineHeight: 1.9 }}>
                        Join the project.<br />Track every drop.
                      </p>
                      {memberCount !== null && (
                        <p style={{ ...mono, fontSize: '9px', color: '#444', letterSpacing: '0.28em' }} className="uppercase">
                          [ {String(memberCount).padStart(2, '0')} members ]
                        </p>
                      )}
                      <motion.p
                        animate={{ color: hoveredDoor === 'archive' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}
                        transition={{ duration: 0.3 }}
                        style={{ ...mono, fontSize: '11px', letterSpacing: '0.32em' }}
                        className="uppercase"
                      >
                        Enter →
                      </motion.p>
                    </div>
                  </motion.div>
                </Link>

                {/* Door — Drop 001 */}
                <Link
                  to="/store"
                  onMouseEnter={() => setHoveredDoor('store')}
                  onMouseLeave={() => setHoveredDoor(null)}
                  aria-label="View Drop 001 — The Foundation Cap"
                  className="block"
                >
                  <motion.div
                    animate={{
                      opacity: hoveredDoor === 'archive' ? 0.22 : 1,
                      backgroundColor: hoveredDoor === 'store' ? 'rgba(255,255,255,0.03)' : 'transparent',
                    }}
                    transition={{ duration: 0.35 }}
                    className="relative flex flex-col justify-between p-8 sm:p-10
                      border border-white/10 border-t-0 sm:border-t sm:border-l-0
                      min-h-[240px] sm:min-h-[280px] cursor-pointer"
                  >
                    <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/25" />
                    <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/25" />

                    <div>
                      <p style={{ ...mono, fontSize: '9px', color: '#555', letterSpacing: '0.4em' }} className="mb-5 uppercase">
                        Open to all
                      </p>
                      <h2 style={{ ...serif, fontWeight: 500, fontSize: 'clamp(28px, 5vw, 42px)', color: '#ffffff', lineHeight: 1.1 }}>
                        Drop 001
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      <p style={{ ...mono, fontSize: '10px', color: '#606060', letterSpacing: '0.14em', lineHeight: 1.9 }}>
                        The Foundation Cap.<br />Ireland × Italy.
                      </p>
                      <p style={{ ...mono, fontSize: '9px', color: '#444', letterSpacing: '0.28em' }} className="uppercase">
                        [ €32 · No restock ]
                      </p>
                      <motion.p
                        animate={{ color: hoveredDoor === 'store' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}
                        transition={{ duration: 0.3 }}
                        style={{ ...mono, fontSize: '11px', letterSpacing: '0.32em' }}
                        className="uppercase"
                      >
                        View Drop →
                      </motion.p>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 3.2 }}
        className="relative z-10 w-full text-center px-4 pb-8 pt-4 shrink-0"
        style={{ ...mono, fontSize: '9px', color: '#3a3a3a', letterSpacing: '0.16em' }}
      >
        [PROJECT: 001] // TVP // EST. 2026
      </motion.p>
    </main>
  )
}
