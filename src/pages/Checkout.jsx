import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const STEPS = ['Contact', 'Shipping', 'Payment']

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
  const [step, setStep] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)

  const [form, setForm] = useState({
    email: '',
    firstName: '', lastName: '',
    address: '', city: '', state: '', zip: '', country: 'US',
    cardNumber: '', expiry: '', cvv: '',
  })
  const [errors, setErrors] = useState({})

  const shipping = subtotal >= 150 ? 0 : 12
  const total = subtotal + shipping

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
      if (!form.lastName) e.lastName = 'Required'
      if (!form.address) e.address = 'Required'
      if (!form.city) e.city = 'Required'
      if (!form.state) e.state = 'Required'
      if (!form.zip) e.zip = 'Required'
    }
    if (step === 2) {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Valid card number required'
      if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY required'
      if (!form.cvv || form.cvv.length < 3) e.cvv = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (!validate()) return
    if (step < 2) {
      setStep((s) => s + 1)
    } else {
      // Wire to Stripe or payment processor here
      setOrderPlaced(true)
      dispatch({ type: 'CLEAR' })
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center gap-8 max-w-sm"
        >
          <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase">Order Confirmed</p>
          <h1 className="text-[11px] tracking-[0.4em] text-white/70 uppercase font-light leading-loose">
            Thank you.
          </h1>
          <p className="text-[8px] tracking-[0.2em] text-white/25 leading-loose">
            A confirmation has been sent to {form.email}. Your order will ship within 3–5 business days.
          </p>
          <Link
            to="/"
            className="mt-4 text-[8px] tracking-[0.4em] text-white/25 uppercase border-b border-white/10 pb-px hover:text-white/50 hover:border-white/25 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-screen-lg mx-auto px-6 sm:px-10 pt-28 pb-32">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[8px] tracking-[0.35em] text-white/20 uppercase hover:text-white/45 transition-colors duration-300 mb-16"
        >
          <span aria-hidden="true">←</span> Back
        </Link>

        {/* Progress indicator */}
        <div className="flex items-center gap-4 mb-16">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`text-[7px] tracking-[0.35em] uppercase transition-colors duration-500 ${
                  i === step ? 'text-white/60' : i < step ? 'text-white/30' : 'text-white/15'
                }`}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="text-white/10 text-[8px]" aria-hidden="true">/</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 lg:gap-20 items-start">

          {/* Form */}
          <form onSubmit={handleNext} noValidate>

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
                  <>
                    <Field label="Email" id="email" type="email" autoComplete="email"
                      value={form.email} onChange={set('email')} error={errors.email} />
                  </>
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
                      <Field label="State" id="state" autoComplete="address-level1" half
                        value={form.state} onChange={set('state')} error={errors.state} />
                    </div>
                    <div className="flex gap-4">
                      <Field label="ZIP" id="zip" autoComplete="postal-code" half
                        value={form.zip} onChange={set('zip')} error={errors.zip} />
                      <Field label="Country" id="country" autoComplete="country" half
                        value={form.country} onChange={set('country')} error={errors.country} />
                    </div>
                  </>
                )}

                {/* Step 2 — Payment */}
                {step === 2 && (
                  <>
                    <div className="flex items-center gap-3 mb-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="text-white/20" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <span className="text-[7px] tracking-[0.3em] text-white/15 uppercase">Secure Checkout</span>
                    </div>
                    <Field label="Card Number" id="cardNumber" autoComplete="cc-number"
                      value={form.cardNumber} onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16)
                        const formatted = v.replace(/(.{4})/g, '$1 ').trim()
                        setForm((f) => ({ ...f, cardNumber: formatted }))
                        setErrors((er) => ({ ...er, cardNumber: '' }))
                      }} error={errors.cardNumber} />
                    <div className="flex gap-4">
                      <Field label="Expiry (MM/YY)" id="expiry" autoComplete="cc-exp" half
                        value={form.expiry} onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4)
                          if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2)
                          setForm((f) => ({ ...f, expiry: v }))
                          setErrors((er) => ({ ...er, expiry: '' }))
                        }} error={errors.expiry} />
                      <Field label="CVV" id="cvv" autoComplete="cc-csc" half
                        value={form.cvv} onChange={(e) => {
                          setForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))
                          setErrors((er) => ({ ...er, cvv: '' }))
                        }} error={errors.cvv} />
                    </div>
                  </>
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
                >
                  ← Back
                </button>
              ) : <div />}

              <button
                type="submit"
                className="px-12 py-4 bg-white text-black text-[9px] tracking-[0.45em] uppercase font-medium hover:bg-white/90 transition-colors duration-300 cursor-pointer"
              >
                {step < 2 ? 'Continue' : 'Place Order'}
              </button>
            </div>
          </form>

          {/* Order summary */}
          <aside aria-label="Order summary" className="lg:sticky lg:top-28">

            {/* Collapsible on mobile */}
            <button
              onClick={() => setSummaryOpen((v) => !v)}
              className="lg:hidden flex items-center justify-between w-full py-4 border-b border-white/[0.06] mb-0 cursor-pointer"
            >
              <span className="text-[8px] tracking-[0.4em] text-white/30 uppercase">
                {summaryOpen ? 'Hide' : 'Show'} Summary
              </span>
              <span className="text-[10px] tracking-[0.15em] text-white/50">${total.toFixed(2)}</span>
            </button>

            <div className={`lg:block ${summaryOpen ? 'block' : 'hidden'}`}>
              <div className="pt-6 lg:pt-0 flex flex-col gap-5">
                {/* Items */}
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.key} className="flex items-start gap-4">
                      <div className="w-14 h-16 bg-[#0d0d0d] shrink-0 flex items-center justify-center">
                        <span className="text-[6px] tracking-[0.3em] text-white/10 uppercase">Img</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] tracking-[0.25em] text-white/60 uppercase">{item.name}</p>
                        <p className="text-[7px] tracking-[0.2em] text-white/20 uppercase mt-1">{item.size} / {item.color}</p>
                        <p className="text-[7px] tracking-[0.2em] text-white/20 mt-1">Qty {item.qty}</p>
                      </div>
                      <p className="text-[9px] tracking-[0.1em] text-white/40">${(item.price * item.qty).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/[0.05] pt-5 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] text-white/25 uppercase">Subtotal</span>
                    <span className="text-[8px] tracking-[0.1em] text-white/40">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] text-white/25 uppercase">Shipping</span>
                    <span className="text-[8px] tracking-[0.1em] text-white/40">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="border-t border-white/[0.05] pt-4 flex justify-between">
                  <span className="text-[9px] tracking-[0.35em] text-white/50 uppercase">Total</span>
                  <span className="text-[9px] tracking-[0.1em] text-white/70">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
