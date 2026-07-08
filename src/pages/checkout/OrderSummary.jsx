import { ChevronLeft, MapPin, Pencil, ShoppingBag, Truck } from 'lucide-react'
import CheckoutSteps from '../../components/checkout/CheckoutSteps'
import OrderRecap from '../../components/checkout/OrderRecap'
import EmptyState from '../../components/EmptyState'
import { deliveryMethods, getDeliveryFee } from '../../data/checkout'
import { formatSom } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function OrderSummary({ addressId, deliveryId, onContinue, onBack, onEditAddress, onEditDelivery, onContinueShopping }) {
  const { addresses } = useAuth()
  const { items, subtotal } = useCart()

  const address = addresses.find((a) => a.id === addressId)
  const delivery = deliveryMethods.find((d) => d.id === deliveryId)
  const deliveryFee = getDeliveryFee(deliveryId, subtotal)

  if (items.length === 0) {
    return (
      <main className="px-4 sm:px-8 py-6">
        <EmptyState
          icon={ShoppingBag}
          title="Savatingiz bo'sh"
          message="Buyurtma berish uchun avval savatga mahsulot qo'shing"
          ctaLabel="Xarid qilishni boshlash"
          onCta={onContinueShopping}
        />
      </main>
    )
  }

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">Buyurtma xulosasi</h1>
      </div>

      <CheckoutSteps current="summary" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <MapPin size={16} className="text-neone-accent" /> Yetkazib berish manzili
              </div>
              <button
                onClick={onEditAddress}
                className="text-neone-muted hover:text-white text-xs font-medium flex items-center gap-1 focus-ring"
              >
                <Pencil size={13} /> O'zgartirish
              </button>
            </div>
            {address ? (
              <div className="text-sm text-neone-muted leading-relaxed">
                <p className="text-white">
                  {address.fullName} · {address.phone}
                </p>
                <p>
                  {address.street}
                  {address.apartment ? `, ${address.apartment}` : ''}
                </p>
                <p>
                  {address.district}, {address.region}
                </p>
              </div>
            ) : (
              <p className="text-neone-muted text-sm">Manzil tanlanmagan</p>
            )}
          </div>

          <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Truck size={16} className="text-neone-accent" /> Yetkazib berish usuli
              </div>
              <button
                onClick={onEditDelivery}
                className="text-neone-muted hover:text-white text-xs font-medium flex items-center gap-1 focus-ring"
              >
                <Pencil size={13} /> O'zgartirish
              </button>
            </div>
            {delivery ? (
              <div className="flex items-center justify-between text-sm">
                <div className="text-neone-muted">
                  <p className="text-white">{delivery.name}</p>
                  <p>Yetib borish: {delivery.eta}</p>
                </div>
                <span className={`font-semibold ${deliveryFee === 0 ? 'text-neone-accent' : 'text-white'}`}>
                  {deliveryFee === 0 ? 'Bepul' : formatSom(deliveryFee)}
                </span>
              </div>
            ) : (
              <p className="text-neone-muted text-sm">Usul tanlanmagan</p>
            )}
          </div>

          <div className="bg-neone-panel border border-neone-border rounded-2xl p-5">
            <p className="text-white font-semibold text-sm mb-4">
              Mahsulotlar ({items.reduce((s, i) => s + i.qty, 0)})
            </p>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-neone-card shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-neone-muted text-xs mt-0.5">
                      {item.size ? `${item.size} \u00b7 ` : ''}
                      {item.qty} dona
                    </p>
                  </div>
                  <span className="text-white text-sm font-medium shrink-0">{formatSom(item.product.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <OrderRecap items={items} subtotal={subtotal} deliveryFee={deliveryFee} ctaLabel="To'lovga o'tish" onCta={onContinue} />
      </div>
    </main>
  )
}
