import { useState, useEffect } from 'react'
import { useParams, Link, useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getProduct, products } from '../data/products'
import ProductCard from '../components/ProductCard'

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }

export default function Product() {
  const { onCartOpen } = useOutletContext()
  const { id } = useParams()
  const product = getProduct(id)

  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty,           setQty]           = useState(1)
  const [activeImage,   setActiveImage]   = useState(0)
  const [openAccordion, setOpenAccordion] = useState(null)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [sizeError,     setSizeError]     = useState(false)

  const { dispatch } = useCart()

  useEffect(() => {
    if (product && product.sizes.length === 1) setSelectedSize(product.sizes[0])
  }, [product?.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
        <div className="text-center flex flex-col gap-6">
          <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.28)' }} className="uppercase">
            Product not found
          </p>
          <Link to="/"
            style={{ ...mono, fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
            className="uppercase pb-px hover:opacity-50 transition-opacity duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const related    = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0)
  const lowStock   = totalStock < 8

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    const colorName  = selectedColor || product.colors[0].name
    const colorIndex = product.colors.findIndex((c) => c.name === colorName)
    const imgSrc     = product.images[colorIndex >= 0 ? colorIndex : 0] || null
    dispatch({
      type: 'ADD',
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: colorName,
        imgSrc,
        qty,
      },
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
    onCartOpen()
  }

  const accordionItems = [
    { id: 'material', label: 'Material', content: product.material },
    { id: 'care',     label: 'Care',     content: product.care },
    { id: 'fit',      label: 'Fit',      content: product.fit },
  ]

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 pt-28 pb-0">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-14">
          <ol className="flex items-center gap-3">
            {[
              { to: '/', label: 'Home' },
              { to: `/category/${product.category.toLowerCase().replace(' ', '-')}`, label: product.category },
              { label: product.name },
            ].map((crumb, i, arr) => (
              <li key={i} className="flex items-center gap-3">
                {crumb.to ? (
                  <Link to={crumb.to}
                    style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.28)' }}
                    className="uppercase hover:opacity-50 transition-opacity duration-300">
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.55)' }} className="uppercase">
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <span aria-hidden="true" style={{ ...mono, color: 'rgba(0,0,0,0.16)', fontSize: '9px' }}>/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] bg-[#E8E6E1] overflow-hidden"
              style={{ filter: 'saturate(0.18) brightness(0.96)' }}>
              {product.images[activeImage] ? (
                <img
                  src={product.images[activeImage]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  loading="eager"
                  width="800"
                  height="1000"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.18)' }} className="uppercase">
                    Image {activeImage + 1}
                  </span>
                </div>
              )}
              {lowStock && (
                <div className="absolute top-5 left-5">
                  <span style={{ ...mono, fontSize: '7px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.40)' }} className="uppercase">
                    Only {totalStock} left
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className="w-16 h-20 bg-[#E8E6E1] flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    border: `1px solid ${activeImage === i ? 'rgba(0,0,0,0.30)' : 'rgba(0,0,0,0.07)'}`,
                    filter: 'saturate(0.12)',
                  }}
                >
                  {img ? (
                    <img src={img} alt="" loading="lazy" width="64" height="80" className="w-full h-full object-cover" />
                  ) : (
                    <span style={{ ...mono, fontSize: '6px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.20)' }} className="uppercase">{i + 1}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-0 lg:pt-2">

            {/* Name & price */}
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <h1 style={{ ...mono, fontSize: 'clamp(11px, 1.5vw, 13px)', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.80)', fontWeight: 300, lineHeight: 1.6 }} className="uppercase">
                  {product.name}
                </h1>
                <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.28)' }} className="uppercase mt-2">
                  {product.category}
                </p>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', letterSpacing: '0.12em', color: 'rgba(0,0,0,0.72)', fontWeight: 300 }} className="shrink-0">
                €{product.price}
              </p>
            </div>

            {/* Description */}
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.40)', lineHeight: '2' }} className="mb-10 max-w-sm">
              {product.description}
            </p>

            {/* Color swatches */}
            {product.colors.length > 1 && (
              <div className="mb-8">
                <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.38)' }} className="uppercase mb-4">
                  Color — {selectedColor || product.colors[0].name}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name)
                        const idx = product.colors.findIndex(cl => cl.name === c.name)
                        if (idx >= 0 && idx < product.images.length) setActiveImage(idx)
                      }}
                      aria-label={c.name}
                      aria-pressed={selectedColor === c.name}
                      className="w-6 h-6 rounded-full border-2 transition-colors duration-300 cursor-pointer"
                      style={{
                        backgroundColor: c.hex,
                        borderColor: (selectedColor || product.colors[0].name) === c.name
                          ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.14)',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: sizeError ? 'rgba(239,68,68,0.7)' : 'rgba(0,0,0,0.35)' }} className="uppercase transition-colors duration-300">
                  {sizeError ? 'Select a size' : 'Size'}
                </p>
                <button style={{ ...mono, fontSize: '7px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.28)', borderBottom: '1px solid rgba(0,0,0,0.10)' }}
                  className="uppercase hover:opacity-50 transition-opacity duration-300 pb-px cursor-pointer">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const inStock = (product.stock[size] || 0) > 0
                  const isSelected = selectedSize === size
                  return (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      disabled={!inStock}
                      aria-label={`Size ${size}${!inStock ? ' — out of stock' : ''}`}
                      aria-pressed={isSelected}
                      className="min-w-[48px] h-10 px-3 border text-[8px] tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer"
                      style={{
                        ...mono,
                        borderColor: isSelected ? 'rgba(0,0,0,0.50)' : inStock ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.06)',
                        color:       isSelected ? 'rgba(0,0,0,0.80)' : inStock ? 'rgba(0,0,0,0.40)' : 'rgba(0,0,0,0.18)',
                        background:  isSelected ? 'rgba(0,0,0,0.04)' : 'transparent',
                        cursor: inStock ? 'pointer' : 'not-allowed',
                        textDecoration: inStock ? 'none' : 'line-through',
                      }}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex gap-3 mb-10">
              <div className="flex items-center" style={{ border: '1px solid rgba(0,0,0,0.10)' }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"
                  className="w-11 h-12 flex items-center justify-center transition-colors cursor-pointer hover:opacity-50"
                  style={{ color: 'rgba(0,0,0,0.40)' }}>−</button>
                <span className="w-8 text-center text-[9px] tracking-[0.2em]"
                  style={{ ...mono, color: 'rgba(0,0,0,0.55)' }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"
                  className="w-11 h-12 flex items-center justify-center transition-colors cursor-pointer hover:opacity-50"
                  style={{ color: 'rgba(0,0,0,0.40)' }}>+</button>
              </div>

              <button
                onClick={handleAddToCart}
                aria-label="Add to cart"
                className="flex-1 h-12 text-[9px] tracking-[0.45em] uppercase transition-all duration-500 cursor-pointer"
                style={{
                  ...mono,
                  background:  addedFeedback ? 'transparent' : '#111111',
                  color:       addedFeedback ? 'rgba(0,0,0,0.40)' : '#F5F3EE',
                  border:      addedFeedback ? '1px solid rgba(0,0,0,0.10)' : 'none',
                }}
              >
                {addedFeedback ? 'Added' : 'Add to Cart'}
              </button>
            </div>

            {/* Mobile sticky bar */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 backdrop-blur-sm px-6 py-4 flex gap-3"
              style={{ background: 'rgba(245,243,238,0.96)', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              <div className="flex items-center shrink-0" style={{ border: '1px solid rgba(0,0,0,0.10)' }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity"
                  className="w-10 h-11 flex items-center justify-center cursor-pointer hover:opacity-50"
                  style={{ color: 'rgba(0,0,0,0.40)' }}>−</button>
                <span className="w-7 text-center text-[9px] tracking-[0.2em]"
                  style={{ ...mono, color: 'rgba(0,0,0,0.55)' }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity"
                  className="w-10 h-11 flex items-center justify-center cursor-pointer hover:opacity-50"
                  style={{ color: 'rgba(0,0,0,0.40)' }}>+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-11 text-[9px] tracking-[0.4em] uppercase transition-all duration-500 cursor-pointer"
                style={{
                  ...mono,
                  background: addedFeedback ? 'transparent' : '#111111',
                  color:      addedFeedback ? 'rgba(0,0,0,0.40)' : '#F5F3EE',
                  border:     addedFeedback ? '1px solid rgba(0,0,0,0.10)' : 'none',
                }}
              >
                {addedFeedback ? 'Added' : 'Add to Cart'}
              </button>
            </div>

            {/* Accordion */}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              {accordionItems.map(({ id, label, content }) => (
                <div key={id} style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
                    aria-expanded={openAccordion === id}
                    className="w-full flex items-center justify-between py-5 cursor-pointer group"
                  >
                    <span style={{ ...mono, fontSize: '9px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.40)' }}
                      className="uppercase group-hover:opacity-70 transition-opacity duration-300">
                      {label}
                    </span>
                    <span
                      className="transition-transform duration-300"
                      style={{ color: 'rgba(0,0,0,0.28)', fontSize: '12px', transform: openAccordion === id ? 'rotate(45deg)' : 'none' }}
                      aria-hidden="true"
                    >+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.38)', lineHeight: '2' }}
                          className="pb-5">
                          {content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-32 mb-0" aria-labelledby="related-heading">
            <div className="mb-12">
              <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.5em', color: 'rgba(0,0,0,0.22)' }} className="uppercase mb-3">Continue</p>
              <h2 id="related-heading" style={{ ...mono, fontSize: '10px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.45)' }} className="uppercase">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-12">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="px-6 sm:px-12 py-8 mt-20 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.22em' }}>
          © 2026 TRUE VISION PROJECT
        </p>
        <a href="https://www.instagram.com/truevisionproject/" target="_blank" rel="noopener noreferrer"
          aria-label="Instagram" style={{ color: 'rgba(0,0,0,0.28)' }} className="hover:opacity-60 transition-opacity duration-400">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
          </svg>
        </a>
      </footer>
    </div>
  )
}
