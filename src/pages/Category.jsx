import { useState } from 'react'
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { menSubcategories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Category({ categoryName = 'Erkaklar', onSelectProduct, onBack }) {
  const [activeSub, setActiveSub] = useState(null)
  const [sortOpen, setSortOpen] = useState(false)

  const filtered = activeSub ? products.filter((p) => p.category === activeSub) : products

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">{categoryName}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="bg-neone-panel border border-neone-border rounded-2xl p-3 h-fit">
          <button
            onClick={() => setActiveSub(null)}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm mb-1 focus-ring ${
              !activeSub ? 'bg-neone-card text-white' : 'text-neone-muted hover:text-white'
            }`}
          >
            <span>Barchasi</span>
            <ChevronRight size={16} />
          </button>
          {menSubcategories.map((s) => (
            <button
              key={s.name}
              onClick={() => setActiveSub(s.name)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm mb-1 focus-ring ${
                activeSub === s.name ? 'bg-neone-card text-white' : 'text-neone-muted hover:text-white'
              }`}
            >
              <span className="flex flex-col items-start">
                <span className="font-medium">{s.name}</span>
                <span className="text-[11px] text-neone-muted">{s.count}</span>
              </span>
              <ChevronRight size={16} />
            </button>
          ))}
        </aside>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-neone-muted text-sm">{filtered.length} mahsulot</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 border border-neone-border rounded-lg px-3 py-2 text-sm text-white hover:border-neone-muted focus-ring">
                <SlidersHorizontal size={14} /> Filtr
              </button>
              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="border border-neone-border rounded-lg px-3 py-2 text-sm text-white hover:border-neone-muted focus-ring"
                >
                  Saralash
                </button>
                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-neone-panel border border-neone-border rounded-xl p-2 z-10">
                    {['Mashhurlik bo\u2018yicha', 'Narx: arzon dan qimmatga', 'Narx: qimmat dan arzonga', 'Yangi kelganlar', 'Eng yuqori reyting'].map(
                      (o) => (
                        <button
                          key={o}
                          onClick={() => setSortOpen(false)}
                          className="w-full text-left text-sm text-neone-muted hover:text-white px-3 py-2 rounded-lg focus-ring"
                        >
                          {o}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
            ))}
            {filtered.length === 0 && <p className="text-neone-muted text-sm">Bu kategoriyada mahsulot topilmadi.</p>}
          </div>
        </div>
      </div>
    </main>
  )
}
