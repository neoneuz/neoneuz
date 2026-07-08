import { useState } from 'react'
import { ChevronLeft, MapPin, Truck, CreditCard, FileText, Package, AlertTriangle } from 'lucide-react'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import OrderStatusTimeline from '../../components/orders/OrderStatusTimeline'
import OrderItemsList from '../../components/orders/OrderItemsList'
import ReorderButton from '../../components/orders/ReorderButton'
import CancelOrderModal from '../../components/orders/CancelOrderModal'
import OrderRecap from '../../components/checkout/OrderRecap'
import { formatOrderDate, canCancelOrder, isOrderTrackable } from '../../data/orders'
import { useOrders } from '../../context/OrderContext'

export default function OrderDetails({ orderId, onBack, onTrack, onInvoice }) {
  const { getOrder, cancelOrder } = useOrders()
  const [cancelOpen, setCancelOpen] = useState(false)
  const order = getOrder(orderId)

  if (!order) return null

  async function handleConfirmCancel(reason) {
    await cancelOrder(order.id, reason)
    setCancelOpen(false)
  }

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-1">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">Buyurtma #{order.id}</h1>
      </div>
      <div className="flex items-center gap-2 mb-6 ml-8 flex-wrap">
        <OrderStatusBadge status={order.status} />
        <span className="text-neone-muted text-sm">{formatOrderDate(order.createdAt, true)} da berilgan</span>
      </div>

      <div className="bg-neone-panel border border-neone-border rounded-2xl p-5 mb-6">
        <OrderStatusTimeline order={order} variant="compact" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <ReorderButton items={order.items} fullWidth={false} />
            <button
              onClick={() => onInvoice(order.id)}
              className="flex items-center gap-2 border border-neone-border text-white text-sm px-4 py-3 rounded-xl hover:border-neone-muted focus-ring"
            >
              <FileText size={16} /> Hisob-faktura
            </button>
            {isOrderTrackable(order) && (
              <button
                onClick={() => onTrack(order.id)}
                className="flex items-center gap-2 border border-neone-border text-white text-sm px-4 py-3 rounded-xl hover:border-neone-muted focus-ring"
              >
                <Package size={16} /> Kuzatish
              </button>
            )}
            {canCancelOrder(order) && (
              <button
                onClick={() => setCancelOpen(true)}
                className="flex items-center gap-2 border border-red-500/40 text-red-400 text-sm px-4 py-3 rounded-xl hover:bg-red-500/10 focus-ring"
              >
                Buyurtmani bekor qilish
              </button>
            )}
          </div>

          {order.status === 'cancelled' && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-neone-muted leading-relaxed">
                Bu buyurtma bekor qilingan{order.cancelReason ? ` \u2014 sabab: ${order.cancelReason}` : ''}.
              </p>
            </div>
          )}

          <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3 text-white font-semibold text-sm">
              <MapPin size={16} className="text-neone-accent" /> Yetkazib berish manzili
            </div>
            <div className="text-sm text-neone-muted leading-relaxed">
              <p className="text-white">
                {order.address.fullName} \u00b7 {order.address.phone}
              </p>
              <p>
                {order.address.street}
                {order.address.apartment ? `, ${order.address.apartment}` : ''}
              </p>
              <p>
                {order.address.district}, {order.address.region}
              </p>
            </div>
          </div>

          <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Truck size={16} className="text-neone-accent" /> {order.delivery.name}
              </div>
              <span className="text-neone-muted">{order.delivery.eta}</span>
            </div>
            {order.trackingNumber && (
              <p className="text-neone-muted text-xs mt-3 pt-3 border-t border-neone-border">
                Kuzatuv raqami: <span className="text-white">{order.trackingNumber}</span> \u00b7 {order.carrier}
              </p>
            )}
          </div>

          <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold text-sm">
              <CreditCard size={16} className="text-neone-accent" /> To'lov usuli: {order.paymentMethodName}
            </div>
            <OrderItemsList items={order.items} />
          </div>
        </div>

        <OrderRecap items={order.items} subtotal={order.subtotal} deliveryFee={order.deliveryFee} />
      </div>

      {cancelOpen && <CancelOrderModal order={order} onClose={() => setCancelOpen(false)} onConfirm={handleConfirmCancel} />}
    </main>
  )
}
