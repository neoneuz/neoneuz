import { ArrowRight, ChevronLeft, ChevronRight, Percent } from 'lucide-react'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home({ onSelectProduct, onNavigateCategory }) {
  return (
    <main>
      {/* Hero */}
      <section className="px-4 sm:px-8 pt-6">
        <div className="relative rounded-2xl overflow-hidden bg-neone-panel">
          <img
            src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1600&auto=format&fit=crop"
            alt="NEONE Collection"
            className="w-full h-[420px] sm:h-[520px] object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
          <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 max-w-md">
            <p className="text-neone-accent text-xs font-semibold tracking-widest mb-3">YANGI MAVSUM</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              NEONE
              <br />
              COLLECTION
            </h1>
            <p className="text-neone-muted mt-4 text-sm sm:text-base">Minimalizm, sifat va qulaylik – bir joyda.</p>
            <button
              onClick={() => onNavigateCategory('Erkaklar')}
              className="mt-6 inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-lg text-sm font-semibold hover:bg-neone-accent transition-colors focus-ring"
            >
              Kolleksiyani ko'rish <ArrowRight size={16} />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 sm:left-12 flex items-center gap-2 text-neone-muted text-xs">
            <span>01</span>
            <span className="w-10 h-px bg-neone-muted" />
            <span>03</span>
          </div>
          <div className="absolute bottom-6 right-6 hidden sm:flex gap-2">
            <button className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 focus-ring">
              <ChevronLeft size={16} />
            </button>
            <button className="w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 focus-ring">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="px-4 sm:px-8 mt-6">
        <div className="bg-neone-panel border border-neone-border rounded-2xl p-4 sm:p-5 flex flex-wrap items-center gap-3 sm:gap-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onNavigateCategory(c.name)}
              className="flex-1 min-w-[110px] flex flex-col items-center gap-2 py-2 rounded-xl hover:bg-neone-card transition-colors focus-ring"
            >
              <img src={c.img} alt={c.name} className="w-11 h-11 rounded-full object-cover" />
              <span className="text-white text-sm font-medium">{c.name}</span>
              <span className="text-neone-muted text-[11px]">{c.count}</span>
            </button>
          ))}
          <button className="flex-1 min-w-[110px] flex flex-col items-center gap-2 py-2 rounded-xl hover:bg-neone-card transition-colors focus-ring">
            <span className="w-11 h-11 rounded-full bg-neone-accent/20 text-neone-accent flex items-center justify-center">
              <Percent size={20} />
            </span>
            <span className="text-white text-sm font-medium">Aksiya</span>
            <span className="text-neone-muted text-[11px]">Barcha chegirmalar</span>
          </button>
        </div>
      </section>

      {/* Trend products */}
      <section className="px-4 sm:px-8 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-bold tracking-wide">TREND MAHSULOTLAR</h2>
          <button className="flex items-center gap-1 text-neone-muted text-sm hover:text-white focus-ring">
            Barchasini ko'rish <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.slice(0, 5).map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      </section>

      {/* NEONE Club banner */}
      <section className="px-4 sm:px-8 mt-10">
        <div className="bg-neone-panel border border-neone-border rounded-2xl overflow-hidden flex flex-col sm:flex-row items-center">
          <div className="p-8 sm:p-10 flex-1">
            <p className="text-neone-accent text-xs font-semibold tracking-widest mb-2">NEONE CLUB</p>
            <h3 className="text-white text-2xl font-bold max-w-sm">
              Maxsus chegirmalar va erta kirish imkoniyati
            </h3>
            <button className="mt-6 border border-white text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-colors focus-ring">
              Batafsil
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=500&auto=format&fit=crop"
            alt="NEONE Club"
            className="w-full sm:w-80 h-56 sm:h-64 object-cover"
          />
        </div>
      </section>
    </main>
  )
}
