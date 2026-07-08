import { Search, Heart, ShoppingBag, User, X } from 'lucide-react'

const navLinks = [
  { label: 'Erkaklar', to: 'category' },
  { label: 'Ayollar', to: 'category' },
  { label: 'Oyoq kiyim', to: 'category' },
  { label: 'Aksessuarlar', to: 'category' },
  { label: 'Brendlar', to: 'category' },
]

export default function Header({
  onNavigate,
  onOpenSearch,
  onOpenAccount,
  onOpenCart,
  onOpenWishlist,
  isAuthenticated = false,
  cartCount = 0,
  wishlistCount = 0,
  showBanner = true,
}) {
  return (
    <header className="sticky top-0 z-40 bg-neone-bg/95 backdrop-blur border-b border-neone-border">
      {showBanner && (
        <div className="flex items-center justify-center gap-2 bg-black text-white text-xs sm:text-sm py-2 px-4 relative">
          <span>🚚 Bepul yetkazib berish 300 000 so'm dan yuqori buyurtmalar uchun</span>
          <button className="absolute right-4 text-neone-muted hover:text-white focus-ring" aria-label="Yopish">
            <X size={16} />
          </button>
        </div>
      )}
      <div className="flex items-center justify-between gap-6 px-4 sm:px-8 py-4">
        <button onClick={() => onNavigate('home')} className="text-xl font-extrabold tracking-tight text-white focus-ring">
          NEONE
        </button>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neone-muted">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => onNavigate(l.to, l.label)}
              className="hover:text-white transition-colors focus-ring"
            >
              {l.label}
            </button>
          ))}
          <button onClick={() => onNavigate('sale')} className="text-neone-accent font-semibold hover:text-white transition-colors focus-ring">
            Aksiya
          </button>
        </nav>

        <div className="flex items-center gap-4 sm:gap-5 text-white">
          <button onClick={onOpenSearch} aria-label="Qidirish" className="hover:text-neone-accent transition-colors focus-ring">
            <Search size={20} />
          </button>
          <button onClick={onOpenWishlist} className="relative hover:text-neone-accent transition-colors focus-ring" aria-label="Sevimlilar">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neone-accent text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button onClick={onOpenCart} className="relative hover:text-neone-accent transition-colors focus-ring" aria-label="Savat">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-neone-accent text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenAccount}
            className={`hover:text-neone-accent transition-colors focus-ring ${isAuthenticated ? 'text-neone-accent' : ''}`}
            aria-label="Profil"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
