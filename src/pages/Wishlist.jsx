import { ChevronLeft, Heart } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist({ onBack, onSelectProduct }) {
  const { items } = useWishlist()

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">Sevimlilar</h1>
        {items.length > 0 && <span className="text-neone-muted text-sm">({items.length} ta mahsulot)</span>}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Sevimlilar ro'yxati bo'sh"
          message="Yoqtirgan mahsulotlaringizni yurak belgisi orqali shu yerga qo'shing"
          ctaLabel="Xarid qilishni boshlash"
          onCta={onBack}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </main>
  )
}
