import { ChevronLeft, MapPin, Truck, Package, AlertTriangle } from 'lucide-react'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import OrderStatusTimeline from '../../components/orders/OrderStatusTimeline'
import { formatOrderDate } from '../../data/orders'
import { useOrders } from '../../context/OrderContext'

export default function OrderTracking({ orderId, onBack }) {
  const { getOrder } = useOrders()
  const order = getOrder(orderId)

  if (!order) return null

  const totalQty = order.items.reduce((s, i) => s + i.qty, 0)
  const firstItemName = order.items[0]?.product.name
  const extraCount = order.items.length - 1

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-1">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">Buyurtmani kuzatish</h1>
      </div>
      <p className="text-neone-muted text-sm mb-6 ml-8">
        #{order.id} \u00b7 {firstItemName}
        {extraCount > 0 ? ` va yana ${extraCount} ta mahsulot` : ''} ({totalQty} dona)
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="bg-neone-panel border border-neone-border rounded-2xl p-6">
          {order.status === 'cancelled' ? (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6">
              <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-neone-muted leading-relaxed">Bu buyurtma bekor qilingani sababli yetkazib berish kuzatuvi mavjud emas.</p>
            </div>
          ) : (
            <div className="flex items-start gap-3 bg-neone-card rounded-xl px-4 py-3 mb-6">
              <MapPin size={18} className="text-neone-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium">
                  {order.currentLocation || (order.status === 'delivered' ? 'Manzilga yetkazildi' : 'Tayyorlanmoqda')}
                </p>
                {order.estimatedDelivery && order.status !== 'delivered' && (
                  <p className="text-neone-muted text-xs mt-0.5">Taxminiy yetkazib berish sanasi: {formatOrderDate(order.estimatedDelivery)}</p>
                )}
                {order.deliveredAt && <p className="text-neone-muted text-xs mt-0.5">Yetkazilgan sana: {formatOrderDate(order.deliveredAt, true)}</p>}
              </div>
            </div>
          )}

          <OrderStatusTimeline order={order} variant="full" />
        </div>

        <aside className="bg-neone-panel border border-neone-border rounded-2xl p-5 h-fit">
          <h2 className="text-white font-bold mb-4">Yetkazib berish</h2>
          <div className="flex items-center gap-2 text-sm mb-3">
            <Truck size={16} className="text-neone-accent" />
            <span className="text-white">{order.delivery.name}</span>
          </div>
          {order.trackingNumber ? (
            <div className="text-sm text-neone-muted leading-relaxed">
              <p>
                Kuzatuv raqami: <span className="text-white">{order.trackingNumber}</span>
              </p>
              <p>
                Tashuvchi: <span className="text-white">{order.carrier}</span>
              </p>
            </div>
          ) : (
            <p className="text-neone-muted text-sm">Kuzatuv raqami hali mavjud emas.</p>
          )}
          <div className="border-t border-neone-border mt-4 pt-4 flex items-center gap-2 text-sm">
            <Package size={16} className="text-neone-accent" />
            <OrderStatusBadge status={order.status} />
          </div>
        </aside>
      </div>
    </main>
  )
}
