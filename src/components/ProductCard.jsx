import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

const mono = { fontFamily: "'Space Mono', monospace" }

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart()
  const lowStock = Object.values(product.stock).reduce((a, b) => a + b, 0) < 8

  const handleQuickAdd = (e) => {
    e.preventDefault()
    const defaultSize  = product.sizes[Math.floor(product.sizes.length / 2)]
    const defaultColor = product.colors[0].name
    const imgSrc       = product.images[0] || null
    dispatch({
      type: 'ADD',
      item: { id: product.id, name: product.name, price: product.price, size: defaultSize, color: defaultColor, imgSrc, qty: 1 },
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.id}`} className="group block" aria-label={`${product.name} — €${product.price}`}>
        {/* Image */}
        <div className="relative w-full aspect-[3/4] bg-[#E8E6E1] overflow-hidden mb-5"
          style={{ filter: 'saturate(0.16) brightness(0.96)' }}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width="600"
              height="800"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.18)' }} className="uppercase">
                Coming Soon
              </span>
            </div>
          )}

          {lowStock && product.image && (
            <span className="absolute top-4 left-4"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.45)' }}>
              Low Stock
            </span>
          )}

          {/* Quick add on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button
              onClick={handleQuickAdd}
              aria-label={`Quick add ${product.name} to cart`}
              className="w-full py-4 bg-[#111111] text-[#F5F3EE] text-[9px] tracking-[0.4em] uppercase font-medium hover:bg-[#2a2a2a] transition-colors duration-300 cursor-pointer"
              style={mono}
            >
              Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p style={{ ...mono, fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.72)' }}
              className="uppercase leading-relaxed group-hover:opacity-100 transition-opacity duration-300">
              {product.name}
            </p>
            <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.30)' }}
              className="uppercase mt-1">
              {product.category}
            </p>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.65)', fontWeight: 300 }}
            className="shrink-0">
            €{product.price}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
