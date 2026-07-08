import { ChevronLeft } from 'lucide-react'

export default function AuthLayout({ title, subtitle, onBack, children, footer }) {
  return (
    <main className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-1 text-neone-muted hover:text-white text-sm mb-6 focus-ring">
          <ChevronLeft size={16} /> Bosh sahifa
        </button>

        <div className="bg-neone-panel border border-neone-border rounded-2xl p-6 sm:p-8">
          <p className="text-neone-accent text-xs font-semibold tracking-widest mb-2">NEONE</p>
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-neone-muted text-sm mt-2">{subtitle}</p>}

          <div className="mt-6">{children}</div>
        </div>

        {footer && <div className="mt-5 text-center text-sm text-neone-muted">{footer}</div>}
      </div>
    </main>
  )
}
