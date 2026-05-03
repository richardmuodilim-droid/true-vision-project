import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

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
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#F5F3EE] flex flex-col"
            style={{ borderLeft: '1px solid rgba(0,0,0,0.08)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 h-16 shrink-0"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <p className="text-[9px] tracking-[0.45em] uppercase"
                style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.45)' }}>
                Cart {items.length > 0 && `— ${items.reduce((s, i) => s + i.qty, 0)}`}
              </p>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="transition-opacity duration-300 hover:opacity-50 cursor-pointer"
                style={{ color: 'rgba(0,0,0,0.40)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                  <p className="text-[9px] tracking-[0.4em] uppercase"
                    style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.28)' }}>
                    Your cart is empty
                  </p>
                  <button
                    onClick={onClose}
                    className="text-[9px] tracking-[0.35em] uppercase pb-px hover:opacity-60 transition-opacity duration-300 cursor-pointer"
                    style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.38)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col" style={{ '--divider': 'rgba(0,0,0,0.07)' }}>
                  {items.map((item) => (
                    <li key={item.key} className="py-6 flex gap-5"
                      style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                      <div className="w-20 h-24 bg-[#E8E6E1] shrink-0 flex items-center justify-center overflow-hidden">
                        <span className="text-[7px] tracking-[0.3em] uppercase"
                          style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.20)' }}>Img</span>
                      </div>

                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] tracking-[0.3em] uppercase"
                              style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.75)' }}>
                              {item.name}
                            </p>
                            <p className="text-[8px] tracking-[0.2em] uppercase mt-1"
                              style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.32)' }}>
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <p className="text-[11px] tracking-[0.15em] shrink-0"
                            style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.55)' }}>
                            €{(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4"
                            style={{ border: '1px solid rgba(0,0,0,0.10)' }}>
                            <button
                              onClick={() =>
                                item.qty === 1
                                  ? dispatch({ type: 'REMOVE', key: item.key })
                                  : dispatch({ type: 'UPDATE_QTY', key: item.key, qty: item.qty - 1 })
                              }
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer text-xs"
                              style={{ color: 'rgba(0,0,0,0.45)' }}
                            >
                              −
                            </button>
                            <span className="text-[9px] tracking-[0.2em] w-4 text-center"
                              style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.55)' }}>
                              {item.qty}
                            </span>
                            <button
                              onClick={() => dispatch({ type: 'UPDATE_QTY', key: item.key, qty: item.qty + 1 })}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center hover:opacity-60 transition-opacity cursor-pointer text-xs"
                              style={{ color: 'rgba(0,0,0,0.45)' }}
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => dispatch({ type: 'REMOVE', key: item.key })}
                            aria-label={`Remove ${item.name}`}
                            className="text-[8px] tracking-[0.3em] uppercase hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                            style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.28)' }}
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

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="shrink-0 px-8 py-8 flex flex-col gap-5"
                style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.40)' }}>Subtotal</span>
                    <span className="text-[10px] tracking-[0.2em]"
                      style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.60)' }}>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[10px] tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.40)' }}>Shipping</span>
                    <span className="text-[10px] tracking-[0.2em]"
                      style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.60)' }}>€{shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between pt-4"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <span className="text-[11px] tracking-[0.35em] uppercase"
                    style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.55)' }}>Total</span>
                  <span className="text-[11px] tracking-[0.2em]"
                    style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.80)' }}>€{total.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full py-4 text-center bg-[#111111] text-[#F5F3EE] text-[9px] tracking-[0.45em] uppercase font-medium hover:bg-[#2a2a2a] transition-colors duration-300 block"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={onClose}
                  className="text-center text-[8px] tracking-[0.35em] uppercase hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                  style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(0,0,0,0.28)' }}
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
