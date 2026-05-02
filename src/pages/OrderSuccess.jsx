import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center gap-8 max-w-sm w-full"
      >
        <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase">[ Order Confirmed ]</p>

        <h1 className="text-[11px] tracking-[0.4em] text-white/70 uppercase font-light leading-loose">
          Thank you.
        </h1>

        <p className="text-[8px] tracking-[0.2em] text-white/25 leading-loose">
          {order?.email
            ? <>Confirmation sent to <span className="text-white/40">{order.email}</span>.<br />Your order ships within 3–5 business days.</>
            : 'Your payment was successful. Your order ships within 3–5 business days.'
          }
        </p>

        {order?.items?.length > 0 && (
          <div className="w-full border border-white/[0.07] p-5 flex flex-col gap-4 text-left">
            <p className="text-[7px] tracking-[0.4em] text-white/20 uppercase">Items ordered</p>
            <ul className="flex flex-col gap-3">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between gap-3">
                  <div>
                    <p className="text-[9px] tracking-[0.15em] text-white/55">{item.name}</p>
                    <p className="text-[7px] tracking-[0.2em] text-white/25 mt-0.5">
                      {item.color} / {item.size} × {item.qty}
                    </p>
                  </div>
                  <p className="text-[9px] tracking-[0.1em] text-white/40 shrink-0">
                    €{(item.price * item.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
            {sessionId && (
              <p className="text-[7px] tracking-[0.15em] text-white/15 break-all border-t border-white/[0.05] pt-3">
                Ref: {sessionId.slice(0, 24)}...
              </p>
            )}
          </div>
        )}

        <p className="text-[8px] tracking-[0.3em] text-white/15 uppercase">Built From Nothing.</p>

        <Link
          to="/store"
          className="text-[8px] tracking-[0.4em] text-white/25 uppercase border-b border-white/10 pb-px hover:text-white/50 hover:border-white/25 transition-colors duration-300"
        >
          Back to Store
        </Link>
      </motion.div>
    </div>
  )
}
