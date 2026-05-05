import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const mono = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }

const FINANCIALS = {
  initialInvestment: 500,
  unitCost: 25,
  totalUnits: 20,
  retailPrice: 55,
  breakEvenUnits: 10,
  projectedProfit: 600,
}

function fmt(n) { return `€${Number(n).toFixed(2)}` }

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function timeAgo(iso) {
  if (!iso) return null
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginForm({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res  = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const data = await res.json()
      if (!res.ok) { setError('Access denied. Check your password.'); setLoading(false); return }
      onSuccess(data, password)
    } catch {
      setError('Connection error. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#F5F3EE] flex flex-col items-center justify-center px-6">
      <div className="grain" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.4em' }}>
            TRUE VISION PROJECT
          </p>
          <p style={{ ...serif, fontSize: '28px', color: '#111111', lineHeight: 1.1 }}>
            Command Center
          </p>
        </div>

        <div className="w-full h-px" style={{ background: 'rgba(0,0,0,0.08)' }} aria-hidden="true" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="admin-pw" className="sr-only">Admin password</label>
          <input
            id="admin-pw"
            type="password"
            placeholder="Enter access code"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError('') }}
            style={{ ...mono, color: '#111111', caretColor: '#111111' }}
            className="w-full h-[52px] bg-transparent border-b outline-none
              text-[13px] tracking-[0.1em] px-0
              placeholder:text-black/20
              border-black/10 focus:border-black/35 transition-colors duration-300"
          />
          {error && (
            <p style={{ ...mono, fontSize: '11px', color: 'rgba(220,38,38,0.7)', letterSpacing: '0.05em' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ ...mono, fontSize: '11px', letterSpacing: '0.3em' }}
            className="w-full h-[52px] bg-[#111111] text-[#F5F3EE] uppercase
              hover:bg-[#2a2a2a] transition-colors duration-300
              disabled:opacity-30 cursor-pointer"
          >
            {loading ? 'Verifying...' : '[ Authenticate ]'}
          </button>
        </form>

        <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.18)', letterSpacing: '0.2em' }}>
          TVP // RESTRICTED ACCESS
        </p>
      </motion.div>
    </div>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, highlight }) {
  return (
    <div className="p-5 flex flex-col gap-2" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
      <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.3em' }} className="uppercase">
        {label}
      </p>
      <p style={{ ...mono, fontSize: '20px', letterSpacing: '0.04em',
        color: highlight === 'green' ? '#16a34a' : highlight === 'red' ? '#dc2626' : '#111111' }}>
        {value}
      </p>
    </div>
  )
}

// ─── Member row ───────────────────────────────────────────────────────────────

function MemberRow({ m, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting]           = useState(false)

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return }
    setDeleting(true)
    try {
      await fetch('/api/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: m.email }) })
      onDelete(m.email)
    } catch { setDeleting(false); setConfirmDelete(false) }
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
        <span style={{ ...mono, fontSize: '13px', color: '#111111', letterSpacing: '0.04em' }}>
          {m.name || '—'}
        </span>
        <div className="flex items-center gap-3">
          <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.35)' }}>#{m.memberNumber}</span>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.12em' }}
            className={`px-2 py-1 border transition-all duration-200 cursor-pointer disabled:opacity-30 ${
              confirmDelete
                ? 'border-red-500/50 text-red-500 hover:border-red-400'
                : 'border-black/[0.10] text-black/25 hover:border-black/30 hover:text-black/55'
            }`}
          >
            {deleting ? '...' : confirmDelete ? 'CONFIRM' : '×'}
          </button>
        </div>
      </div>
      <span style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.50)', letterSpacing: '0.02em' }}>
        {m.email}
      </span>
      <div className="flex items-center justify-between gap-2 mt-1">
        <span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.28)' }}>{m.userId}</span>
        <span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.28)' }}>Joined {formatDate(m.timestamp)}</span>
      </div>
      <div className="flex items-center justify-between gap-2 mt-0.5">
        <span style={{ ...mono, fontSize: '9px', color: m.lastSeen ? '#16a34a' : 'rgba(0,0,0,0.22)' }}>
          {m.lastSeen ? `● Last access: ${timeAgo(m.lastSeen)}` : '○ No access recorded yet'}
        </span>
        {m.lastSeen && (
          <span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.25)' }}>{formatDate(m.lastSeen)}</span>
        )}
      </div>
      {confirmDelete && !deleting && (
        <p style={{ ...mono, fontSize: '9px', color: 'rgba(220,38,38,0.55)', letterSpacing: '0.08em' }} className="mt-1">
          Tap CONFIRM to delete — this cannot be undone
        </p>
      )}
    </motion.div>
  )
}

// ─── Promo codes ──────────────────────────────────────────────────────────────

function PromoSection({ password }) {
  const [promos, setPromos]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [creating, setCreating] = useState(false)
  const [copied, setCopied]     = useState(null)
  const [form, setForm]         = useState({ promoterName: '', code: '', percentOff: '15', maxRedemptions: '50' })
  const [formError, setFormError] = useState('')
  const [success, setSuccess]   = useState(null)

  const loadPromos = async () => {
    setLoading(true)
    try {
      const res  = await fetch('/api/list-promos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const data = await res.json()
      if (res.ok) setPromos(data.promos)
    } catch {}
    setLoading(false)
  }

  const handleCreate = async (e) => {
    e.preventDefault(); setFormError(''); setSuccess(null)
    if (!form.promoterName.trim() || !form.code.trim()) { setFormError('Promoter name and code are required.'); return }
    setCreating(true)
    try {
      const res  = await fetch('/api/create-promo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, ...form }) })
      const data = await res.json()
      if (!res.ok) { setFormError(data.error || 'Failed to create code.'); setCreating(false); return }
      setSuccess(data)
      setForm({ promoterName: '', code: '', percentOff: '15', maxRedemptions: '50' })
      loadPromos()
    } catch { setFormError('Connection error.') }
    setCreating(false)
  }

  const suggestCode = (name) => {
    const clean = name.trim().toUpperCase().replace(/\s+/g, '').slice(0, 8)
    setForm(f => ({ ...f, promoterName: name, code: clean + f.percentOff }))
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const inputCls = "w-full h-10 bg-transparent outline-none text-[12px] tracking-[0.06em] px-0 border-b transition-colors duration-300 placeholder:text-black/20 border-black/10 focus:border-black/35"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35 }}
      className="mt-10 pt-8"
      style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <p style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.32em' }} className="uppercase">
          Promo Codes — Promoters
        </p>
        <button
          onClick={loadPromos} disabled={loading}
          style={{ ...mono, fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.40)' }}
          className="px-3 py-1 border border-black/[0.12] hover:border-black/30 hover:text-black/70 transition-all duration-200 cursor-pointer disabled:opacity-30"
        >
          {loading ? '...' : promos ? '↻ Refresh' : 'Load Codes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Create form */}
        <div className="p-6" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
          <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.3em' }} className="uppercase mb-6">
            Generate New Code
          </p>
          <form onSubmit={handleCreate} className="flex flex-col gap-5">
            <div>
              <label style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.28em' }} className="uppercase block mb-2">
                Promoter Name
              </label>
              <input type="text" placeholder="e.g. John Smith" value={form.promoterName}
                onChange={e => suggestCode(e.target.value)}
                style={{ ...mono, color: '#111111', caretColor: '#111111' }}
                className={inputCls} />
            </div>
            <div>
              <label style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.28em' }} className="uppercase block mb-2">
                Promo Code
              </label>
              <input type="text" placeholder="e.g. JOHN15" value={form.code}
                onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
                style={{ ...mono, color: '#111111', caretColor: '#111111', letterSpacing: '0.14em' }}
                className={inputCls} />
            </div>
            <div className="flex gap-5">
              <div className="flex-1">
                <label style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.28em' }} className="uppercase block mb-2">
                  Discount %
                </label>
                <input type="number" min="1" max="100" value={form.percentOff}
                  onChange={e => setForm(f => ({ ...f, percentOff: e.target.value }))}
                  style={{ ...mono, color: '#111111', caretColor: '#111111' }}
                  className={inputCls} />
              </div>
              <div className="flex-1">
                <label style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.38)', letterSpacing: '0.28em' }} className="uppercase block mb-2">
                  Max Uses
                </label>
                <input type="number" min="1" value={form.maxRedemptions}
                  onChange={e => setForm(f => ({ ...f, maxRedemptions: e.target.value }))}
                  style={{ ...mono, color: '#111111', caretColor: '#111111' }}
                  className={inputCls} />
              </div>
            </div>

            {formError && (
              <p style={{ ...mono, fontSize: '10px', color: 'rgba(220,38,38,0.70)', letterSpacing: '0.04em' }}>{formError}</p>
            )}
            {success && (
              <div className="flex items-center justify-between gap-3 px-3 py-2" style={{ border: '1px solid rgba(22,163,74,0.30)', background: 'rgba(22,163,74,0.04)' }}>
                <p style={{ ...mono, fontSize: '11px', color: '#16a34a', letterSpacing: '0.1em' }}>
                  ✓ {success.code} — {success.percentOff}% off — {success.maxRedemptions} uses
                </p>
                <button type="button" onClick={() => copyCode(success.code)}
                  style={{ ...mono, fontSize: '9px', color: '#16a34a', letterSpacing: '0.1em' }}
                  className="hover:opacity-60 cursor-pointer">
                  {copied === success.code ? 'COPIED' : 'COPY'}
                </button>
              </div>
            )}

            <button type="submit" disabled={creating}
              style={{ ...mono, fontSize: '10px', letterSpacing: '0.3em' }}
              className="h-11 bg-[#111111] text-[#F5F3EE] uppercase hover:bg-[#2a2a2a] transition-colors duration-300 disabled:opacity-30 cursor-pointer">
              {creating ? '...' : '[ Generate Code ]'}
            </button>
          </form>
        </div>

        {/* Code list */}
        <div>
          {!promos ? (
            <div className="flex items-center justify-center min-h-[200px]" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.18em' }}>
                Click Load Codes to view
              </p>
            </div>
          ) : promos.length === 0 ? (
            <div className="flex items-center justify-center min-h-[200px]" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.18em' }}>
                No codes yet
              </p>
            </div>
          ) : (
            <div className="flex flex-col max-h-[480px] overflow-y-auto scrollbar-none" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              {promos.map(p => (
                <div key={p.id} className="px-4 py-3 flex flex-col gap-1" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ ...mono, fontSize: '13px', color: p.active ? '#111111' : 'rgba(0,0,0,0.28)', letterSpacing: '0.1em' }}>
                      {p.code}
                    </span>
                    <button onClick={() => copyCode(p.code)}
                      style={{ ...mono, fontSize: '9px', letterSpacing: '0.12em', color: copied === p.code ? '#16a34a' : 'rgba(0,0,0,0.30)' }}
                      className="hover:opacity-60 cursor-pointer transition-colors">
                      {copied === p.code ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.04em' }}>
                      {p.promoter} · {p.percentOff}% off
                    </span>
                    <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.04em',
                      color: p.timesRedeemed > 0 ? '#16a34a' : 'rgba(0,0,0,0.32)' }}>
                      {p.timesRedeemed} / {p.maxRedemptions ?? '∞'} used
                    </span>
                  </div>
                  {!p.active && (
                    <span style={{ ...mono, fontSize: '9px', color: 'rgba(220,38,38,0.55)', letterSpacing: '0.08em' }}>EXPIRED / INACTIVE</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ data, password }) {
  const f = data.financials ?? FINANCIALS
  const [members, setMembers]   = useState(data.members)
  const [refreshing, setRefreshing] = useState(false)
  const count = members.length

  const handleDeleteMember = (email) => setMembers(prev => prev.filter(m => m.email !== email))

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      const res  = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const fresh = await res.json()
      if (res.ok) setMembers(fresh.members)
    } catch {}
    setRefreshing(false)
  }

  const revenue    = count * f.retailPrice
  const netProfit  = revenue - f.initialInvestment
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
    <div className="min-h-[100dvh] w-full bg-[#F5F3EE] flex flex-col">
      <div className="grain" />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-10 h-10 bg-[#F5F3EE]"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.3em' }}>
          TRUE VISION PROJECT
        </span>
        <span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }}>
          COMMAND CENTER
        </span>
      </div>

      <main className="relative z-10 flex-1 px-4 sm:px-10 pt-16 pb-12 max-w-5xl mx-auto w-full">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="pt-6 pb-8 mb-8" style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
        >
          <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.4em' }} className="mb-2 uppercase">
            Dashboard
          </p>
          <p style={{ ...serif, fontSize: 'clamp(28px, 6vw, 46px)', color: '#111111', lineHeight: 1.1 }}>
            {String(count).padStart(3, '0')} Members
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6"
        >
          <StatCard label="Total Members"   value={count} />
          <StatCard label="Current Revenue" value={fmt(revenue)} />
          <StatCard label="Net Position"    value={fmt(netProfit)} highlight={netProfit >= 0 ? 'green' : 'red'} />
        </motion.div>

        {/* Break-even bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 p-5" style={{ border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <p style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
              Break-Even Progress
            </p>
            <p style={{ ...mono, fontSize: '12px', color: count >= f.breakEvenUnits ? '#16a34a' : '#111111' }}>
              {count} / {f.breakEvenUnits} units
            </p>
          </div>
          <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.07)' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: breakEvenPct / 100 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full origin-left rounded-full"
              style={{ background: count >= f.breakEvenUnits ? '#16a34a' : '#111111' }}
            />
          </div>
          <p style={{ ...mono, fontSize: '9px', color: count >= f.breakEvenUnits ? '#16a34a' : 'rgba(0,0,0,0.38)', letterSpacing: '0.12em' }}
            className="mt-2">
            {count >= f.breakEvenUnits ? '✓ Break-even achieved' : `${f.breakEvenUnits - count} more units to break even`}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Financials */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.32em' }} className="mb-4 uppercase">
              Financial Model
            </p>
            <div className="flex flex-col" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              {finRows.map(({ label, value, highlight }) => (
                <div key={label} className="flex items-center justify-between px-4 py-3 gap-4"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <span style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.50)', letterSpacing: '0.04em' }}>
                    {label}
                  </span>
                  <span style={{ ...mono, fontSize: '12px', letterSpacing: '0.04em',
                    color: highlight === 'green' ? '#16a34a' : highlight === 'red' ? '#dc2626' : '#111111' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Member list */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex items-center justify-between mb-4">
              <p style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.32em' }} className="uppercase">
                Member Registry — {count} total
              </p>
              <button onClick={handleRefresh} disabled={refreshing}
                style={{ ...mono, fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.38)' }}
                className="px-2 py-1 border border-black/[0.10] hover:border-black/30 hover:text-black/70 transition-all duration-200 cursor-pointer disabled:opacity-30">
                {refreshing ? '...' : '↻ Refresh'}
              </button>
            </div>
            <div className="flex flex-col max-h-[480px] overflow-y-auto scrollbar-none" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              {members.length === 0 ? (
                <p style={{ ...mono, fontSize: '12px', color: 'rgba(0,0,0,0.28)' }} className="px-4 py-6 text-center">
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

        <PromoSection password={password} />

      </main>

      <footer className="relative z-10 px-4 sm:px-10 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.2em' }}>
          TVP // COMMAND CENTER // {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [data, setData]         = useState(null)
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
