import { useState } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'
import { products, formatSom } from '../data/products'

const popularSearches = ['Oversize futbolka', 'Hoodie', 'Nike Air Max', 'Shim', 'Kurtka', 'Adidas samba', 'Zara']
const searchCategories = ['Erkaklar', 'Ayollar', 'Oyoq kiyim', 'Aksessuarlar', 'Brendlar', 'Aksiya']
const searchBrands = ['Nike', 'Adidas', 'Zara', 'Puma', 'The North Face', 'New Balance']

export default function SearchOverlay({ onClose, onSelectProduct }) {
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    : products.slice(0, 4)

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-neone-bg border-b border-neone-border max-w-6xl mx-auto mt-0 sm:mt-6 sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neone-border">
          <Search size={18} className="text-neone-muted" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish"
            className="flex-1 bg-transparent text-white placeholder:text-neone-muted outline-none text-sm"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-neone-muted hover:text-white focus-ring">
              <X size={16} />
            </button>
          )}
          <button onClick={onClose} className="ml-2 text-neone-muted hover:text-white text-sm focus-ring">
            Bekor qilish
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-5 max-h-[70vh] overflow-y-auto">
          <div>
            <p className="text-neone-muted text-xs font-semibold mb-3 uppercase tracking-wide">Mashhur qidiruvlar</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3 py-1.5 rounded-full bg-neone-panel border border-neone-border text-xs text-white hover:border-neone-accent focus-ring"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-neone-muted text-xs font-semibold mb-3 uppercase tracking-wide">Mahsulotlar</p>
            <div className="flex flex-col gap-3">
              {results.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="flex items-center gap-3 text-left hover:bg-neone-panel rounded-lg p-1.5 -mx-1.5 focus-ring"
                >
                  <img src={p.img} alt={p.name} className="w-10 h-10 rounded-md object-cover bg-neone-card" />
                  <div>
                    <p className="text-white text-sm">{p.name}</p>
                    <p className="text-neone-muted text-xs">{formatSom(p.price)}</p>
                  </div>
                </button>
              ))}
              {results.length === 0 && <p className="text-neone-muted text-sm">Hech narsa topilmadi</p>}
            </div>
          </div>

          <div>
            <p className="text-neone-muted text-xs font-semibold mb-3 uppercase tracking-wide">Kategoriyalar</p>
            <div className="flex flex-col gap-3">
              {searchCategories.map((c) => (
                <button key={c} className="flex items-center gap-3 text-left text-white text-sm hover:text-neone-accent focus-ring">
                  <span className="w-8 h-8 rounded-full bg-neone-panel border border-neone-border" />
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-neone-muted text-xs font-semibold mb-3 uppercase tracking-wide">Brendlar</p>
            <div className="flex flex-col gap-3">
              {searchBrands.map((b) => (
                <button key={b} className="text-left text-white text-sm hover:text-neone-accent focus-ring">
                  {b}
                </button>
              ))}
              <button className="flex items-center gap-1 text-neone-accent text-sm font-medium focus-ring">
                Barchasini ko'rish <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
