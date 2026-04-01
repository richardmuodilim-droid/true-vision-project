import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, index = 0 }) {
  const { dispatch } = useCart()

  const lowStock = Object.values(product.stock).reduce((a, b) => a + b, 0) < 8

  const handleQuickAdd = (e) => {
    e.preventDefault()
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)]
    const defaultColor = product.colors[0].name
    dispatch({
      type: 'ADD',
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        size: defaultSize,
        color: defaultColor,
        qty: 1,
      },
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block"
        aria-label={`${product.name} — $${product.price}`}
      >
        {/* Image */}
        <div className="relative w-full aspect-[3/4] bg-[#0d0d0d] overflow-hidden mb-5">
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
              <span className="text-[8px] tracking-[0.4em] text-white/10 uppercase">
                Image
              </span>
            </div>
          )}

          {/* Low stock badge */}
          {lowStock && (
            <span className="absolute top-4 left-4 text-[8px] tracking-[0.3em] text-white/50 uppercase">
              Low Stock
            </span>
          )}

          {/* Quick add — appears on hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button
              onClick={handleQuickAdd}
              aria-label={`Quick add ${product.name} to cart`}
              className="w-full py-4 bg-white text-black text-[9px] tracking-[0.4em] uppercase font-medium hover:bg-white/90 transition-colors duration-300 cursor-pointer"
            >
              Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-white/80 uppercase leading-relaxed group-hover:text-white transition-colors duration-300">
              {product.name}
            </p>
            <p className="text-[9px] tracking-[0.2em] text-white/25 uppercase mt-1">
              {product.category}
            </p>
          </div>
          <p className="text-[10px] tracking-[0.2em] text-white/60 shrink-0">
            ${product.price}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}
