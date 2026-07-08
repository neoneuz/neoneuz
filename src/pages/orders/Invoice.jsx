import { ChevronLeft, Printer } from 'lucide-react'
import { formatSom } from '../../data/products'
import { formatOrderDate } from '../../data/orders'
import { useOrders } from '../../context/OrderContext'

export default function Invoice({ orderId, onBack }) {
  const { getOrder } = useOrders()
  const order = getOrder(orderId)

  if (!order) return null

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-white text-xl font-bold">Hisob-faktura</h1>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-neone-accent text-black text-sm font-semibold px-4 py-2.5 rounded-lg hover:brightness-95 focus-ring"
        >
          <Printer size={16} /> Chop etish
        </button>
      </div>

      <div className="bg-neone-panel border border-neone-border rounded-2xl p-6 sm:p-10 max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-neone-border flex-wrap">
          <div>
            <p className="text-white text-2xl font-extrabold tracking-tight">NEONE</p>
            <p className="text-neone-muted text-xs mt-1">hisob-faktura / invoice</p>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">#{order.id}</p>
            <p className="text-neone-muted text-xs mt-1">{formatOrderDate(order.createdAt, true)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-neone-border">
          <div>
            <p className="text-neone-muted text-xs uppercase tracking-wide mb-2">Xaridor</p>
            <p className="text-white text-sm">{order.address.fullName}</p>
            <p className="text-neone-muted text-sm">{order.address.phone}</p>
            <p className="text-neone-muted text-sm">
              {order.address.street}
              {order.address.apartment ? `, ${order.address.apartment}` : ''}, {order.address.district}, {order.address.region}
            </p>
          </div>
          <div>
            <p className="text-neone-muted text-xs uppercase tracking-wide mb-2">To'lov</p>
            <p className="text-white text-sm">{order.paymentMethodName}</p>
            <p className="text-neone-muted text-sm mt-2">{order.delivery.name}</p>
          </div>
        </div>

        <div className="py-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neone-muted text-xs uppercase tracking-wide border-b border-neone-border">
                <th className="pb-3 font-medium">Mahsulot</th>
                <th className="pb-3 font-medium text-center">O'lcham</th>
                <th className="pb-3 font-medium text-center">Soni</th>
                <th className="pb-3 font-medium text-right">Narxi</th>
                <th className="pb-3 font-medium text-right">Jami</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b border-neone-border last:border-b-0">
                  <td className="py-3 text-white">{item.product.name}</td>
                  <td className="py-3 text-center text-neone-muted">{item.size || '\u2014'}</td>
                  <td className="py-3 text-center text-neone-muted">{item.qty}</td>
                  <td className="py-3 text-right text-neone-muted">{formatSom(item.product.price)}</td>
                  <td className="py-3 text-right text-white font-medium">{formatSom(item.product.price * item.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-full sm:w-64 flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neone-muted">Mahsulotlar</span>
              <span className="text-white">{formatSom(order.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neone-muted">Yetkazib berish</span>
              <span className="text-white">{order.deliveryFee === 0 ? 'Bepul' : formatSom(order.deliveryFee)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-neone-border">
              <span className="text-white font-semibold">Jami to'langan</span>
              <span className="text-white font-bold text-base">{formatSom(order.total)}</span>
            </div>
          </div>
        </div>

        <p className="text-neone-muted text-xs text-center mt-8 pt-6 border-t border-neone-border">
          Ushbu hujjat elektron shaklda yaratilgan va NEONE tomonidan tasdiqlangan \u2014 rasmiy hisob-faktura hisoblanadi.
        </p>
      </div>
    </main>
  )
}
