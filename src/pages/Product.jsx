import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronDown, Heart, ShoppingCart, Check, Star, Truck, RefreshCw, ShieldCheck } from 'lucide-react'
import { formatSom, products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const reviews = [
  { name: 'Asilbek R.', verified: true, rating: 5, date: '28.03.2024', color: 'Qora', size: 'L', text: "Sifat a'lo darajada! Matosi yumshoq, bichimi zo'r. Yuvilgandan keyin ham o'zgarmadi." },
  { name: 'Jasurbek M.', verified: true, rating: 4.8, date: '25.03.2024', color: 'Oq', size: 'XL', text: 'Juda yoqdi, oversize bichimi aynan istagandek. Yetkazib berish tez bo\u2018ldi.' },
  { name: 'Iroda T.', verified: true, rating: 5, date: '22.03.2024', color: 'Qora', size: 'M', text: "O'g'limga oldim, juda chiroyli turibdi. Rahmat!" },
]

const ratingBreakdown = [
  { stars: 5, count: 214 },
  { stars: 4, count: 24 },
  { stars: 3, count: 5 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
]

const COLOR_NAMES = {
  '#0b0b0c': 'Qora',
  '#f5f5f5': 'Oq',
  '#5c5c5c': 'Kul rang',
  '#c9b79c': 'Bej',
}

function colorLabel(hex) {
  return COLOR_NAMES[hex?.toLowerCase()] || hex
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-neone-border py-4">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between text-white text-sm font-medium focus-ring">
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3 text-neone-muted text-sm leading-relaxed">{children}</div>}
    </div>
  )
}

export default function Product({ product, onBack, onSelectProduct }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const [activeImg, setActiveImg] = useState(0)
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes[Math.min(2, product.sizes.length - 1)])
  const [justAdded, setJustAdded] = useState(false)
  const [adding, setAdding] = useState(false)

  const wished = isWishlisted(product.id)

  const gallery = [product.img, product.img, product.img, product.img, product.img]
  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  // Foydalanuvchi "O'xshash mahsulotlar"dan boshqa mahsulotga o'tsa,
  // avvalgi tanlovlar (rang/o'lcham/rasm) eskirib qolmasin — reset qilamiz.
  useEffect(() => {
    setActiveImg(0)
    setColor(product.colors[0])
    setSize(product.sizes[Math.min(2, product.sizes.length - 1)])
    setJustAdded(false)
  }, [product.id])

  useEffect(() => {
    if (!justAdded) return
    const t = setTimeout(() => setJustAdded(false), 1800)
    return () => clearTimeout(t)
  }, [justAdded])

  async function handleAddToCart() {
    setAdding(true)
    await addToCart(product, { color, size, qty: 1 })
    setAdding(false)
    setJustAdded(true)
  }

  function toggleWished() {
    toggleWishlist(product)
  }

  const discountPercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-2 text-neone-muted text-sm mb-4 sm:mb-6">
        <button onClick={onBack} className="hover:text-white focus-ring flex items-center gap-1">
          <ChevronLeft size={16} /> Bosh sahifa
        </button>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="text-white truncate">{product.fullName}</span>
      </div>

      {/* HERO — Desktop: 2 ustun (chapda rasm, o'ngda xarid bloki) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 lg:items-start">
        {/* LEFT: gallery */}
        <div>
          <div className="relative w-full rounded-2xl overflow-hidden bg-neone-panel aspect-[4/5] lg:aspect-auto lg:h-[70vh] lg:max-h-[680px] lg:min-h-[460px]">
            {product.tag && (
              <span className="absolute top-4 left-4 z-10 bg-neone-accent text-black text-xs font-semibold px-2.5 py-1 rounded-md">
                {product.tag}
              </span>
            )}
            <button
              onClick={toggleWished}
              aria-pressed={wished}
              aria-label={wished ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
              className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center transition-colors focus-ring ${
                wished ? 'text-neone-accent' : 'text-white hover:text-neone-accent'
              }`}
            >
              <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
            </button>
            <img
              src={gallery[activeImg]}
              alt={product.fullName}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
              {activeImg + 1}/{gallery.length}
            </span>
          </div>

          {/* Thumbnails — asosiy rasm ostida gorizontal qator (mobil + desktop) */}
          <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-1">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`${i + 1}-rasm`}
                aria-current={activeImg === i}
                className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 focus-ring ${
                  activeImg === i ? 'border-neone-accent' : 'border-neone-border'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: buy box — sticky, pastga scroll qilinganda ham ko'rinib turadi */}
        <div className="lg:sticky lg:top-28">
          <h1 className="text-white text-2xl sm:text-3xl font-bold leading-tight">{product.fullName}</h1>

          {product.badge && (
            <span className="inline-block mt-2 text-[11px] font-semibold bg-neone-accent text-black px-2 py-1 rounded-md">
              {product.badge}
            </span>
          )}

          <div className="flex items-center gap-2 mt-3 text-sm flex-wrap">
            <span className="flex items-center gap-1 text-neone-accent">
              <Star size={14} fill="currentColor" /> {product.rating}
            </span>
            <span className="text-neone-muted">({product.reviews} ta sharh)</span>
            <span className="text-neone-muted">SKU: {product.sku}</span>
          </div>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span className="text-white text-2xl sm:text-3xl font-bold">{formatSom(product.price)}</span>
            {product.oldPrice && <span className="text-neone-muted line-through">{formatSom(product.oldPrice)}</span>}
            {discountPercent !== null && (
              <span className="text-neone-accent text-xs font-semibold bg-neone-accent/10 px-2 py-1 rounded-md">
                -{discountPercent}%
              </span>
            )}
          </div>

          <div className="mt-5">
            <p className="text-white text-sm font-medium mb-2">
              Rang: <span className="text-neone-muted font-normal">{colorLabel(color)}</span>
            </p>
            <div className="flex items-center gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={colorLabel(c)}
                  aria-pressed={color === c}
                  className={`w-9 h-9 rounded-full border-2 focus-ring ${color === c ? 'border-neone-accent' : 'border-neone-border'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-white text-sm font-medium mb-2">Razmer: {size}</p>
              <button className="text-neone-muted text-xs underline hover:text-white focus-ring">
                O'lcham jadvali
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-[44px] px-3 py-2 rounded-lg border text-sm focus-ring ${
                    size === s ? 'border-neone-accent text-white' : 'border-neone-border text-neone-muted hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all focus-ring disabled:opacity-70 ${
                justAdded ? 'bg-white text-black' : 'bg-neone-accent text-black hover:brightness-95'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={18} /> Savatga qo'shildi
                </>
              ) : adding ? (
                "Qo'shilmoqda..."
              ) : (
                <>
                  <ShoppingCart size={18} /> Savatga qo'shish
                </>
              )}
            </button>
            <button
              onClick={toggleWished}
              aria-pressed={wished}
              aria-label={wished ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
              className={`w-[52px] h-[52px] shrink-0 flex items-center justify-center rounded-xl border transition-colors focus-ring ${
                wished ? 'border-neone-accent text-neone-accent' : 'border-neone-border text-white hover:border-neone-muted'
              }`}
            >
              <Heart size={20} fill={wished ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5 bg-neone-panel border border-neone-border rounded-xl p-3.5">
            <div className="flex items-start gap-2">
              <Truck size={16} className="text-neone-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-xs font-medium">Tez yetkazib berish</p>
                <p className="text-neone-muted text-[11px]">1-2 kun ichida</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Truck size={16} className="text-neone-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-xs font-medium">Bepul yetkazib berish</p>
                <p className="text-neone-muted text-[11px]">300 000 so'mdan yuqori</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <RefreshCw size={16} className="text-neone-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-xs font-medium">Oson qaytarish</p>
                <p className="text-neone-muted text-[11px]">14 kun ichida</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="text-neone-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-xs font-medium">100% original mahsulot</p>
                <p className="text-neone-muted text-[11px]">Sifat kafolati</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom grid: bestsellers left, description right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-12">
        <div>
          <h2 className="text-white font-bold mb-4">Ko'p sotilganlar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
            ))}
          </div>

          <div className="mt-10 bg-neone-panel border border-neone-border rounded-2xl p-6">
            <h2 className="text-white font-bold mb-4">Mijozlar sharhlari</h2>
            <div className="flex items-center gap-6 mb-6">
              <div>
                <p className="text-white text-4xl font-bold">{product.rating}</p>
                <div className="flex items-center gap-0.5 text-neone-accent mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.round(product.rating) ? 'currentColor' : 'none'} />
                  ))}
                </div>
                <p className="text-neone-muted text-xs mt-1">{product.reviews} ta sharh asosida</p>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2 text-xs text-neone-muted">
                    <span className="w-3">{r.stars}</span>
                    <div className="flex-1 h-1.5 bg-neone-card rounded-full overflow-hidden">
                      <div className="h-full bg-neone-accent" style={{ width: `${(r.count / 245) * 100}%` }} />
                    </div>
                    <span className="w-8 text-right">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {reviews.map((r, i) => (
                <div key={i} className={i !== 0 ? 'pt-5 border-t border-neone-border' : ''}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-neone-card" />
                      <div>
                        <p className="text-white text-sm font-medium">{r.name}</p>
                        <p className="text-neone-muted text-[11px]">Tasdiqlangan xaridor</p>
                      </div>
                    </div>
                    <span className="text-neone-muted text-xs">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neone-accent mt-2 text-xs">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} fill={j < Math.round(r.rating) ? 'currentColor' : 'none'} />
                    ))}
                    <span className="text-neone-muted ml-1">{r.rating}</span>
                  </div>
                  <p className="text-neone-muted text-sm mt-2">{r.text}</p>
                  <p className="text-neone-muted text-xs mt-1">Rang: {r.color} | Razmer: {r.size}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 border border-neone-border text-white text-sm py-2.5 rounded-lg hover:border-neone-muted focus-ring">
              Barcha sharhlarni ko'rish ({product.reviews})
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-white font-bold mb-2">Mahsulot haqida</h2>
          <Accordion title="Tavsif" defaultOpen>
            <p>{product.description}</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Material">
            <p>{product.material}</p>
          </Accordion>
          <Accordion title="Yetkazib berish">
            <p>Toshkent bo'ylab 1-2 kun ichida, viloyatlarga 3-5 kun ichida yetkazib beriladi.</p>
          </Accordion>
          <Accordion title="Qaytarish va almashtirish">
            <p>Mahsulotni 14 kun ichida hech qanday sabab ko'rsatmasdan qaytarishingiz mumkin.</p>
          </Accordion>
          <Accordion title={`Sharhlar (${product.reviews})`}>
            <p>Sharhlarni yuqoridagi bo'limda ko'rishingiz mumkin.</p>
          </Accordion>
        </div>
      </div>

      {/* Similar products */}
      <div className="mt-12">
        <h2 className="text-white font-bold mb-4">O'xshash mahsulotlar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {related.map((p) => (
            <ProductCard key={p.id + '-similar'} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      </div>
    </main>
  )
}
