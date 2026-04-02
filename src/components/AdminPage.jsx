import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mono = { fontFamily: "'Space Mono', monospace" }

const FINANCIALS = {
  initialInvestment: 500,
  unitCost: 25,
  totalUnits: 20,
  retailPrice: 55,
  breakEvenUnits: 10,
  projectedProfit: 600,
}

function fmt(n) {
  return `€${Number(n).toFixed(2)}`
}

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function LoginForm({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError('[ ACCESS DENIED ]')
        setLoading(false)
        return
      }
      onSuccess(data)
    } catch {
      setError('[ CONNECTION ERROR ]')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#000] flex flex-col items-center justify-center px-6">
      <div className="grain" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm flex flex-col gap-8"
      >
        <div className="flex flex-col gap-3">
          <p style={{ ...mono, fontSize: '7px', color: '#444', letterSpacing: '0.45em' }}>
            TRUE VISION PROJECT
          </p>
          <p style={{ ...mono, fontSize: '11px', color: '#888', letterSpacing: '0.2em' }}>
            [ COMMAND CENTER ]
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.06]" aria-hidden="true" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="admin-pw" className="sr-only">Admin password</label>
          <input
            id="admin-pw"
            type="password"
            placeholder="ACCESS CODE"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            style={{ ...mono }}
            className="w-full h-[48px] bg-transparent border border-[#2a2a2a] rounded-none
              text-white text-[11px] tracking-[0.2em] uppercase placeholder:text-white/15
              px-4 outline-none focus:border-white/30 transition-colors duration-300"
          />
          {error && (
            <p style={{ ...mono, fontSize: '9px', color: 'rgba(248,113,113,0.7)', letterSpacing: '0.2em' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em' }}
            className="w-full h-[48px] border border-white/[0.1] text-white/30 uppercase
              hover:border-white/25 hover:text-white/60 transition-all duration-300
              disabled:opacity-30 cursor-pointer"
          >
            {loading ? '[ VERIFYING... ]' : '[ AUTHENTICATE ]'}
          </button>
        </form>

        <p style={{ ...mono, fontSize: '7px', color: '#2a2a2a', letterSpacing: '0.2em' }}>
          TVP // RESTRICTED ACCESS
        </p>
      </motion.div>
    </div>
  )
}

function Dashboard({ data }) {
  const { count, members, financials } = data
  const f = financials ?? FINANCIALS
  const revenue = count * f.retailPrice
  const cogs = count * f.unitCost
  const netProfit = revenue - f.initialInvestment
  const breakEvenPct = Math.min((count / f.breakEvenUnits) * 100, 100)

  const finRows = [
    { label: 'INITIAL INVESTMENT', value: fmt(f.initialInvestment) },
    { label: 'UNIT COST',          value: `${fmt(f.unitCost)} × ${f.totalUnits} UNITS` },
    { label: 'RETAIL PRICE',       value: fmt(f.retailPrice) },
    { label: 'BREAK-EVEN',         value: `${f.breakEvenUnits} UNITS SOLD` },
    { label: 'PROJECTED PROFIT',   value: fmt(f.projectedProfit) },
    { label: 'CURRENT REVENUE',    value: fmt(revenue) },
    { label: 'CURRENT NET',        value: fmt(netProfit), highlight: netProfit >= 0 },
  ]

  return (
    <div className="min-h-[100dvh] w-full bg-[#000] text-white flex flex-col">
      <div className="grain" />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10"
        style={{ height: '32px', background: '#000', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ ...mono, fontSize: '7px', color: '#555', letterSpacing: '0.2em' }}>[ TRUE VISION PROJECT ]</span>
        <span style={{ ...mono, fontSize: '7px', color: '#555', letterSpacing: '0.2em' }}>[ COMMAND CENTER // RESTRICTED ]</span>
      </div>

      <main className="relative z-10 flex-1 px-6 sm:px-10 pt-16 pb-12 max-w-5xl mx-auto w-full">

        {/* Stat hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-12 mb-12 pt-6"
        >
          <div>
            <p style={{ ...mono, fontSize: '7px', color: '#444', letterSpacing: '0.45em' }} className="mb-3 uppercase">
              Project Members
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 10vw, 88px)', color: '#fff', lineHeight: 1 }}>
              {String(count).padStart(3, '0')}
            </p>
          </div>
          <div className="flex flex-col gap-1 pb-2">
            <p style={{ ...mono, fontSize: '7px', color: '#444', letterSpacing: '0.2em' }}>
              BREAK-EVEN PROGRESS
            </p>
            <div className="w-48 h-px bg-white/[0.07] relative">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: breakEvenPct / 100 }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 origin-left"
                style={{ background: count >= f.breakEvenUnits ? '#22c55e' : '#fff', opacity: 0.6 }}
              />
            </div>
            <p style={{ ...mono, fontSize: '7px', color: count >= f.breakEvenUnits ? '#22c55e' : '#555', letterSpacing: '0.2em' }}>
              {count >= f.breakEvenUnits ? '[ BREAK-EVEN ACHIEVED ]' : `[ ${count} / ${f.breakEvenUnits} UNITS ]`}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Financials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ ...mono, fontSize: '7px', color: '#444', letterSpacing: '0.45em' }} className="mb-5 uppercase">
              Financial Model
            </p>
            <div className="flex flex-col border-t border-white/[0.06]">
              {finRows.map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.05] gap-4">
                  <span style={{ ...mono, fontSize: '8px', color: '#555', letterSpacing: '0.15em' }}>
                    [ {label} ]
                  </span>
                  <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.08em',
                    color: highlight ? '#22c55e' : highlight === false ? 'rgba(248,113,113,0.7)' : '#c8c8c8' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Member list */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <p style={{ ...mono, fontSize: '7px', color: '#444', letterSpacing: '0.45em' }} className="mb-5 uppercase">
              Member Registry
            </p>
            <div className="flex flex-col border-t border-white/[0.06] max-h-[420px] overflow-y-auto scrollbar-none">
              {members.length === 0 ? (
                <p style={{ ...mono, fontSize: '9px', color: '#333', letterSpacing: '0.2em' }} className="py-4">
                  [ NO MEMBERS YET ]
                </p>
              ) : (
                members.map((m, i) => (
                  <div key={m.userId ?? i}
                    className="flex flex-col gap-1 py-3 border-b border-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <span style={{ ...mono, fontSize: '9px', color: '#d0d0d0', letterSpacing: '0.1em' }}>
                        {m.userId}
                      </span>
                      <span style={{ ...mono, fontSize: '7px', color: '#444', letterSpacing: '0.1em' }}>
                        #{m.memberNumber}
                      </span>
                    </div>
                    <span style={{ ...mono, fontSize: '8px', color: '#555', letterSpacing: '0.08em' }}>
                      {m.email}
                    </span>
                    <span style={{ ...mono, fontSize: '7px', color: '#333', letterSpacing: '0.08em' }}>
                      {formatDate(m.timestamp)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 px-6 sm:px-10 py-5 border-t border-white/[0.05]">
        <p style={{ ...mono, fontSize: '7px', color: '#333', letterSpacing: '0.2em' }}>
          TVP // COMMAND CENTER // {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default function AdminPage() {
  const [data, setData] = useState(null)

  return (
    <AnimatePresence mode="wait">
      {data ? (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Dashboard data={data} />
        </motion.div>
      ) : (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <LoginForm onSuccess={setData} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
