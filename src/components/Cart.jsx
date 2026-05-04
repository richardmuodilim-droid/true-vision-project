import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getProduct } from '../data/products'

function resolveImg(item) {
  if (item.imgSrc) return item.imgSrc
  const product = getProduct(item.id)
  if (!product) return null
  const idx = product.colors.findIndex((c) => c.name === item.color)
  return product.images[idx >= 0 ? idx : 0] || null
}

const mono = { fontFamily: "'Space Mono', monospace" }

export default function Cart({ open, onClose }) {
  const { items, subtotal, dispatch } = useCart()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const shipping = 6
  const total    = subtotal + shipping
  const itemCount = items.reduce((s, i) => s + i.qty, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/15 backdrop-blur-[3px]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-[#F5F3EE] flex flex-col"
            style={{ borderLeft: '1px solid rgba(0,0,0,0.07)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-7 h-[60px] shrink-0"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div className="flex items-center gap-3">
                <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.42em', color: 'rgba(0,0,0,0.45)' }} className="uppercase">
                  Cart
                </p>
                {itemCount > 0 && (
                  <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.28)' }}>
                    — {itemCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="flex items-center justify-center w-8 h-8 transition-opacity duration-300 hover:opacity-40 cursor-pointer"
                style={{ color: 'rgba(0,0,0,0.35)' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Items ── */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (

                <div className="h-full flex flex-col items-center justify-center gap-7 px-8">
                  <div className="flex flex-col items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                      style={{ color: 'rgba(0,0,0,0.18)' }} aria-hidden="true">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.25)' }} className="uppercase mt-3">
                      Your cart is empty
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-[8px] tracking-[0.35em] uppercase pb-px hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                    style={{ ...mono, color: 'rgba(0,0,0,0.38)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                  >
                    Continue Shopping
                  </button>
                </div>

              ) : (
                <ul className="px-7 pt-2 pb-4">
                  {items.map((item) => (
                    <li key={item.key} className="py-5 flex gap-4"
                      style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>

                      {/* Product Image */}
                      {(() => {
                        const img = resolveImg(item)
                        return (
                          <div className="w-[72px] h-[88px] shrink-0 overflow-hidden bg-[#E8E6E1]"
                            style={{ filter: 'saturate(0.18) brightness(0.96)' }}>
                            {img ? (
                              <img
                                src={img}
                                alt={item.name}
                                width="144"
                                height="176"
                                className="w-full h-full object-cover object-center"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span style={{ ...mono, fontSize: '6px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.20)' }}>TVP</span>
                              </div>
                            )}
                          </div>
                        )
                      })()}

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">

                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.75)' }} className="uppercase truncate">
                              {item.name}
                            </p>
                            <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.22em', color: 'rgba(0,0,0,0.35)' }} className="uppercase mt-[5px]">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(0,0,0,0.60)' }} className="shrink-0">
                            €{(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty control */}
                          <div className="flex items-center"
                            style={{ border: '1px solid rgba(0,0,0,0.10)' }}>
                            <button
                              onClick={() =>
                                item.qty === 1
                                  ? dispatch({ type: 'REMOVE', key: item.key })
                                  : dispatch({ type: 'UPDATE_QTY', key: item.key, qty: item.qty - 1 })
                              }
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center hover:opacity-50 transition-opacity cursor-pointer"
                              style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px' }}
                            >
                              −
                            </button>
                            <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.55)' }}
                              className="w-5 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => dispatch({ type: 'UPDATE_QTY', key: item.key, qty: item.qty + 1 })}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center hover:opacity-50 transition-opacity cursor-pointer"
                              style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px' }}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => dispatch({ type: 'REMOVE', key: item.key })}
                            aria-label={`Remove ${item.name}`}
                            className="text-[7px] tracking-[0.3em] uppercase hover:opacity-40 transition-opacity duration-300 cursor-pointer"
                            style={{ ...mono, color: 'rgba(0,0,0,0.28)' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Footer / Summary ── */}
            {items.length > 0 && (
              <div className="shrink-0 px-7 pb-7 pt-5 flex flex-col gap-5"
                style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>

                {/* Line items */}
                <div className="flex flex-col gap-[10px]">
                  <div className="flex justify-between items-center">
                    <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.32em', color: 'rgba(0,0,0,0.38)' }} className="uppercase">Subtotal</span>
                    <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.16em', color: 'rgba(0,0,0,0.55)' }}>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.32em', color: 'rgba(0,0,0,0.38)' }} className="uppercase">Shipping</span>
                    <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.16em', color: 'rgba(0,0,0,0.55)' }}>€{shipping.toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.38em', color: 'rgba(0,0,0,0.55)' }} className="uppercase">Total</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', letterSpacing: '0.04em', color: '#111111', fontWeight: 300 }}>
                    €{total.toFixed(2)}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full py-[15px] text-center bg-[#111111] text-[#F5F3EE] text-[8px] tracking-[0.48em] uppercase hover:bg-[#2a2a2a] transition-colors duration-300 block"
                  style={mono}
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={onClose}
                  className="text-center text-[7px] tracking-[0.38em] uppercase hover:opacity-40 transition-opacity duration-300 cursor-pointer"
                  style={{ ...mono, color: 'rgba(0,0,0,0.28)' }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
