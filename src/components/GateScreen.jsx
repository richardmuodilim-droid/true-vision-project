import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { tryCode } from '../lib/gate'
import { mono, serif, ease } from '../lib/design'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SUBLINE = '[ TRUE VISION PROJECT // ACCESS BY INVITATION ONLY ]'

function useTyping(text, { startDelay = 0, charInterval = 45 } = {}) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (reduced) { setDisplayed(text); return }
    let i = 0
    let timeout, interval
    timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, charInterval)
    }, startDelay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [text, startDelay, charInterval])
  return displayed
}

export default function GateScreen({ onUnlock }) {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | granted
  const [btnHovered, setBtnHovered] = useState(false)
  const [scanning, setScanning] = useState(false)
  const scanTimeout = useRef(null)
  const inputRef = useRef(null)

  const subline = useTyping(SUBLINE, { startDelay: 1200, charInterval: 40 })

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleBtnEnter = () => {
    setBtnHovered(true); setScanning(false)
    clearTimeout(scanTimeout.current)
    scanTimeout.current = setTimeout(() => setScanning(true), 10)
  }
  const handleBtnLeave = () => { setBtnHovered(false); setScanning(false) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim()) return
    if (tryCode(code)) {
      setStatus('granted')
      setTimeout(() => onUnlock(), reduced ? 0 : 900)
    } else {
      setStatus('error')
      setCode('')
      setTimeout(() => setStatus('idle'), 1600)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6" style={{ background: '#0a0909' }}>
      {/* soft spotlight behind the logo */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 38%, rgba(255,255,255,0.06), transparent 62%)' }} />
      {/* edge vignette for depth */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 92% 92% at 50% 50%, transparent 52%, rgba(0,0,0,0.55) 100%)' }} />

      {/* Top status strip */}
      <div className="fixed top-0 left-0 right-0 h-[22px] flex items-center justify-between px-5 sm:px-10"
        style={{ background: '#0a0909', borderBottom: '1px solid rgba(255,255,255,0.05)' }} aria-hidden="true">
        <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.38em' }}>
          [ TRUE VISION PROJECT ]
        </span>
        <span style={{ ...mono, fontSize: '7px', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.38em' }}>
          [ LOCKED ]
        </span>
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center">

        {/* Logo */}
        <motion.img
          src="/logo.svg" alt="True Vision Project"
          initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 1.1, ease }}
          className="w-[clamp(120px,34vw,180px)] h-auto object-contain select-none mb-10"
          draggable="false"
        />

        {/* Headline — serif */}
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.9, delay: 0.15, ease }}
          style={{ ...serif, fontSize: 'clamp(30px, 7vw, 46px)', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.01em' }}
          className="mb-5"
        >
          This door is locked.
        </motion.h1>

        {/* Subline — mono typing */}
        <p style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.30)', letterSpacing: '0.28em', minHeight: '14px' }}
          className="uppercase mb-12">
          {subline}
          {subline.length < SUBLINE.length && (
            <span className="inline-block w-[1ch] animate-pulse" style={{ color: 'rgba(255,255,255,0.30)' }}>_</span>
          )}
        </p>

        {status === 'granted' ? (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ ...mono, fontSize: '10px', color: 'rgba(120,220,150,0.85)', letterSpacing: '0.35em' }}
            className="uppercase">
            [ Access Granted — Welcome In ]
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: 0.3, ease }}
            className="w-full flex flex-col items-center"
          >
            <form onSubmit={handleSubmit} className="w-full max-w-[340px] flex flex-col items-center gap-3">
              <input
                ref={inputRef}
                type="text" value={code}
                onChange={(e) => { setCode(e.target.value); if (status === 'error') setStatus('idle') }}
                placeholder="ENTER ACCESS CODE"
                autoCapitalize="characters" autoComplete="off" spellCheck="false"
                style={{ ...mono, fontSize: '11px', letterSpacing: '0.22em', color: '#F5F3EE', caretColor: '#F5F3EE',
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: status === 'error' ? 'rgba(220,80,80,0.5)' : 'rgba(255,255,255,0.12)' }}
                className="w-full h-[52px] border outline-none px-5 text-center uppercase placeholder:text-white/20 focus:border-white/30 transition-colors duration-300"
              />
              <button
                type="submit"
                onMouseEnter={handleBtnEnter} onMouseLeave={handleBtnLeave}
                className={`btn-vault w-full h-[52px] border text-[11px] tracking-[0.45em] uppercase transition-all duration-500 cursor-pointer ${scanning ? 'scanning' : ''}`}
                style={{ ...mono, borderColor: btnHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.16)',
                  color: btnHovered ? '#F5F3EE' : 'rgba(255,255,255,0.45)',
                  background: btnHovered ? 'rgba(255,255,255,0.06)' : 'transparent' }}
              >
                <span className="scanline" aria-hidden="true" />
                {btnHovered ? '[ Enter ]' : 'Enter'}
              </button>
            </form>

            <p style={{ ...mono, fontSize: '9px', color: 'rgba(220,80,80,0.70)', letterSpacing: '0.18em',
              minHeight: '14px', opacity: status === 'error' ? 1 : 0, transition: 'opacity 0.3s' }}
              className="uppercase mt-4">
              Code not recognised.
            </p>

            <button
              type="button" onClick={() => navigate('/archive')}
              style={{ ...mono, fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.28em', borderBottom: '1px solid rgba(255,255,255,0.14)' }}
              className="mt-10 uppercase pb-px hover:opacity-60 transition-opacity duration-300"
            >
              No code? Request access →
            </button>

            <p style={{ ...mono, fontSize: '8px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.30em' }}
              className="uppercase mt-14">
              Built from nothing. Worn by those who understand.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
