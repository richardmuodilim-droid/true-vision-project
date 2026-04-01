import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getProduct, products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

export default function Product({ onCartOpen }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [openAccordion, setOpenAccordion] = useState(null)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  const { dispatch } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center flex flex-col gap-6">
          <p className="text-[9px] tracking-[0.4em] text-white/30 uppercase">Product not found</p>
          <Link to="/" className="text-[9px] tracking-[0.35em] text-white/20 uppercase border-b border-white/10 pb-px">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0)
  const lowStock = totalStock < 8

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      setTimeout(() => setSizeError(false), 2000)
      return
    }
    dispatch({
      type: 'ADD',
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor || product.colors[0].name,
        qty,
      },
    })
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
    onCartOpen()
  }

  const accordionItems = [
    { id: 'material', label: 'Material', content: product.material },
    { id: 'care', label: 'Care', content: product.care },
    { id: 'fit', label: 'Fit', content: product.fit },
  ]

  return (
    <div className="bg-[#000000] min-h-screen text-white">
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
                  <Link
                    to={crumb.to}
                    className="text-[8px] tracking-[0.3em] text-white/25 uppercase hover:text-white/50 transition-colors duration-300"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[8px] tracking-[0.3em] text-white/50 uppercase">
                    {crumb.label}
                  </span>
                )}
                {i < arr.length - 1 && (
                  <span className="text-white/15 text-[9px]" aria-hidden="true">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Images */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="relative w-full aspect-[4/5] bg-[#0d0d0d] overflow-hidden">
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
                  <span className="text-[8px] tracking-[0.4em] text-white/10 uppercase">
                    Image {activeImage + 1}
                  </span>
                </div>
              )}

              {lowStock && (
                <div className="absolute top-5 left-5">
                  <span className="text-[7px] tracking-[0.35em] text-white/40 uppercase">
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
                  className={`w-16 h-20 bg-[#0d0d0d] flex items-center justify-center border transition-colors duration-300 cursor-pointer ${
                    activeImage === i ? 'border-white/30' : 'border-transparent hover:border-white/10'
                  }`}
                >
                  {img ? (
                    <img src={img} alt="" loading="lazy" width="64" height="80" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[6px] tracking-[0.3em] text-white/10 uppercase">{i + 1}</span>
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
                <h1 className="text-[11px] sm:text-[13px] tracking-[0.4em] text-white/85 uppercase font-light leading-relaxed">
                  {product.name}
                </h1>
                <p className="text-[8px] tracking-[0.3em] text-white/25 uppercase mt-2">
                  {product.category}
                </p>
              </div>
              <p className="text-[13px] tracking-[0.15em] text-white/60 shrink-0">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p className="text-[9px] tracking-[0.15em] text-white/35 leading-loose mb-10 max-w-sm">
              {product.description}
            </p>

            {/* Color swatches */}
            {product.colors.length > 1 && (
              <div className="mb-8">
                <p className="text-[8px] tracking-[0.4em] text-white/25 uppercase mb-4">
                  Color — {selectedColor || product.colors[0].name}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={c.name}
                      aria-pressed={selectedColor === c.name}
                      className={`w-6 h-6 rounded-full border-2 transition-colors duration-300 cursor-pointer ${
                        (selectedColor || product.colors[0].name) === c.name
                          ? 'border-white/60'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <p className={`text-[8px] tracking-[0.4em] uppercase transition-colors duration-300 ${sizeError ? 'text-red-400/60' : 'text-white/25'}`}>
                  {sizeError ? 'Select a size' : 'Size'}
                </p>
                <button className="text-[7px] tracking-[0.3em] text-white/20 uppercase hover:text-white/40 transition-colors duration-300 border-b border-white/10 pb-px cursor-pointer">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const inStock = (product.stock[size] || 0) > 0
                  return (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false) }}
                      disabled={!inStock}
                      aria-label={`Size ${size}${!inStock ? ' — out of stock' : ''}`}
                      aria-pressed={selectedSize === size}
                      className={`
                        min-w-[48px] h-10 px-3 border text-[8px] tracking-[0.25em] uppercase
                        transition-all duration-300 cursor-pointer
                        ${selectedSize === size
                          ? 'border-white/50 text-white/80 bg-white/5'
                          : inStock
                            ? 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/55'
                            : 'border-white/[0.05] text-white/15 cursor-not-allowed line-through'
                        }
                      `}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div className="flex gap-3 mb-10">
              {/* Qty */}
              <div className="flex items-center border border-white/[0.1]">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-12 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                >
                  −
                </button>
                <span className="w-8 text-center text-[9px] tracking-[0.2em] text-white/50">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-12 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                aria-label="Add to cart"
                className={`
                  flex-1 h-12 text-[9px] tracking-[0.45em] uppercase
                  transition-all duration-500 cursor-pointer
                  ${addedFeedback
                    ? 'bg-white/10 text-white/50 border border-white/10'
                    : 'bg-white text-black hover:bg-white/90'
                  }
                `}
              >
                {addedFeedback ? 'Added' : 'Add to Cart'}
              </button>
            </div>

            {/* Sticky mobile bar */}
            <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-black/95 backdrop-blur-sm border-t border-white/[0.06] px-6 py-4 flex gap-3">
              <div className="flex items-center border border-white/[0.1] shrink-0">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-10 h-11 flex items-center justify-center text-white/30 hover:text-white/70 cursor-pointer">−</button>
                <span className="w-7 text-center text-[9px] tracking-[0.2em] text-white/50">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="w-10 h-11 flex items-center justify-center text-white/30 hover:text-white/70 cursor-pointer">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-11 text-[9px] tracking-[0.4em] uppercase transition-all duration-500 cursor-pointer ${addedFeedback ? 'bg-white/10 text-white/40 border border-white/10' : 'bg-white text-black'}`}
              >
                {addedFeedback ? 'Added' : 'Add to Cart'}
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t border-white/[0.05]">
              {accordionItems.map(({ id, label, content }) => (
                <div key={id} className="border-b border-white/[0.05]">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === id ? null : id)}
                    aria-expanded={openAccordion === id}
                    className="w-full flex items-center justify-between py-5 cursor-pointer group"
                  >
                    <span className="text-[9px] tracking-[0.4em] text-white/40 uppercase group-hover:text-white/60 transition-colors duration-300">
                      {label}
                    </span>
                    <span
                      className={`text-white/20 text-[10px] transition-transform duration-300 ${
                        openAccordion === id ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
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
                        <p className="pb-5 text-[8px] tracking-[0.15em] text-white/25 leading-loose">
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
              <p className="text-[7px] tracking-[0.5em] text-white/15 uppercase mb-3">Continue</p>
              <h2 id="related-heading" className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
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

      <Footer />
    </div>
  )
}
