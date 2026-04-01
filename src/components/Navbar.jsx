import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function Navbar({ onCartOpen }) {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/category/t-shirts', label: 'T-Shirts' },
    { to: '/category/hats', label: 'Hats' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-black/90 backdrop-blur-sm border-b border-white/[0.04]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="True Vision Project — Home">
            <img
              src="/logo.svg"
              alt="TVP"
              width="36"
              height="36"
              style={{ filter: 'invert(1)' }}
              className="w-8 h-8 object-contain select-none"
              draggable="false"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-10">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-[9px] tracking-[0.4em] uppercase transition-colors duration-500 ${
                    isActive ? 'text-white/90' : 'text-white/35 hover:text-white/70'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            {/* Cart */}
            <button
              onClick={onCartOpen}
              aria-label={`Open cart — ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
              className="relative flex items-center justify-center w-8 h-8 text-white/50 hover:text-white/90 transition-colors duration-500 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
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
                  className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center text-[7px] text-black font-medium leading-none"
                  aria-hidden="true"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="sm:hidden flex flex-col gap-[5px] items-end justify-center w-8 h-8 cursor-pointer"
            >
              <span
                className={`block h-px bg-white/60 transition-all duration-500 origin-right ${
                  menuOpen ? 'w-5 rotate-[-45deg] translate-y-[8px]' : 'w-5'
                }`}
              />
              <span
                className={`block h-px bg-white/60 transition-all duration-300 ${
                  menuOpen ? 'opacity-0 w-3' : 'opacity-100 w-3'
                }`}
              />
              <span
                className={`block h-px bg-white/60 transition-all duration-500 origin-right ${
                  menuOpen ? 'w-5 rotate-[45deg] -translate-y-[8px]' : 'w-5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-12 sm:hidden"
          >
            {navLinks.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={to}
                  className="text-[11px] tracking-[0.5em] text-white/60 hover:text-white uppercase transition-colors duration-300"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
