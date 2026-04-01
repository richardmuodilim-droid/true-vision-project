import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function Cart({ open, onClose }) {
  const { items, subtotal, dispatch } = useCart()

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const shipping = subtotal >= 150 ? 0 : 12
  const total = subtotal + shipping

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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#080808] border-l border-white/[0.06] flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 h-16 border-b border-white/[0.06] shrink-0">
              <p className="text-[9px] tracking-[0.45em] text-white/50 uppercase">
                Cart {items.length > 0 && `— ${items.reduce((s, i) => s + i.qty, 0)}`}
              </p>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="text-white/30 hover:text-white/70 transition-colors duration-300 cursor-pointer"
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
                  <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase">
                    Your cart is empty
                  </p>
                  <button
                    onClick={onClose}
                    className="text-[9px] tracking-[0.35em] text-white/35 uppercase border-b border-white/10 pb-px hover:text-white/60 hover:border-white/30 transition-colors duration-300 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-white/[0.05]">
                  {items.map((item) => (
                    <li key={item.key} className="py-6 flex gap-5">
                      {/* Image placeholder */}
                      <div className="w-20 h-24 bg-[#111] shrink-0 flex items-center justify-center">
                        <span className="text-[7px] tracking-[0.3em] text-white/10 uppercase">Img</span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] tracking-[0.3em] text-white/80 uppercase">
                              {item.name}
                            </p>
                            <p className="text-[8px] tracking-[0.2em] text-white/25 uppercase mt-1">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <p className="text-[10px] tracking-[0.15em] text-white/50 shrink-0">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Qty stepper */}
                          <div className="flex items-center gap-4 border border-white/[0.1]">
                            <button
                              onClick={() =>
                                item.qty === 1
                                  ? dispatch({ type: 'REMOVE', key: item.key })
                                  : dispatch({ type: 'UPDATE_QTY', key: item.key, qty: item.qty - 1 })
                              }
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors cursor-pointer text-xs"
                            >
                              −
                            </button>
                            <span className="text-[9px] tracking-[0.2em] text-white/50 w-4 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                dispatch({ type: 'UPDATE_QTY', key: item.key, qty: item.qty + 1 })
                              }
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors cursor-pointer text-xs"
                            >
                              +
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => dispatch({ type: 'REMOVE', key: item.key })}
                            aria-label={`Remove ${item.name}`}
                            className="text-[8px] tracking-[0.3em] text-white/20 uppercase hover:text-white/45 transition-colors duration-300 cursor-pointer"
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
              <div className="shrink-0 px-8 py-8 border-t border-white/[0.06] flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] text-white/30 uppercase">Subtotal</span>
                    <span className="text-[8px] tracking-[0.2em] text-white/50">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] text-white/30 uppercase">
                      Shipping
                    </span>
                    <span className="text-[8px] tracking-[0.2em] text-white/50">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 150 && (
                    <p className="text-[7px] tracking-[0.25em] text-white/20 uppercase">
                      Free shipping on orders over $150
                    </p>
                  )}
                </div>

                <div className="flex justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-[9px] tracking-[0.35em] text-white/60 uppercase">Total</span>
                  <span className="text-[9px] tracking-[0.2em] text-white/80">${total.toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="
                    w-full py-4 text-center
                    bg-white text-black
                    text-[9px] tracking-[0.45em] uppercase font-medium
                    hover:bg-white/90 transition-colors duration-300
                    block
                  "
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={onClose}
                  className="text-center text-[8px] tracking-[0.35em] text-white/20 uppercase hover:text-white/40 transition-colors duration-300 cursor-pointer"
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
