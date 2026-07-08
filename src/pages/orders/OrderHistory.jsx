import { useState } from 'react'
import { PackageSearch } from 'lucide-react'
import AccountLayout from '../../components/account/AccountLayout'
import EmptyState from '../../components/EmptyState'
import OrderCard from '../../components/orders/OrderCard'
import { useOrders } from '../../context/OrderContext'

const FILTERS = [
  { key: 'all', label: 'Barchasi' },
  { key: 'processing', label: 'Jarayonda' },
  { key: 'shipped', label: "Jo'natildi" },
  { key: 'delivered', label: 'Yetkazildi' },
  { key: 'cancelled', label: 'Bekor qilingan' },
]

function matchesFilter(order, filter) {
  if (filter === 'all') return true
  if (filter === 'processing') return order.status === 'processing' || order.status === 'confirmed'
  return order.status === filter
}

export default function OrderHistory({ onNavigate, onLogout, onBack, onSelectOrder, onTrackOrder, onGoShopping }) {
  const { orders } = useOrders()
  const [filter, setFilter] = useState('all')

  const filtered = orders.filter((o) => matchesFilter(o, filter))

  return (
    <AccountLayout title="Buyurtmalarim" active="orders" onNavigate={onNavigate} onLogout={onLogout} onBack={onBack}>
      {orders.length === 0 ? (
        <EmptyState
          icon={PackageSearch}
          title="Hozircha buyurtmalar yo'q"
          message="Birinchi xaridingizni amalga oshiring \u2014 u shu yerda ko'rinadi"
          ctaLabel="Xarid qilishni boshlash"
          onCta={onGoShopping}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`shrink-0 px-4 py-2 rounded-lg border text-sm focus-ring ${
                  filter === f.key ? 'border-neone-accent text-white bg-neone-card' : 'border-neone-border text-neone-muted hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-neone-muted text-sm">Bu bo'limda buyurtmalar topilmadi.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((order) => (
                <OrderCard key={order.id} order={order} onViewDetails={onSelectOrder} onTrack={onTrackOrder} />
              ))}
            </div>
          )}
        </>
      )}
    </AccountLayout>
  )
}
