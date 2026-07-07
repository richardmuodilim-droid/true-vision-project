import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { tryCode } from '../lib/gate'

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const HEADLINE = 'THIS DOOR IS LOCKED.'
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
  const inputRef = useRef(null)

  const subline = useTyping(SUBLINE, { startDelay: 1200, charInterval: 40 })

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-md flex flex-col items-center text-center">
        <img src="/logo.svg" alt="TVP" className="w-10 h-10 mb-10 invert" />

        <h1 className="text-xl sm:text-2xl font-semibold tracking-widest-2 mb-4">
          {HEADLINE}
        </h1>

        <p className="font-mono text-[11px] text-tvp-gray tracking-widest mb-12 min-h-[16px]">
          {subline}
        </p>

        {status === 'granted' ? (
          <p className="font-mono text-xs tracking-widest text-green-500">
            ACCESS GRANTED. WELCOME IN.
          </p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
              <input
                ref={inputRef}
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="ENTER ACCESS CODE"
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck="false"
                className="w-full bg-transparent border border-tvp-border focus:border-white outline-none text-center font-mono text-sm tracking-widest py-3 px-4 placeholder:text-tvp-gray/60 transition-colors"
                style={{ backgroundColor: 'transparent', color: '#ffffff' }}
              />
              <button
                type="submit"
                className="w-full border border-white py-3 font-mono text-xs tracking-widest-2 hover:bg-white hover:text-black transition-colors"
              >
                ENTER
              </button>
            </form>

            <p className={`font-mono text-[11px] tracking-widest mt-4 min-h-[16px] transition-opacity ${status === 'error' ? 'text-red-500 opacity-100' : 'opacity-0'}`}>
              CODE NOT RECOGNISED.
            </p>

            <button
              type="button"
              onClick={() => navigate('/archive')}
              className="mt-10 font-mono text-[11px] tracking-widest text-tvp-gray hover:text-white underline underline-offset-4 transition-colors"
            >
              NO CODE? REQUEST ACCESS →
            </button>

            <p className="font-mono text-[10px] text-tvp-gray/50 tracking-widest mt-12">
              BUILT FROM NOTHING. WORN BY THOSE WHO UNDERSTAND.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
