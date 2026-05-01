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

const CornerTL = () => <span aria-hidden="true" className="absolute top-0 left-0 w-5 h-5 border-t border-l border-white/20 transition-all duration-500" />
const CornerBR = () => <span aria-hidden="true" className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-white/20 transition-all duration-500" />
const CornerTR = () => <span aria-hidden="true" className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/20 transition-all duration-500" />
const CornerBL = () => <span aria-hidden="true" className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/20 transition-all duration-500" />

export default function Landing() {
  const [member, setMember] = useState(null)
  const [memberCount, setMemberCount] = useState(null)
  const [hoveredDoor, setHoveredDoor] = useState(null)
  const [showAllDoors, setShowAllDoors] = useState(false)

  useEffect(() => {
    setMember(loadMember())
    fetch('/api/count')
      .then(r => r.json())
      .then(d => setMemberCount(d.count))
      .catch(() => {})
  }, [])

  const isReturning = member && !showAllDoors

  return (
    <main
      className="relative min-h-[100dvh] w-full bg-[#000000] text-white flex flex-col"
      aria-label="True Vision Project entrance"
    >
      {/* Grain */}
      <div className="grain" aria-hidden="true" />

      {/* Atmospheric gradients */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -8%, rgba(255,255,255,0.055) 0%, transparent 100%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 28%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.97) 100%)' }} />

      {/* ── Centre ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-20">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="mb-9 sm:mb-11"
        >
          <img
            src="/landing-logo.svg"
            alt="True Vision Project"
            width="600"
            height="600"
            className="w-[78vw] max-w-[380px] sm:max-w-[480px] h-auto object-contain select-none"
            draggable="false"
          />
        </motion.div>

        {/* Manifesto line */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.2, delay: 1.0, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16 px-4"
          style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(15px, 3.2vw, 22px)', color: '#ffffff', letterSpacing: '0.01em', maxWidth: '480px' }}
        >
          We are not building a brand.<br className="hidden sm:block" /> We are documenting a mission.
        </motion.p>

        {/* Horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center w-16 h-px bg-white/12 mb-12 sm:mb-16"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">

          {/* ── RETURNING MEMBER fast-track ── */}
          {isReturning ? (
            <motion.div
              key="returning"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.75, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-5 w-full max-w-[360px]"
            >
              {/* Recognition line */}
              <p
                style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.35em' }}
                className="uppercase text-center"
              >
                [ MEMBER_{getFirstName(member.name)} — RECOGNIZED ]
              </p>

              {/* Primary CTA — enter archive */}
              <Link
                to="/archive"
                className="relative w-full h-[52px] flex items-center justify-center overflow-hidden
                  border border-white/[0.14] text-white/45 hover:text-white/85 hover:border-white/30
                  transition-all duration-500 cursor-pointer"
                style={{ ...mono, fontSize: '11px', letterSpacing: '0.45em' }}
              >
                [ ENTER ARCHIVE ]
              </Link>

              {/* Secondary actions */}
              <div className="flex w-full gap-3">
                <Link
                  to="/store"
                  className="flex-1 h-11 flex items-center justify-center
                    border border-white/[0.07] text-white/22 hover:text-white/50 hover:border-white/18
                    transition-all duration-400 cursor-pointer"
                  style={{ ...mono, fontSize: '8px', letterSpacing: '0.28em' }}
                >
                  Drop 001
                </Link>
                <button
                  onClick={() => setShowAllDoors(true)}
                  className="flex-1 h-11 flex items-center justify-center
                    text-white/14 hover:text-white/35 transition-colors duration-400 cursor-pointer"
                  style={{ ...mono, fontSize: '8px', letterSpacing: '0.22em' }}
                >
                  Not you?
                </button>
              </div>
            </motion.div>

          ) : (

            /* ── TWO DOORS ── */
            <motion.div
              key="doors"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.85, delay: showAllDoors ? 0.05 : 2.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2">

                {/* Door 1 — Archive */}
                <Link
                  to="/archive"
                  onMouseEnter={() => setHoveredDoor('archive')}
                  onMouseLeave={() => setHoveredDoor(null)}
                  className="relative block"
                  aria-label="Enter the Archive — members only"
                >
                  <motion.div
                    animate={{
                      opacity: hoveredDoor === 'store' ? 0.25 : 1,
                      backgroundColor: hoveredDoor === 'archive' ? 'rgba(255,255,255,0.025)' : 'transparent',
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col justify-between p-8 sm:p-10 border border-white/[0.08] min-h-[230px] sm:min-h-[270px] cursor-pointer"
                  >
                    <CornerTL /><CornerBR />

                    <div>
                      <p style={{ ...mono, fontSize: '7px', color: '#4a4a4a', letterSpacing: '0.42em' }} className="mb-4 uppercase">
                        Members only
                      </p>
                      <h2 style={{ ...serif, fontWeight: 500, fontSize: 'clamp(24px, 4.5vw, 36px)', color: '#ffffff', lineHeight: 1.15 }}>
                        The Archive
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      <p style={{ ...mono, fontSize: '8px', color: '#585858', letterSpacing: '0.14em', lineHeight: 1.9 }}>
                        Join the project. Track every drop.<br />Be part of the foundation.
                      </p>
                      {memberCount !== null && (
                        <p style={{ ...mono, fontSize: '7px', color: '#3d3d3d', letterSpacing: '0.28em' }} className="uppercase">
                          [ {String(memberCount).padStart(2, '0')} members registered ]
                        </p>
                      )}
                      <motion.p
                        animate={{ color: hoveredDoor === 'archive' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.22)' }}
                        transition={{ duration: 0.35 }}
                        style={{ ...mono, fontSize: '9px', letterSpacing: '0.32em' }}
                        className="uppercase"
                      >
                        Enter →
                      </motion.p>
                    </div>
                  </motion.div>
                </Link>

                {/* Door 2 — Drop 001 */}
                <Link
                  to="/store"
                  onMouseEnter={() => setHoveredDoor('store')}
                  onMouseLeave={() => setHoveredDoor(null)}
                  className="relative block"
                  aria-label="View Drop 001 — The Foundation Cap"
                >
                  <motion.div
                    animate={{
                      opacity: hoveredDoor === 'archive' ? 0.25 : 1,
                      backgroundColor: hoveredDoor === 'store' ? 'rgba(255,255,255,0.025)' : 'transparent',
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative flex flex-col justify-between p-8 sm:p-10
                      border border-white/[0.08] border-t-0 sm:border-t sm:border-l-0
                      min-h-[230px] sm:min-h-[270px] cursor-pointer"
                  >
                    <CornerTR /><CornerBL />

                    <div>
                      <p style={{ ...mono, fontSize: '7px', color: '#4a4a4a', letterSpacing: '0.42em' }} className="mb-4 uppercase">
                        Open to all
                      </p>
                      <h2 style={{ ...serif, fontWeight: 500, fontSize: 'clamp(24px, 4.5vw, 36px)', color: '#ffffff', lineHeight: 1.15 }}>
                        Drop 001
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      <p style={{ ...mono, fontSize: '8px', color: '#585858', letterSpacing: '0.14em', lineHeight: 1.9 }}>
                        The Foundation Cap.<br />Ireland × Italy. 300GSM twill.
                      </p>
                      <p style={{ ...mono, fontSize: '7px', color: '#3d3d3d', letterSpacing: '0.28em' }} className="uppercase">
                        [ $40 · 20 units · No restock ]
                      </p>
                      <motion.p
                        animate={{ color: hoveredDoor === 'store' ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.22)' }}
                        transition={{ duration: 0.35 }}
                        style={{ ...mono, fontSize: '9px', letterSpacing: '0.32em' }}
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
        transition={{ duration: 1.2, delay: 3.0 }}
        className="relative z-10 w-full text-center px-4 pb-7 pt-2 shrink-0"
        style={{ ...mono, fontSize: '8px', color: '#3a3a3a', letterSpacing: '0.14em' }}
      >
        [PROJECT: 001] // TVP // EST. 2026
      </motion.p>
    </main>
  )
}
