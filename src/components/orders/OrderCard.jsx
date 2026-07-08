import { useState } from 'react'
import { ChevronRight, Package } from 'lucide-react'
import OrderStatusBadge from './OrderStatusBadge'
import ReorderButton from './ReorderButton'
import CancelOrderModal from './CancelOrderModal'
import { formatSom } from '../../data/products'
import { formatOrderDate, canCancelOrder, isOrderTrackable } from '../../data/orders'
import { useOrders } from '../../context/OrderContext'

export default function OrderCard({ order, onViewDetails, onTrack }) {
  const { cancelOrder } = useOrders()
  const [cancelOpen, setCancelOpen] = useState(false)

  const totalQty = order.items.reduce((s, i) => s + i.qty, 0)
  const preview = order.items.slice(0, 3)
  const extraCount = order.items.length - preview.length

  async function handleConfirmCancel(reason) {
    await cancelOrder(order.id, reason)
    setCancelOpen(false)
  }

  return (
    <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">#{order.id}</span>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-neone-muted text-xs mt-1">
            {formatOrderDate(order.createdAt)} \u00b7 {totalQty} dona
          </p>
        </div>
        <span className="text-white font-bold">{formatSom(order.total)}</span>
      </div>

      <div className="flex items-center gap-2 mt-4">
        {preview.map((item) => (
          <img key={item.id} src={item.product.img} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover bg-neone-card shrink-0" />
        ))}
        {extraCount > 0 && (
          <span className="w-14 h-14 rounded-lg bg-neone-card flex items-center justify-center text-neone-muted text-xs font-medium shrink-0">
            +{extraCount}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <button
          onClick={() => onViewDetails(order.id)}
          className="flex items-center gap-1 border border-neone-border text-white text-sm px-4 py-2.5 rounded-lg hover:border-neone-muted focus-ring"
        >
          Batafsil <ChevronRight size={14} />
        </button>
        {isOrderTrackable(order) && (
          <button
            onClick={() => onTrack(order.id)}
            className="flex items-center gap-1.5 border border-neone-border text-white text-sm px-4 py-2.5 rounded-lg hover:border-neone-muted focus-ring"
          >
            <Package size={14} /> Kuzatish
          </button>
        )}
        <ReorderButton items={order.items} size="sm" fullWidth={false} />
        {canCancelOrder(order) && (
          <button
            onClick={() => setCancelOpen(true)}
            className="ml-auto flex items-center gap-1.5 border border-red-500/40 text-red-400 text-sm px-4 py-2.5 rounded-lg hover:bg-red-500/10 focus-ring"
          >
            Bekor qilish
          </button>
        )}
      </div>

      {cancelOpen && <CancelOrderModal order={order} onClose={() => setCancelOpen(false)} onConfirm={handleConfirmCancel} />}
    </div>
  )
}
