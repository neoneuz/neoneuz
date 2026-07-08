import { Pencil, Lock, MapPin, Bell, Mail, Phone, Cake, User as UserIcon, Package } from 'lucide-react'
import AccountLayout from '../../components/account/AccountLayout'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext'
import { getStatusMeta } from '../../data/orders'

const genderLabels = { male: 'Erkak', female: 'Ayol', other: "Aytmayman" }

export default function Profile({ onNavigate, onLogout, onBack }) {
  const { user, addresses } = useAuth()
  const { orders } = useOrders()

  if (!user) return null

  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0]
  const latestOrder = orders[0] || null

  return (
    <AccountLayout title="Profil" active="profile" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      <div className="bg-neone-panel border border-neone-border rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-neone-card flex items-center justify-center text-neone-accent text-xl font-bold shrink-0">
            {user.firstName?.[0]?.toUpperCase()}
            {user.lastName?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-white text-lg font-bold truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-neone-muted text-sm truncate">{user.email}</p>
          </div>
          <button
            onClick={() => onNavigate('edit-profile')}
            className="ml-auto shrink-0 flex items-center gap-2 border border-neone-border text-white text-sm px-3.5 py-2 rounded-lg hover:border-neone-muted focus-ring"
          >
            <Pencil size={14} /> Tahrirlash
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-neone-border">
          <div className="flex items-start gap-3">
            <Mail size={16} className="text-neone-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-neone-muted text-xs">Email</p>
              <p className="text-white text-sm mt-0.5">{user.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={16} className="text-neone-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-neone-muted text-xs">Telefon raqam</p>
              <p className="text-white text-sm mt-0.5">{user.phone || 'Kiritilmagan'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Cake size={16} className="text-neone-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-neone-muted text-xs">Tug'ilgan sana</p>
              <p className="text-white text-sm mt-0.5">{user.birthday || 'Kiritilmagan'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <UserIcon size={16} className="text-neone-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-neone-muted text-xs">Jins</p>
              <p className="text-white text-sm mt-0.5">{genderLabels[user.gender] || 'Kiritilmagan'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <button
          onClick={() => onNavigate('orders')}
          className="text-left bg-neone-panel border border-neone-border rounded-2xl p-5 hover:border-neone-muted transition-colors focus-ring"
        >
          <Package size={18} className="text-neone-accent mb-3" />
          <p className="text-white text-sm font-medium">Buyurtmalarim</p>
          <p className="text-neone-muted text-xs mt-1">
            {latestOrder ? `So'nggi: #${latestOrder.id} \u00b7 ${getStatusMeta(latestOrder.status).label}` : "Hozircha buyurtma yo'q"}
          </p>
        </button>
        <button
          onClick={() => onNavigate('address-book')}
          className="text-left bg-neone-panel border border-neone-border rounded-2xl p-5 hover:border-neone-muted transition-colors focus-ring"
        >
          <MapPin size={18} className="text-neone-accent mb-3" />
          <p className="text-white text-sm font-medium">Manzillar kitobi</p>
          <p className="text-neone-muted text-xs mt-1">
            {defaultAddress
              ? `${defaultAddress.label}: ${defaultAddress.district}`
              : 'Hozircha manzil qo\u2018shilmagan'}
          </p>
        </button>
        <button
          onClick={() => onNavigate('change-password')}
          className="text-left bg-neone-panel border border-neone-border rounded-2xl p-5 hover:border-neone-muted transition-colors focus-ring"
        >
          <Lock size={18} className="text-neone-accent mb-3" />
          <p className="text-white text-sm font-medium">Parolni o'zgartirish</p>
          <p className="text-neone-muted text-xs mt-1">Hisobingiz xavfsizligini ta'minlang</p>
        </button>
        <button
          onClick={() => onNavigate('notification-settings')}
          className="text-left bg-neone-panel border border-neone-border rounded-2xl p-5 hover:border-neone-muted transition-colors focus-ring"
        >
          <Bell size={18} className="text-neone-accent mb-3" />
          <p className="text-white text-sm font-medium">Bildirishnoma sozlamalari</p>
          <p className="text-neone-muted text-xs mt-1">Email, SMS va push xabarlarni boshqaring</p>
        </button>
        <button
          onClick={() => onNavigate('account-settings')}
          className="text-left bg-neone-panel border border-neone-border rounded-2xl p-5 hover:border-neone-muted transition-colors focus-ring"
        >
          <UserIcon size={18} className="text-neone-accent mb-3" />
          <p className="text-white text-sm font-medium">Hisob sozlamalari</p>
          <p className="text-neone-muted text-xs mt-1">Til, valyuta va boshqa sozlamalar</p>
        </button>
      </div>
    </AccountLayout>
  )
}
