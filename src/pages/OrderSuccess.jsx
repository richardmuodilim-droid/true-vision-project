import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

export default function OrderSuccess() {
  const [params]  = useSearchParams()
  const sessionId = params.get('session_id')

  const [status, setStatus] = useState('loading') // loading | confirmed | error
  const [order,  setOrder]  = useState(null)

  useEffect(() => {
    if (!sessionId) { setStatus('error'); return }

    const pending = (() => {
      try {
        const raw = sessionStorage.getItem('tvp_pending_order')
        if (raw) { sessionStorage.removeItem('tvp_pending_order'); return JSON.parse(raw) }
      } catch {}
      return null
    })()

    fetch('/api/order-confirm', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ session_id: sessionId }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setOrder({ ...data, pendingItems: pending?.items })
        setStatus('confirmed')
      })
      .catch(() => {
        if (pending) {
          setOrder({ pendingItems: pending.items, email: pending.email, ref: sessionId.slice(-8).toUpperCase() })
        }
        setStatus('confirmed')
      })
  }, [sessionId])

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      <div className="grain" aria-hidden="true" />

      {/* Status strip */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 h-[22px] bg-[#F5F3EE]"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.22em' }}>[ TRUE VISION PROJECT ]</span>
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.22em' }} className="hidden sm:block">[ ORDER CONFIRMED ]</span>
        <span style={{ ...mono, fontSize: '7px', color: '#aaaaaa', letterSpacing: '0.18em' }}>
          [ STATUS:&nbsp;<span style={{ color: '#16a34a' }}>PAID</span>&nbsp;]
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-16">
        <AnimatePresence mode="wait">

          {/* Loading */}
          {status === 'loading' && (
            <motion.div key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4">
              <div className="w-5 h-5 border border-black/20 border-t-black/50 rounded-full animate-spin" />
              <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.28)' }} className="uppercase">
                Confirming order...
              </p>
            </motion.div>
          )}

          {/* Confirmed */}
          {status === 'confirmed' && order && (
            <motion.div key="confirmed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-lg flex flex-col gap-0"
            >
              {/* Heading */}
              <div className="text-center mb-10">
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  style={{ ...mono, fontSize: '8px', letterSpacing: '0.5em', color: 'rgba(0,0,0,0.28)' }}
                  className="uppercase mb-4">
                  [ Order Confirmed ]
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
                  style={{ ...serif, fontSize: 'clamp(28px, 6vw, 42px)', color: '#111111', fontWeight: 500, lineHeight: 1.15 }}>
                  Thank you.
                </motion.h1>
                {order.ref && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.32)' }}
                    className="uppercase mt-3">
                    Ref: TVP-{order.ref}
                  </motion.p>
                )}
              </div>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.55, duration: 0.6, ease: [0.16,1,0.3,1] }}
                className="origin-center h-px mb-8"
                style={{ background: 'rgba(0,0,0,0.08)' }} aria-hidden="true" />

              {/* Email confirmation */}
              {order.email && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                  className="flex items-start gap-3 px-5 py-4 mb-5"
                  style={{ border: '1px solid rgba(0,0,0,0.07)', background: 'rgba(22,163,74,0.04)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    style={{ color: '#16a34a', marginTop: '1px', flexShrink: 0 }} aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.55)', lineHeight: 1.7 }}>
                    Confirmation sent to <span style={{ color: '#111111' }}>{order.email}</span>
                  </p>
                </motion.div>
              )}

              {/* Items */}
              {(order.items?.length > 0 || order.pendingItems?.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
                  className="mb-5" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                  <div className="px-5 pt-4 pb-1">
                    <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.42em', color: 'rgba(0,0,0,0.30)' }} className="uppercase mb-3">
                      Items Ordered
                    </p>
                  </div>
                  <ul className="flex flex-col">
                    {(order.items?.length > 0 ? order.items : order.pendingItems).map((item, i) => (
                      <li key={i} className="flex justify-between items-start gap-3 px-5 py-3"
                        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        <div>
                          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.65)' }}>
                            {item.name}{item.variant ? ` — ${item.variant}` : item.color ? ` — ${item.color}` : ''}
                          </p>
                          {item.size && (
                            <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.32)' }} className="mt-1 uppercase">
                              {item.size} / Qty {item.qty}
                            </p>
                          )}
                        </div>
                        <p style={{ ...inter, fontSize: '13px', fontWeight: 300, color: 'rgba(0,0,0,0.55)', flexShrink: 0 }}>
                          €{(item.price * item.qty).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                  {order.total && (
                    <div className="flex justify-between items-center px-5 py-4"
                      style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                      <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.32em', color: 'rgba(0,0,0,0.45)' }} className="uppercase">
                        Total Paid
                      </span>
                      <span style={{ ...inter, fontSize: '16px', fontWeight: 300, color: '#111111' }}>
                        €{order.total}
                      </span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Shipping address */}
              {order.shipping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                  className="mb-5 px-5 py-4" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                  <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.42em', color: 'rgba(0,0,0,0.30)' }} className="uppercase mb-3">
                    Ships To
                  </p>
                  <p style={{ ...inter, fontSize: '13px', color: 'rgba(0,0,0,0.55)', lineHeight: 1.8 }}>
                    {order.shipping.name}<br />
                    {order.shipping.address.line1}
                    {order.shipping.address.line2 && <><br />{order.shipping.address.line2}</>}<br />
                    {order.shipping.address.city}{order.shipping.address.state ? `, ${order.shipping.address.state}` : ''} {order.shipping.address.postal_code}<br />
                    {order.shipping.address.country}
                  </p>
                </motion.div>
              )}

              {/* What happens next */}
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}
                className="mb-8" style={{ border: '1px solid rgba(0,0,0,0.07)' }}>
                <div className="px-5 pt-4 pb-1">
                  <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.42em', color: 'rgba(0,0,0,0.30)' }} className="uppercase mb-1">
                    What Happens Next
                  </p>
                </div>
                {[
                  ['01', 'Your order is being prepared and packaged.'],
                  ['02', 'You\'ll receive a shipping notification with your tracking number.'],
                  ['03', 'Estimated delivery: 3–7 business days depending on your location.'],
                ].map(([n, t]) => (
                  <div key={n} className="flex items-start gap-4 px-5 py-3"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.22)', flexShrink: 0, marginTop: '1px' }}>
                      {n}
                    </span>
                    <p style={{ ...inter, fontSize: '12px', color: 'rgba(0,0,0,0.50)', lineHeight: 1.7 }}>
                      {t}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Footer actions */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
                className="flex flex-col items-center gap-5 text-center">
                <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.28em', color: 'rgba(0,0,0,0.28)' }} className="uppercase">
                  Questions? &nbsp;<a href="mailto:archive@truevisionproject.com"
                    style={{ color: 'rgba(0,0,0,0.45)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    archive@truevisionproject.com
                  </a>
                </p>
                <Link to="/"
                  style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.38)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                  className="uppercase pb-px hover:opacity-50 transition-opacity duration-300">
                  Back to Store
                </Link>
                <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.18)' }} className="uppercase">
                  Built From Nothing.
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Error */}
          {status === 'error' && (
            <motion.div key="error"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 text-center max-w-xs">
              <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.35)' }} className="uppercase">
                Something went wrong
              </p>
              <p style={{ ...inter, fontSize: '13px', color: 'rgba(0,0,0,0.45)', lineHeight: 1.7 }}>
                If your payment was charged, please contact us at{' '}
                <a href="mailto:archive@truevisionproject.com"
                  style={{ color: 'rgba(0,0,0,0.60)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  archive@truevisionproject.com
                </a>
              </p>
              <Link to="/"
                style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                className="uppercase pb-px hover:opacity-50 transition-opacity duration-300">
                Back to Store
              </Link>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
