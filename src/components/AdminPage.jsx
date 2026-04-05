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
        setError('Access denied. Check your password.')
        setLoading(false)
        return
      }
      onSuccess(data, password)
    } catch {
      setError('Connection error. Try again.')
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
        <div className="flex flex-col gap-2">
          <p style={{ ...mono, fontSize: '10px', color: '#555', letterSpacing: '0.3em' }}>
            TRUE VISION PROJECT
          </p>
          <p style={{ ...mono, fontSize: '18px', color: '#ffffff', letterSpacing: '0.1em' }}>
            Command Center
          </p>
        </div>

        <div className="w-full h-px bg-white/[0.08]" aria-hidden="true" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="admin-pw" className="sr-only">Admin password</label>
          <input
            id="admin-pw"
            type="password"
            placeholder="Enter access code"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            style={{ ...mono }}
            className="w-full h-[52px] bg-transparent border border-[#2a2a2a] rounded-none
              text-white text-[14px] tracking-[0.1em]
              placeholder:text-white/20 px-4 outline-none
              focus:border-white/40 transition-colors duration-300"
          />
          {error && (
            <p style={{ ...mono, fontSize: '12px', color: 'rgba(248,113,113,0.8)', letterSpacing: '0.05em' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ ...mono, fontSize: '12px', letterSpacing: '0.2em' }}
            className="w-full h-[52px] border border-white/[0.15] text-white/50 uppercase
              hover:border-white/40 hover:text-white/90 transition-all duration-300
              disabled:opacity-30 cursor-pointer"
          >
            {loading ? 'Verifying...' : '[ Authenticate ]'}
          </button>
        </form>

        <p style={{ ...mono, fontSize: '9px', color: '#2a2a2a', letterSpacing: '0.15em' }}>
          TVP // RESTRICTED ACCESS
        </p>
      </motion.div>
    </div>
  )
}

function StatCard({ label, value, sub, highlight }) {
  return (
    <div className="border border-white/[0.07] p-5 flex flex-col gap-2">
      <p style={{ ...mono, fontSize: '10px', color: '#555', letterSpacing: '0.25em' }} className="uppercase">
        {label}
      </p>
      <p style={{ ...mono, fontSize: '22px', letterSpacing: '0.05em',
        color: highlight === 'green' ? '#22c55e' : highlight === 'red' ? 'rgba(248,113,113,0.8)' : '#ffffff' }}>
        {value}
      </p>
      {sub && (
        <p style={{ ...mono, fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>
          {sub}
        </p>
      )}
    </div>
  )
}

function MemberRow({ m, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return }
    setDeleting(true)
    try {
      await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: m.email }),
      })
      onDelete(m.email)
    } catch {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-1 px-4 py-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span style={{ ...mono, fontSize: '13px', color: '#ffffff', letterSpacing: '0.05em' }}>
          {m.name || '—'}
        </span>
        <div className="flex items-center gap-3">
          <span style={{ ...mono, fontSize: '11px', color: '#555' }}>#{m.memberNumber}</span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.15em' }}
            className={`px-2 py-1 border transition-all duration-200 cursor-pointer disabled:opacity-30 ${
              confirmDelete
                ? 'border-red-500/60 text-red-400 hover:border-red-400 hover:text-red-300'
                : 'border-white/[0.1] text-white/20 hover:border-white/30 hover:text-white/50'
            }`}
          >
            {deleting ? '...' : confirmDelete ? 'CONFIRM' : '×'}
          </button>
        </div>
      </div>
      <span style={{ ...mono, fontSize: '11px', color: '#888', letterSpacing: '0.03em' }}>
        {m.email}
      </span>
      <div className="flex items-center justify-between gap-2 mt-1">
        <span style={{ ...mono, fontSize: '10px', color: '#444' }}>{m.userId}</span>
        <span style={{ ...mono, fontSize: '10px', color: '#444' }}>{formatDate(m.timestamp)}</span>
      </div>
      {confirmDelete && !deleting && (
        <p
          style={{ ...mono, fontSize: '9px', color: 'rgba(248,113,113,0.5)', letterSpacing: '0.1em' }}
          className="mt-1"
        >
          Tap CONFIRM to delete — this cannot be undone
        </p>
      )}
    </motion.div>
  )
}

function Dashboard({ data, password }) {
  const { financials } = data
  const f = financials ?? FINANCIALS
  const [members, setMembers] = useState(data.members)
  const [refreshing, setRefreshing] = useState(false)
  const count = members.length

  const handleDeleteMember = (email) => {
    setMembers(prev => prev.filter(m => m.email !== email))
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const fresh = await res.json()
      if (res.ok) setMembers(fresh.members)
    } catch {}
    setRefreshing(false)
  }

  const revenue = count * f.retailPrice
  const netProfit = revenue - f.initialInvestment
  const breakEvenPct = Math.min((count / f.breakEvenUnits) * 100, 100)

  const finRows = [
    { label: 'Initial Investment', value: fmt(f.initialInvestment) },
    { label: 'Unit Cost',          value: `${fmt(f.unitCost)} × ${f.totalUnits} units` },
    { label: 'Retail Price',       value: fmt(f.retailPrice) },
    { label: 'Break-Even',         value: `${f.breakEvenUnits} units sold` },
    { label: 'Projected Profit',   value: fmt(f.projectedProfit) },
    { label: 'Current Revenue',    value: fmt(revenue) },
    { label: 'Current Net',        value: fmt(netProfit), highlight: netProfit >= 0 ? 'green' : 'red' },
  ]

  return (
    <div className="min-h-[100dvh] w-full bg-[#000] text-white flex flex-col">
      <div className="grain" />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-10 h-10"
        style={{ background: '#000', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ ...mono, fontSize: '10px', color: '#888', letterSpacing: '0.15em' }}>
          TRUE VISION PROJECT
        </span>
        <span style={{ ...mono, fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>
          COMMAND CENTER
        </span>
      </div>

      <main className="relative z-10 flex-1 px-4 sm:px-10 pt-16 pb-12 max-w-5xl mx-auto w-full">

        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pt-6 pb-8 border-b border-white/[0.06] mb-8"
        >
          <p style={{ ...mono, fontSize: '11px', color: '#555', letterSpacing: '0.3em' }} className="mb-2 uppercase">
            Dashboard
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 6vw, 48px)', color: '#fff', lineHeight: 1.1 }}>
            {String(count).padStart(3, '0')} Members
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8"
        >
          <StatCard label="Total Members" value={count} />
          <StatCard label="Current Revenue" value={fmt(revenue)} />
          <StatCard
            label="Net Position"
            value={fmt(netProfit)}
            highlight={netProfit >= 0 ? 'green' : 'red'}
          />
        </motion.div>

        {/* Break-even bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 p-5 border border-white/[0.07]"
        >
          <div className="flex items-center justify-between mb-3">
            <p style={{ ...mono, fontSize: '11px', color: '#888', letterSpacing: '0.15em' }} className="uppercase">
              Break-Even Progress
            </p>
            <p style={{ ...mono, fontSize: '13px', color: count >= f.breakEvenUnits ? '#22c55e' : '#ffffff' }}>
              {count} / {f.breakEvenUnits} units
            </p>
          </div>
          <div className="w-full h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: breakEvenPct / 100 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left rounded-full"
              style={{ background: count >= f.breakEvenUnits ? '#22c55e' : '#ffffff' }}
            />
          </div>
          <p style={{ ...mono, fontSize: '10px', color: count >= f.breakEvenUnits ? '#22c55e' : '#555', letterSpacing: '0.1em' }}
            className="mt-2">
            {count >= f.breakEvenUnits ? '✓ Break-even achieved' : `${f.breakEvenUnits - count} more units to break even`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Financials */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ ...mono, fontSize: '11px', color: '#555', letterSpacing: '0.25em' }} className="mb-4 uppercase">
              Financial Model
            </p>
            <div className="flex flex-col border border-white/[0.07] divide-y divide-white/[0.05]">
              {finRows.map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 gap-4">
                  <span style={{ ...mono, fontSize: '11px', color: '#666', letterSpacing: '0.05em' }}>
                    {label}
                  </span>
                  <span style={{ ...mono, fontSize: '13px', letterSpacing: '0.05em',
                    color: highlight === 'green' ? '#22c55e' : highlight === 'red' ? 'rgba(248,113,113,0.8)' : '#ffffff' }}>
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
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p style={{ ...mono, fontSize: '11px', color: '#555', letterSpacing: '0.25em' }} className="uppercase">
                Member Registry — {count} total
              </p>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                style={{ ...mono, fontSize: '9px', letterSpacing: '0.15em' }}
                className="px-2 py-1 border border-white/[0.1] text-white/30 hover:border-white/30 hover:text-white/60 transition-all duration-200 cursor-pointer disabled:opacity-30"
              >
                {refreshing ? '...' : '↻ REFRESH'}
              </button>
            </div>
            <div className="flex flex-col border border-white/[0.07] divide-y divide-white/[0.05] max-h-[480px] overflow-y-auto scrollbar-none">
              {members.length === 0 ? (
                <p style={{ ...mono, fontSize: '13px', color: '#444' }} className="px-4 py-6 text-center">
                  No members yet.
                </p>
              ) : (
                <AnimatePresence>
                  {members.map((m) => (
                    <MemberRow key={m.email} m={m} onDelete={handleDeleteMember} />
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 px-4 sm:px-10 py-4 border-t border-white/[0.06]">
        <p style={{ ...mono, fontSize: '10px', color: '#444', letterSpacing: '0.15em' }}>
          TVP // COMMAND CENTER // {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

export default function AdminPage() {
  const [data, setData] = useState(null)
  const [password, setPassword] = useState('')

  return (
    <AnimatePresence mode="wait">
      {data ? (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Dashboard data={data} password={password} />
        </motion.div>
      ) : (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <LoginForm onSuccess={(d, pw) => { setData(d); setPassword(pw) }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
