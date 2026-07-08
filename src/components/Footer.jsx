import { Truck, RefreshCw, ShieldCheck, CreditCard } from 'lucide-react'
import { brands } from '../data/products'

const perks = [
  { icon: Truck, title: 'Tez yetkazib berish', desc: '1-2 kun ichida' },
  { icon: RefreshCw, title: 'Oson qaytarish', desc: '14 kun ichida' },
  { icon: ShieldCheck, title: 'Original mahsulot', desc: "100% sifat kafolati" },
  { icon: CreditCard, title: 'Xavfsiz to\u2018lov', desc: 'Barcha to\u2018lov turlari' },
]

export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="mx-4 sm:mx-8 mb-10 bg-neone-panel border border-neone-border rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8">
        {perks.map((p) => (
          <div key={p.title} className="flex items-start gap-3">
            <p.icon className="text-neone-accent shrink-0" size={22} />
            <div>
              <p className="text-white text-sm font-medium">{p.title}</p>
              <p className="text-neone-muted text-xs mt-0.5">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-8 border-t border-neone-border text-neone-muted text-sm font-semibold tracking-wide">
        {brands.map((b) => (
          <span key={b} className="opacity-70 hover:opacity-100 transition-opacity">
            {b}
          </span>
        ))}
      </div>

      <div className="px-4 sm:px-8 py-8 border-t border-neone-border text-neone-muted text-xs text-center">
        © {new Date().getFullYear()} NEONE. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  )
}
