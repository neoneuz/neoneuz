import { Heart } from 'lucide-react'
import { formatSom } from '../data/products'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product, onSelect }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wished = isWishlisted(product.id)

  return (
    <button
      onClick={() => onSelect(product)}
      className="text-left group bg-neone-panel border border-neone-border rounded-xl overflow-hidden hover:border-neone-muted transition-colors focus-ring"
    >
      <div className="relative aspect-[3/4] bg-neone-card overflow-hidden">
        {(product.tag || product.badge) && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold px-2 py-1 rounded-md ${
              product.tag === '-20%' ? 'bg-red-500 text-white' : 'bg-neone-accent text-black'
            }`}
          >
            {product.tag || product.badge}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product)
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center focus-ring ${
            wished ? 'text-neone-accent' : 'text-white hover:text-neone-accent'
          }`}
          aria-label={wished ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
          aria-pressed={wished}
        >
          <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
        </button>
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-white font-medium text-sm">{product.name}</p>
        <p className="text-neone-muted text-xs mt-0.5">{product.category}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-white font-semibold text-sm">{formatSom(product.price)}</span>
          {product.oldPrice && (
            <span className="text-neone-muted text-xs line-through">{formatSom(product.oldPrice)}</span>
          )}
        </div>
        {product.colors?.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((c) => (
              <span key={c} className="w-3.5 h-3.5 rounded-full border border-neone-border" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
      </div>
    </button>
  )
}
