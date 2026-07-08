import { User, Pencil, Lock, Settings, MapPin, Bell, LogOut, ChevronRight, Package } from 'lucide-react'

const links = [
  { key: 'profile', label: 'Profil', icon: User },
  { key: 'orders', label: 'Buyurtmalarim', icon: Package },
  { key: 'edit-profile', label: 'Profilni tahrirlash', icon: Pencil },
  { key: 'change-password', label: 'Parolni o\u2018zgartirish', icon: Lock },
  { key: 'address-book', label: 'Manzillar kitobi', icon: MapPin },
  { key: 'notification-settings', label: 'Bildirishnomalar', icon: Bell },
  { key: 'account-settings', label: 'Hisob sozlamalari', icon: Settings },
]

export default function AccountSidebar({ active, onNavigate, onLogout }) {
  return (
    <aside className="bg-neone-panel border border-neone-border rounded-2xl p-3 h-fit">
      {links.map((l) => (
        <button
          key={l.key}
          onClick={() => onNavigate(l.key)}
          className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm mb-1 focus-ring ${
            active === l.key ? 'bg-neone-card text-white' : 'text-neone-muted hover:text-white'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <l.icon size={16} />
            {l.label}
          </span>
          <ChevronRight size={14} />
        </button>
      ))}
      <div className="border-t border-neone-border mt-2 pt-2">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-neone-card hover:text-red-300 focus-ring"
        >
          <LogOut size={16} /> Chiqish
        </button>
      </div>
    </aside>
  )
}
