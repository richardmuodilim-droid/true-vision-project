import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const mono = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }

function formatMemberTag(name) {
  if (!name) return 'MEMBER_TVP'
  return name.trim().toUpperCase().replace(/\s+/g, '_') + '_TVP'
}

function getFirstName(name) {
  if (!name) return 'MEMBER'
  return name.trim().split(/\s+/)[0].toUpperCase()
}

const LS_KEY = 'TrueVisionMember'

export default function ArchiveEntry({ onLogout, userId, memberName }) {
  const [flickering, setFlickering] = useState(false)
  const [stats, setStats] = useState({ referralCount: 0, memberNumber: null })
  const [copied, setCopied] = useState(false)

  const inviteCode = userId || ''
  const inviteLink = `https://truevisionproject.com/?ref=${inviteCode}`

  useEffect(() => {
    let email = ''
    try { email = JSON.parse(localStorage.getItem(LS_KEY) || '{}').email || '' } catch {}
    if (!email) return
    fetch('/api/lookup', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(r => r.json())
      .then(d => { if (d.found) setStats({ referralCount: d.referralCount || 0, memberNumber: d.memberNumber }) })
      .catch(() => {})
  }, [])

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const broughtIn = stats.referralCount
  const onWall = broughtIn >= 5
  const rankLabel = stats.memberNumber
    ? (stats.memberNumber <= 100 ? `FOUNDING #${String(stats.memberNumber).padStart(3, '0')}` : `MEMBER #${String(stats.memberNumber).padStart(3, '0')}`)
    : 'FOUNDING MEMBER'

  const manifest = [
    { key: 'MEMBER',     value: getFirstName(memberName) },
    { key: 'RANK',       value: rankLabel },
    { key: 'STATUS',     value: 'ACTIVE — ONE OF US', live: true },
    { key: 'ACCESS',     value: 'YOU GO FIRST — 48H EARLY' },
    { key: 'STANDS FOR', value: 'REPRESENTATION / UNITY' },
    { key: 'ORIGIN',     value: 'WEXFORD × BERGAMO' },
    { key: 'NEXT',       value: 'EDITION 01 — THE DOCUMENT', next: true },
  ]

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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 35%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0.05) 100%)' }} />
      <div aria-hidden="true" className="grain" />

      {/* ── Sticky status bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 h-[26px] sm:h-8 bg-[#F5F3EE]"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }} aria-hidden="true">
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.2em' }}>[ TRUE VISION PROJECT ]</span>
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.2em' }} className="hidden sm:block">
          [ {formatMemberTag(memberName)} ]
        </span>
        <span className="flex items-center gap-2" style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.18em' }}>
          [ STATUS:&nbsp;<span style={{ color: '#888' }}>IN</span>&nbsp;]
          <span className="status-dot" aria-hidden="true" />
        </span>
      </div>

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 shrink-0 flex items-center justify-between px-6 sm:px-12 pt-9 mt-8"
      >
        <img src="/logo-archive.svg" alt="True Vision Project" width="80" height="80"
          className="w-14 h-14 object-contain select-none" style={{ filter: 'invert(1)' }} draggable="false" />
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.2em' }}>MEMBER // ACTIVE</p>
      </motion.header>

      {/* ── Welcome ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.55, ease: 'easeOut' }}
        className="relative z-10 text-center px-6 pt-12 sm:pt-16 pb-2"
      >
        <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.4em' }} className="uppercase mb-5">
          You've been let in.
        </p>
        <h1 style={{ ...serif, fontSize: 'clamp(30px, 6vw, 50px)', color: '#111111', fontWeight: 400, lineHeight: 1.1 }}>
          Welcome, {getFirstName(memberName)}.<br />You're one of us now.
        </h1>
      </motion.div>

      {/* ── Member Dossier (card) ── */}
      <section className="relative z-10 shrink-0 px-4 sm:px-12 pt-10 sm:pt-14 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xl mx-auto p-7 sm:p-9"
          style={{ border: '1px solid rgba(0,0,0,0.14)', background: 'rgba(255,255,255,0.35)' }}
        >
          {/* corner marks */}
          {['top-0 left-0 border-t border-l','top-0 right-0 border-t border-r',
            'bottom-0 left-0 border-b border-l','bottom-0 right-0 border-b border-r'].map((c,i)=>(
            <span key={i} aria-hidden="true" className={`absolute w-4 h-4 ${c}`} style={{ borderColor: 'rgba(0,0,0,0.30)' }} />
          ))}

          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="mb-6 uppercase">
            Member Dossier
          </p>

          <div className="flex flex-col">
            {manifest.map(({ key, value, live, next }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.85 + i * 0.06, ease: 'easeOut' }}
                className="flex items-center py-[13px] gap-4"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.07)' }}
              >
                <span className="shrink-0" style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.22em', minWidth: 'min(130px, 34vw)' }}>
                  [ {key} ]
                </span>
                <span className="leading-snug"
                  style={{ ...mono, fontSize: '11px', letterSpacing: '0.05em',
                    color: live ? '#111111' : 'rgba(0,0,0,0.72)',
                    borderBottom: next ? '1px solid rgba(0,0,0,0.14)' : 'none', paddingBottom: next ? '2px' : 0 }}>
                  {live && <span className="status-dot inline-block mr-2" aria-hidden="true" />}{value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1, delay: 1.3 }}
          style={{ ...serif, fontStyle: 'italic', fontSize: 'clamp(17px, 3vw, 21px)', color: '#111111', lineHeight: 1.6 }}
          className="text-center max-w-xl mx-auto mt-9"
        >
          You're not a customer. You're part of this. You go first — always.
        </motion.p>
      </section>

      {/* ── Grow the Movement (invite / status) ── */}
      <motion.section
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 shrink-0 px-4 sm:px-12 py-12 sm:py-16 mt-4"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Grow the movement"
      >
        <div className="max-w-xl mx-auto">
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="mb-5 uppercase">
            You hold the door
          </p>
          <h3 style={{ ...serif, fontSize: 'clamp(24px, 4.5vw, 36px)', color: '#111111', fontWeight: 500, lineHeight: 1.15 }} className="mb-3">
            You can let people in.
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8 }} className="mb-7">
            This is invitation-only. Your link is a key — share it with people who come from where you come from.
            Everyone who joins through you moves you up.
          </p>

          {/* Invite link */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-6">
            <div className="flex-1 flex items-center px-4 h-[48px] overflow-hidden" style={{ border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(0,0,0,0.02)' }}>
              <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                truevisionproject.com/?ref={inviteCode}
              </span>
            </div>
            <button onClick={handleCopy} aria-label="Copy invite link"
              style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', background: '#111111', color: '#F5F3EE' }}
              className="h-[48px] px-6 uppercase shrink-0 hover:bg-[#2a2a2a] active:scale-[0.98] transition-all duration-300 cursor-pointer">
              {copied ? '✓ Copied' : 'Copy Key'}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="flex flex-col gap-1 px-4 py-4" style={{ borderRight: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ ...serif, fontSize: '28px', color: '#111111', fontWeight: 500, lineHeight: 1 }}>{broughtIn}</p>
              <p style={{ ...mono, fontSize: '6.5px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }} className="uppercase">Let In</p>
            </div>
            <div className="flex flex-col gap-1 px-4 py-4" style={{ borderRight: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ ...mono, fontSize: '12px', color: '#111111', letterSpacing: '0.04em', lineHeight: 1.4 }}>{rankLabel}</p>
              <p style={{ ...mono, fontSize: '6.5px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }} className="uppercase">Your Rank</p>
            </div>
            <div className="flex flex-col gap-1 px-4 py-4">
              <p style={{ ...mono, fontSize: '12px', color: onWall ? '#111111' : 'rgba(0,0,0,0.45)', letterSpacing: '0.04em', lineHeight: 1.4 }}>
                {onWall ? '✓ ON THE WALL' : `${broughtIn} / 5`}
              </p>
              <p style={{ ...mono, fontSize: '6.5px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }} className="uppercase">Founders Wall</p>
            </div>
          </div>

          <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.16em', lineHeight: 1.8 }} className="mt-4 uppercase">
            {onWall ? 'You let five in. Your name belongs on the Founders Wall.' : 'Let five in, and your name goes on the Founders Wall.'}
          </p>
          <Link to="/founders"
            style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.28em', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
            className="inline-block mt-3 uppercase pb-px hover:opacity-60 transition-opacity duration-300">
            See the Founders Wall →
          </Link>
        </div>
      </motion.section>

      {/* ── Manifesto ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 shrink-0 flex flex-col items-center text-center px-6 sm:px-16 py-14 sm:py-20"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        aria-label="Manifesto"
      >
        <div className="w-px h-10 mb-12" style={{ background: 'rgba(0,0,0,0.12)' }} aria-hidden="true" />
        <p style={{ ...serif, fontWeight: 500, fontSize: 'clamp(22px, 5.5vw, 42px)', color: '#111111', lineHeight: 1.25, letterSpacing: '-0.02em', maxWidth: '780px' }}>
          This is not a brand.<br />It's a representation of us.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: '11px', color: '#111111', letterSpacing: '0.2em', marginTop: '28px' }} className="uppercase opacity-45">
          Two towns. One fire. Built from nothing.
        </p>
        <div className="w-px h-10 mt-12" style={{ background: 'rgba(0,0,0,0.12)' }} aria-hidden="true" />
      </motion.section>

      {/* ── Feed ── */}
      <div className="relative z-10 shrink-0 w-full overflow-hidden py-2" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }} aria-hidden="true">
        <div className="marquee-track" style={{ opacity: 0.35 }}>
          {[0, 1].map(i => (
            <span key={i} style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.55)', letterSpacing: '0.2em', whiteSpace: 'nowrap', paddingRight: '4rem' }}>
              [ ACCESS_BY_INVITATION ] &nbsp;&nbsp;...&nbsp;&nbsp; [ EDITION_01_INCOMING ] &nbsp;&nbsp;...&nbsp;&nbsp; [ WEXFORD × BERGAMO ] &nbsp;&nbsp;...&nbsp;&nbsp; [ NUMBERED_PIECES ] &nbsp;&nbsp;...&nbsp;&nbsp; [ MEMBERS_GO_FIRST ] &nbsp;&nbsp;...&nbsp;&nbsp; [ BUILT_FROM_NOTHING ] &nbsp;&nbsp;...&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-10 shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-12 py-4 sm:py-6"
        style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="flex items-center gap-4 justify-center sm:justify-start">
          <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.2em' }}>[ SESSION: ACTIVE ]</p>
          <a href="https://www.instagram.com/truevisionproject/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="inline-flex items-center justify-center w-11 h-11 transition-colors duration-300" style={{ color: 'rgba(0,0,0,0.22)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(0,0,0,0.55)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.22)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button onClick={handleDisconnect} aria-label="Switch member"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.22)' }}
            className="uppercase transition-colors duration-300 cursor-pointer min-h-[44px] flex items-center hover:text-red-500/60">
            [ switch member ]
          </button>
          <Link to="/our-story"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', borderColor: 'rgba(0,0,0,0.12)' }}
            className="flex-1 sm:flex-none uppercase border px-4 sm:px-6 min-h-[44px] flex items-center justify-center transition-all duration-300"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.28)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'rgba(0,0,0,0.45)' }}>
            [ OUR STORY ]
          </Link>
          <button onClick={onLogout} aria-label="Exit"
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', borderColor: 'rgba(0,0,0,0.12)' }}
            className="flex-1 sm:flex-none uppercase border px-4 sm:px-6 min-h-[44px] transition-all duration-300 cursor-pointer"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.28)'; e.currentTarget.style.color = 'rgba(0,0,0,0.75)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; e.currentTarget.style.color = 'rgba(0,0,0,0.45)' }}>
            [ EXIT ]
          </button>
        </div>
      </footer>
    </motion.div>
  )
}
