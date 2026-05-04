import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const mono = { fontFamily: "'Space Mono', monospace" }

export default function Navbar({ onCartOpen }) {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/store'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Technical status strip */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[22px] flex items-center justify-between px-4 sm:px-8 bg-[#F5F3EE]"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        aria-hidden="true"
      >
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.22em' }}>
          [ TRUE VISION PROJECT ]
        </span>
        <span className="hidden sm:block" style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.22em' }}>
          [ DROP 001 — LIVE ]
        </span>
        <span className="flex items-center gap-2" style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.18em' }}>
          [ STATUS:&nbsp;<span style={{ color: '#888' }}>AVAILABLE</span>&nbsp;]
          <span className="status-dot" />
        </span>
      </div>

      {/* Main nav */}
      <header
        className={`fixed top-[22px] left-0 right-0 z-50 transition-all duration-700 ${
          scrolled || !isHome
            ? 'bg-[#F5F3EE]/95 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled || !isHome ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" aria-label="True Vision Project — Entrance">
            <img
              src="/logo.svg"
              alt="True Vision Project"
              width="400"
              height="400"
              className="h-11 sm:h-12 w-auto max-w-[140px] sm:max-w-[160px] object-contain select-none"
              style={{ filter: 'invert(1)' }}
              draggable="false"
            />
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-7">
            <Link
              to="/our-story"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)' }}
              className="uppercase hover:opacity-70 transition-opacity duration-500 hidden sm:block"
            >
              [ Our Story ]
            </Link>
            <Link
              to="/archive"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)' }}
              className="uppercase hover:opacity-70 transition-opacity duration-500 hidden sm:block"
            >
              [ Archive ]
            </Link>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              aria-label={`Open cart — ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
              className="relative flex items-center justify-center w-8 h-8 transition-opacity duration-500 hover:opacity-60 cursor-pointer"
              style={{ color: 'rgba(0,0,0,0.50)' }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#111111] rounded-full flex items-center justify-center text-[7px] text-[#F5F3EE] font-medium leading-none"
                  aria-hidden="true"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>

            {/* Archive link on mobile */}
            <Link
              to="/archive"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.28)' }}
              className="uppercase hover:opacity-70 transition-opacity duration-500 sm:hidden"
              aria-label="Archive"
            >
              [ Arc ]
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
