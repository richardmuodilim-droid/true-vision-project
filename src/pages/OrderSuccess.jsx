import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const mono = { fontFamily: "'Space Mono', monospace" }

export default function OrderSuccess() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id')
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('tvp_pending_order')
    if (stored) {
      try { setOrder(JSON.parse(stored)) } catch {}
      sessionStorage.removeItem('tvp_pending_order')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center gap-8 max-w-sm w-full"
      >
        <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.5em', color: 'rgba(0,0,0,0.28)' }} className="uppercase">
          [ Order Confirmed ]
        </p>

        <h1 style={{ ...mono, fontSize: '11px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.65)', fontWeight: 300, lineHeight: 'loose' }} className="uppercase">
          Thank you.
        </h1>

        <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.35)', lineHeight: '2' }}>
          {order?.email
            ? <>Confirmation sent to <span style={{ color: 'rgba(0,0,0,0.55)' }}>{order.email}</span>.<br />Your order ships within 3–5 business days.</>
            : 'Your payment was successful. Your order ships within 3–5 business days.'
          }
        </p>

        {order?.items?.length > 0 && (
          <div className="w-full p-5 flex flex-col gap-4 text-left"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
            <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.30)' }} className="uppercase">
              Items ordered
            </p>
            <ul className="flex flex-col gap-3">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between gap-3">
                  <div>
                    <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.58)' }}>
                      {item.name}
                    </p>
                    <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.30)', marginTop: '2px' }}>
                      {item.color} / {item.size} × {item.qty}
                    </p>
                  </div>
                  <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.45)' }} className="shrink-0">
                    €{(item.price * item.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            {sessionId && (
              <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.20)', borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '12px' }}
                className="break-all">
                Ref: {sessionId.slice(0, 24)}...
              </p>
            )}
          </div>
        )}

        <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.20)' }} className="uppercase">
          Built From Nothing.
        </p>

        <Link
          to="/store"
          className="text-[8px] tracking-[0.4em] uppercase pb-px hover:opacity-50 transition-opacity duration-300"
          style={{ ...mono, color: 'rgba(0,0,0,0.32)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
        >
          Back to Store
        </Link>
      </motion.div>
    </div>
  )
}
