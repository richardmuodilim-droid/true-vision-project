import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { mono, ease } from '../lib/design'

const NAV_LINKS = [
  { to: '/',           label: 'Drop 001' },
  { to: '/our-story',  label: 'Our Story' },
  { to: '/archive',    label: 'Archive' },
  { to: '/drop-002',   label: 'Drop 002' },
]

export default function Navbar({ onCartOpen }) {
  const { itemCount } = useCart()
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Status strip */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[22px] flex items-center justify-between px-4 sm:px-8 bg-[#F5F3EE]"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        aria-hidden="true"
      >
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.22em' }}>
          [ TRUE VISION PROJECT ]
        </span>
        <Link
          to="/drop-002"
          className="hover:opacity-60 transition-opacity duration-300 hidden sm:block"
          style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.22em' }}
        >
          [ DROP 002 — AUGUST 2026 ]
        </Link>
        <span className="flex items-center gap-2" style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.18em' }}>
          [ DROP 001:&nbsp;<span style={{ color: '#888' }}>SOLD OUT</span>&nbsp;]
          <span className="status-dot" />
        </span>
      </div>

      {/* Main header */}
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
          <Link to="/" aria-label="True Vision Project — Home">
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

          <div className="flex items-center gap-5 sm:gap-7">

            {/* Desktop nav links */}
            <nav className="hidden sm:flex items-center gap-7" aria-label="Main navigation">
              <Link
                to="/our-story"
                style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)' }}
                className="uppercase hover:opacity-70 transition-opacity duration-500"
              >
                [ Our Story ]
              </Link>
              <Link
                to="/archive"
                style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)' }}
                className="uppercase hover:opacity-70 transition-opacity duration-500"
              >
                [ Archive ]
              </Link>
            </nav>

            {/* Cart */}
            <button
              onClick={onCartOpen}
              aria-label={`Open cart — ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
              className="relative flex items-center justify-center w-8 h-8 transition-opacity duration-500 hover:opacity-60 cursor-pointer"
              style={{ color: 'rgba(0,0,0,0.50)' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-[18px] h-px origin-center"
                style={{ background: 'rgba(0,0,0,0.55)' }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }}
                className="block w-[18px] h-px origin-center"
                style={{ background: 'rgba(0,0,0,0.55)' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-[18px] h-px origin-center"
                style={{ background: 'rgba(0,0,0,0.55)' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-x-0 z-40 sm:hidden bg-[#F5F3EE] flex flex-col"
            style={{ top: '78px', bottom: 0, borderTop: '1px solid rgba(0,0,0,0.06)' }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col flex-1 px-8 pt-8">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.055 }}
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <Link
                    to={to}
                    style={{ ...mono, fontSize: '13px', letterSpacing: '0.36em', color: 'rgba(0,0,0,0.58)' }}
                    className="uppercase block py-[18px] hover:opacity-50 transition-opacity duration-300"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.22 }}
              className="px-8 pb-10 pt-8"
            >
              <Link
                to="/archive"
                style={{ ...mono, fontSize: '10px', letterSpacing: '0.40em', background: '#111111', color: '#F5F3EE' }}
                className="w-full flex items-center justify-center py-5 uppercase"
              >
                [ Join the Archive ]
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
