import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'

const mono = { fontFamily: "'Space Mono', monospace" }
const STEPS = ['Contact', 'Shipping', 'Review']

function Field({ label, id, type = 'text', autoComplete, value, onChange, error, half }) {
  return (
    <div className={half ? 'flex-1 min-w-0' : 'w-full'}>
      <label htmlFor={id}
        className="block text-[8px] tracking-[0.3em] uppercase mb-2"
        style={{ ...mono, color: 'rgba(0,0,0,0.38)' }}>
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
          text-[11px] tracking-[0.1em]
          transition-colors duration-500
          placeholder:text-black/20
          ${error ? 'border-red-500/40' : 'border-black/[0.10] focus:border-black/30'}
        `}
        style={{ ...mono, color: 'rgba(0,0,0,0.72)', caretColor: '#111111' }}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} role="alert"
          className="mt-1.5 text-[7px] tracking-[0.25em] text-red-500/55 uppercase"
          style={mono}>
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

  const [form, setForm] = useState(() => {
    try {
      const member = JSON.parse(localStorage.getItem('TrueVisionMember') || 'null')
      return {
        email: member?.email || '',
        firstName: '', lastName: '',
        address: '', city: '', state: '', zip: '', country: 'IE',
      }
    } catch {
      return { email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'IE' }
    }
  })
  const [errors, setErrors] = useState({})

  const shipping = 0
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
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-[8px] tracking-[0.4em] uppercase"
            style={{ ...mono, color: 'rgba(0,0,0,0.28)' }}>
            Your bag is empty
          </p>
          <Link to="/"
            className="text-[8px] tracking-[0.35em] uppercase pb-px hover:opacity-50 transition-opacity duration-300"
            style={{ ...mono, color: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
            Back to Store
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <div className="max-w-screen-lg mx-auto px-6 sm:px-10 pt-28 pb-32">

        {/* Back link */}
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-[8px] tracking-[0.35em] uppercase hover:opacity-50 transition-opacity duration-300 mb-16"
          style={{ ...mono, color: 'rgba(0,0,0,0.30)' }}
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
                className="text-[7px] tracking-[0.35em] uppercase transition-colors duration-500"
                style={{
                  ...mono,
                  color: i === step
                    ? 'rgba(0,0,0,0.60)'
                    : i < step
                      ? 'rgba(0,0,0,0.32)'
                      : 'rgba(0,0,0,0.16)',
                  cursor: i < step ? 'pointer' : 'default',
                }}
              >
                {label}
              </button>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" style={{ ...mono, color: 'rgba(0,0,0,0.14)', fontSize: '8px' }}>/</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-14 lg:gap-20 items-start">

          {/* Form */}
          <form onSubmit={handleNext} noValidate>

            {apiError && (
              <div className="mb-8 px-5 py-4" style={{ border: '1px solid rgba(0,0,0,0.10)' }}>
                <p className="text-[8px] tracking-[0.2em] text-red-500/60 uppercase" style={mono}>{apiError}</p>
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
                        <label htmlFor="country"
                          className="block text-[8px] tracking-[0.3em] uppercase mb-2"
                          style={{ ...mono, color: 'rgba(0,0,0,0.38)' }}>
                          Country
                        </label>
                        <select
                          id="country"
                          value={form.country}
                          onChange={set('country')}
                          autoComplete="country"
                          className="w-full bg-transparent border-b border-black/[0.10] py-3 outline-none focus:border-black/30 transition-colors duration-500 appearance-none cursor-pointer"
                          style={{ ...mono, fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.72)' }}
                        >
                          <option value="IE">Ireland</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                          <option value="NZ">New Zealand</option>
                          <option disabled>──────────</option>
                          <option value="AT">Austria</option>
                          <option value="BE">Belgium</option>
                          <option value="BG">Bulgaria</option>
                          <option value="HR">Croatia</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="EE">Estonia</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="GR">Greece</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IT">Italy</option>
                          <option value="LV">Latvia</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MT">Malta</option>
                          <option value="MC">Monaco</option>
                          <option value="NL">Netherlands</option>
                          <option value="NO">Norway</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="RO">Romania</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="ES">Spain</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option disabled>──────────</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="BH">Bahrain</option>
                          <option value="IL">Israel</option>
                          <option value="JO">Jordan</option>
                          <option value="KW">Kuwait</option>
                          <option value="OM">Oman</option>
                          <option value="QA">Qatar</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="TR">Turkey</option>
                          <option disabled>──────────</option>
                          <option value="AR">Argentina</option>
                          <option value="BO">Bolivia</option>
                          <option value="BR">Brazil</option>
                          <option value="CL">Chile</option>
                          <option value="CO">Colombia</option>
                          <option value="CR">Costa Rica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="SV">El Salvador</option>
                          <option value="GT">Guatemala</option>
                          <option value="HN">Honduras</option>
                          <option value="MX">Mexico</option>
                          <option value="PA">Panama</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="UY">Uruguay</option>
                          <option value="VE">Venezuela</option>
                          <option disabled>──────────</option>
                          <option value="BD">Bangladesh</option>
                          <option value="CN">China</option>
                          <option value="HK">Hong Kong</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="JP">Japan</option>
                          <option value="MY">Malaysia</option>
                          <option value="NP">Nepal</option>
                          <option value="PK">Pakistan</option>
                          <option value="PH">Philippines</option>
                          <option value="SG">Singapore</option>
                          <option value="KR">South Korea</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="TW">Taiwan</option>
                          <option value="TH">Thailand</option>
                          <option value="VN">Vietnam</option>
                          <option disabled>──────────</option>
                          <option value="DZ">Algeria</option>
                          <option value="EG">Egypt</option>
                          <option value="GH">Ghana</option>
                          <option value="KE">Kenya</option>
                          <option value="MA">Morocco</option>
                          <option value="NG">Nigeria</option>
                          <option value="ZA">South Africa</option>
                          <option value="TN">Tunisia</option>
                          <option value="UG">Uganda</option>
                          <option value="TZ">Tanzania</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                          <option disabled>──────────</option>
                          <option value="AL">Albania</option>
                          <option value="AM">Armenia</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BY">Belarus</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="GE">Georgia</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="MD">Moldova</option>
                          <option value="MK">North Macedonia</option>
                          <option value="RS">Serbia</option>
                          <option value="UA">Ukraine</option>
                          <option value="UZ">Uzbekistan</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2 — Review */}
                {step === 2 && (
                  <div className="flex flex-col gap-6">

                    {/* Contact summary */}
                    <div className="p-5" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[7px] tracking-[0.35em] uppercase"
                          style={{ ...mono, color: 'rgba(0,0,0,0.35)' }}>Contact</span>
                        <button type="button" onClick={() => setStep(0)}
                          className="text-[7px] tracking-[0.25em] uppercase hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                          style={{ ...mono, color: 'rgba(0,0,0,0.30)' }}>
                          Edit
                        </button>
                      </div>
                      <p style={{ ...mono, fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.60)' }}>
                        {form.email}
                      </p>
                    </div>

                    {/* Shipping summary */}
                    <div className="p-5" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[7px] tracking-[0.35em] uppercase"
                          style={{ ...mono, color: 'rgba(0,0,0,0.35)' }}>Ship to</span>
                        <button type="button" onClick={() => setStep(1)}
                          className="text-[7px] tracking-[0.25em] uppercase hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                          style={{ ...mono, color: 'rgba(0,0,0,0.30)' }}>
                          Edit
                        </button>
                      </div>
                      <p style={{ ...mono, fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.60)' }}>
                        {form.firstName} {form.lastName}
                      </p>
                      <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.06em', color: 'rgba(0,0,0,0.35)', marginTop: '4px' }}>
                        {form.address}
                      </p>
                      <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.06em', color: 'rgba(0,0,0,0.35)' }}>
                        {form.city}, {form.state} {form.zip}
                      </p>
                    </div>

                    {/* Secure notice */}
                    <div className="flex items-center gap-3 px-5 py-4"
                      style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25"
                        className="shrink-0" style={{ color: 'rgba(0,0,0,0.28)' }} aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                      <span className="text-[7px] tracking-[0.25em] uppercase"
                        style={{ ...mono, color: 'rgba(0,0,0,0.30)' }}>
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
                  className="text-[8px] tracking-[0.35em] uppercase hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                  style={{ ...mono, color: 'rgba(0,0,0,0.30)' }}
                  disabled={loading}
                >
                  ← Back
                </button>
              ) : <div />}

              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 bg-[#111111] text-[#F5F3EE] text-[9px] tracking-[0.45em] uppercase font-medium hover:bg-[#2a2a2a] transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                style={mono}
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
              className="lg:hidden flex items-center justify-between w-full py-4 cursor-pointer"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
            >
              <span className="text-[8px] tracking-[0.4em] uppercase"
                style={{ ...mono, color: 'rgba(0,0,0,0.32)' }}>
                {summaryOpen ? 'Hide' : 'Show'} Summary
              </span>
              <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.50)' }}>
                €{total.toFixed(2)}
              </span>
            </button>

            <div className={`lg:block ${summaryOpen ? 'block' : 'hidden'}`}>
              <div className="pt-6 lg:pt-0 flex flex-col gap-5">
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.key} className="flex items-start gap-4">
                      <div className="w-14 h-16 bg-[#E8E6E1] shrink-0 overflow-hidden flex items-center justify-center">
                        {item.imgSrc
                          ? <img src={item.imgSrc} alt={item.name} className="w-full h-full object-cover" style={{ filter: 'saturate(0.14)' }} />
                          : <span className="text-[6px] tracking-[0.3em] uppercase"
                              style={{ ...mono, color: 'rgba(0,0,0,0.18)' }}>Img</span>
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] tracking-[0.25em] uppercase"
                          style={{ ...mono, color: 'rgba(0,0,0,0.60)' }}>{item.name}</p>
                        <p className="text-[7px] tracking-[0.2em] uppercase mt-1"
                          style={{ ...mono, color: 'rgba(0,0,0,0.28)' }}>{item.size} / {item.color}</p>
                        <p className="text-[7px] tracking-[0.2em] mt-1"
                          style={{ ...mono, color: 'rgba(0,0,0,0.28)' }}>Qty {item.qty}</p>
                      </div>
                      <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.45)' }}>
                        €{(item.price * item.qty).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 flex flex-col gap-3"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] uppercase"
                      style={{ ...mono, color: 'rgba(0,0,0,0.35)' }}>Subtotal</span>
                    <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.50)' }}>
                      €{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[8px] tracking-[0.3em] uppercase"
                      style={{ ...mono, color: 'rgba(0,0,0,0.35)' }}>Shipping</span>
                    <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.50)' }}>
                      €{shipping.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-between"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                  <span className="text-[9px] tracking-[0.35em] uppercase"
                    style={{ ...mono, color: 'rgba(0,0,0,0.50)' }}>Total</span>
                  <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.72)' }}>
                    €{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
