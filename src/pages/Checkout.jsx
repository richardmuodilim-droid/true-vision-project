import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const STEPS = ['Contact', 'Shipping', 'Review']

function Field({ label, id, type = 'text', autoComplete, value, onChange, error, half }) {
  return (
    <div className={half ? 'flex-1 min-w-0' : 'w-full'}>
      <label htmlFor={id} className="block text-[8px] tracking-[0.3em] text-white/25 uppercase mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`
          w-full bg-transparent border-b py-3 outline-none
          text-[11px] tracking-[0.1em] text-white/80
          placeholder:text-white/15
          transition-colors duration-500
          ${error ? 'border-red-400/40' : 'border-white/[0.1] focus:border-white/35'}
        `}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[7px] tracking-[0.25em] text-red-400/50 uppercase">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Checkout() {
  const { items, subtotal, dispatch } = useCart()
  const [step, setStep]               = useState(0)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [loading, setLoading]         = useState(false)
  const [apiError, setApiError]       = useState('')

  const [form, setForm] = useState({
    email: '',
    firstName: '', lastName: '',
    address: '', city: '', state: '', zip: '', country: 'IE',
  })
  const [errors, setErrors] = useState({})

  const shipping = 6
  const total    = subtotal + shipping

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    }
    if (step === 1) {
      if (!form.firstName) e.firstName = 'Required'
      if (!form.lastName)  e.lastName  = 'Required'
      if (!form.address)   e.address   = 'Required'
      if (!form.city)      e.city      = 'Required'
      if (!form.state)     e.state     = 'Required'
      if (!form.zip)       e.zip       = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }

    // Step 2 — redirect to Stripe
    setLoading(true)
    setApiError('')

    sessionStorage.setItem('tvp_pending_order', JSON.stringify({
      email: form.email,
      items: items.map(i => ({
        name:  i.name,
        color: i.color,
        size:  i.size,
        qty:   i.qty,
        price: i.price,
      })),
    }))

    try {
      const res  = await fetch('/api/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items, email: form.email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Payment could not be started.')
      dispatch({ type: 'CLEAR' })
      window.location.href = data.url
    } catch (err) {
      setApiError(err.message)
      setLoading(false)
    }
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-[8px] tracking-[0.4em] text-white/25 uppercase">Your bag is empty</p>
          <Link to="/" className="text-[8px] tracking-[0.35em] text-white/20 uppercase border-b border-white/10 pb-px hover:text-white/45 transition-colors duration-300">
            Back to Store
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-screen-lg mx-auto px-6 sm:px-10 pt-28 pb-32">

        {/* Back link */}
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-[8px] tracking-[0.35em] text-white/20 uppercase hover:text-white/45 transition-colors duration-300 mb-16"
        >
          <span aria-hidden="true">←</span> Back to Store
        </Link>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-16">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={`text-[7px] tracking-[0.35em] uppercase transition-colors duration-500 ${
                  i === step ? 'text-white/60' : i < step ? 'text-white/30 hover:text-white/50 cursor-pointer' : 'text-white/15 cursor-default'
                }`}
              >
                {label}
              </button>
              {i < STEPS.length - 1 && (
                <span className="text-white/10 text-[8px]" aria-hidden="true">/</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 lg:gap-20 items-start">

          {/* Form */}
          <form onSubmit={handleNext} noValidate>

            {apiError && (
              <div className="mb-8 border border-white/10 px-5 py-4">
                <p className="text-[8px] tracking-[0.2em] text-red-400/60 uppercase">{apiError}</p>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >
                {/* Step 0 — Contact */}
                {step === 0 && (
                  <Field label="Email" id="email" type="email" autoComplete="email"
                    value={form.email} onChange={set('email')} error={errors.email} />
                )}

                {/* Step 1 — Shipping */}
                {step === 1 && (
                  <>
                    <div className="flex gap-4">
                      <Field label="First Name" id="firstName" autoComplete="given-name" half
                        value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
                      <Field label="Last Name" id="lastName" autoComplete="family-name" half
                        value={form.lastName} onChange={set('lastName')} error={errors.lastName} />
                    </div>
                    <Field label="Address" id="address" autoComplete="address-line1"
                      value={form.address} onChange={set('address')} error={errors.address} />
                    <div className="flex gap-4">
                      <Field label="City" id="city" autoComplete="address-level2" half
                        value={form.city} onChange={set('city')} error={errors.city} />
                      <Field label="State / County" id="state" autoComplete="address-level1" half
                        value={form.state} onChange={set('state')} error={errors.state} />
                    </div>
                    <div className="flex gap-4">
                      <Field label="ZIP / Eircode" id="zip" autoComplete="postal-code" half
                        value={form.zip} onChange={set('zip')} error={errors.zip} />
                      <div className="flex-1 min-w-0">
                        <label htmlFor="country" className="block text-[8px] tracking-[0.3em] text-white/25 uppercase mb-2">
                          Country
                        </label>
                        <select
                          id="country"
                          value={form.country}
                          onChange={set('country')}
                          autoComplete="country"
                          className="w-full bg-transparent border-b border-white/[0.1] py-3 outline-none text-[11px] tracking-[0.1em] text-white/80 focus:border-white/35 transition-colors duration-500 appearance-none"
                        >
                          <option value="IE" className="bg-black">Ireland</option>
                          <option value="GB" className="bg-black">United Kingdom</option>
                          <option value="US" className="bg-black">United States</option>
                          <option value="CA" className="bg-black">Canada</option>
                          <option value="AU" className="bg-black">Australia</option>
                          <option value="DE" className="bg-black">Germany</option>
                          <option value="FR" className="bg-black">France</option>
                          <option value="IT" className="bg-black">Italy</option>
                          <option value="ES" className="bg-black">Spain</option>
                          <option value="NL" className="bg-black">Netherlands</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2 — Review */}
                {step === 2 && (
                  <div className="flex flex-col gap-6">

                    {/* Contact summary */}
                    <div className="border border-white/[0.07] p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[7px] tracking-[0.35em] text-white/25 uppercase">Contact</span>
                        <button type="button" onClick={() => setStep(0)}
                          className="text-[7px] tracking-[0.25em] text-white/20 uppercase hover:text-white/45 transition-colors duration-300 cursor-pointer">
                          Edit
                        </button>
                      </div>
                      <p className="text-[11px] tracking-[0.08em] text-white/60">{form.email}</p>
                    </div>

                    {/* Shipping summary */}
                    <div className="border border-white/[0.07] p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[7px] tracking-[0.35em] text-white/25 uppercase">Ship to</span>
                        <button type="button" onClick={() => setStep(1)}
                          className="text-[7px] tracking-[0.25em] text-white/20 uppercase hover:text-white/45 transition-colors duration-300 cursor-pointer">
                          Edit
                        </button>
                      </div>
                      <p className="text-[11px] tracking-[0.08em] text-white/60">{form.firstName} {form.lastName}</p>
                      <p className="text-[10px] tracking-[0.06em] text-white/30 mt-1">{form.address}</p>
                      <p className="text-[10px] tracking-[0.06em] text-white/30">{form.city}, {form.state} {form.zip}</p>
                    </div>

                    {/* Secure notice */}
                    <div className="flex items-center gap-3 border border-white/[0.05] px-5 py-4">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-white/20 shrink-0" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <span className="text-[7px] tracking-[0.25em] text-white/20 uppercase">
                        Secure payment powered by Stripe. Your card details never touch our servers.
                      </span>
                    </div>

                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-14">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="text-[8px] tracking-[0.35em] text-white/20 uppercase hover:text-white/45 transition-colors duration-300 cursor-pointer"
                  disabled={loading}
                >
                  ← Back
                </button>
              ) : <div />}

              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 bg-white text-black text-[9px] tracking-[0.45em] uppercase font-medium hover:bg-white/90 transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step < STEPS.length - 1
                  ? 'Continue'
                  : loading
                    ? 'Redirecting...'
                    : 'Complete Order'}
              </button>
            </div>
          </form>

          {/* Order summary */}
          <aside aria-label="Order summary" className="lg:sticky lg:top-28">

            <button
              onClick={() => setSummaryOpen((v) => !v)}
              className="lg:hidden flex items-center justify-between w-full py-4 border-b border-white/[0.06] cursor-pointer"
            >
              <span className="text-[8px] tracking-[0.4em] text-white/30 uppercase">
                {summaryOpen ? 'Hide' : 'Show'} Summary
              </span>
              <span className="text-[10px] tracking-[0.15em] text-white/50">€{total.toFixed(2)}</span>
            </button>

            <div className={`lg:block ${summaryOpen ? 'block' : 'hidden'}`}>
              <div className="pt-6 lg:pt-0 flex flex-col gap-5">
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.key} className="flex items-start gap-4">
                      <div className="w-14 h-16 bg-[#0d0d0d] shrink-0 overflow-hidden">
                        {item.imgSrc
                          ? <img src={item.imgSrc} alt={item.name} className="w-full h-full object-cover" style={{ filter: 'saturate(0.12)' }} />
                          : <span className="w-full h-full flex items-center justify-center text-[6px] tracking-[0.3em] text-white/10 uppercase">Img</span>
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] tracking-[0.25em] text-white/60 uppercase">{item.name}</p>
                        <p className="text-[7px] tracking-[0.2em] text-white/20 uppercase mt-1">{item.size} / {item.color}</p>
                        <p className="text-[7px] tracking-[0.2em] text-white/20 mt-1">Qty {item.qty}</p>
                      </div>
                      <p className="text-[9px] tracking-[0.1em] text-white/40">€{(item.price * item.qty).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/[0.05] pt-5 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] text-white/25 uppercase">Subtotal</span>
                    <span className="text-[8px] tracking-[0.1em] text-white/40">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] text-white/25 uppercase">Shipping</span>
                    <span className="text-[8px] tracking-[0.1em] text-white/40">€{shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-white/[0.05] pt-4 flex justify-between">
                  <span className="text-[9px] tracking-[0.35em] text-white/50 uppercase">Total</span>
                  <span className="text-[9px] tracking-[0.1em] text-white/70">€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
