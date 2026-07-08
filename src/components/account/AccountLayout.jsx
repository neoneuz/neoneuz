import { ChevronLeft } from 'lucide-react'
import AccountSidebar from './AccountSidebar'

export default function AccountLayout({ title, active, onNavigate, onLogout, onBack, children }) {
  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">{title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <AccountSidebar active={active} onNavigate={onNavigate} onLogout={onLogout} />
        <div>{children}</div>
      </div>
    </main>
  )
}
