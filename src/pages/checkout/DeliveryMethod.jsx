import { Check, ChevronLeft, ShoppingBag } from 'lucide-react'
import CheckoutSteps from '../../components/checkout/CheckoutSteps'
import OrderRecap from '../../components/checkout/OrderRecap'
import EmptyState from '../../components/EmptyState'
import { deliveryMethods, getDeliveryFee } from '../../data/checkout'
import { formatSom } from '../../data/products'
import { useCart } from '../../context/CartContext'

export default function DeliveryMethod({ selectedDeliveryId, onSelectDelivery, onContinue, onBack, onContinueShopping }) {
  const { items, subtotal } = useCart()

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

  const currentFee = getDeliveryFee(selectedDeliveryId, subtotal)

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">Yetkazib berish usuli</h1>
      </div>

      <CheckoutSteps current="delivery" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-4">
          {deliveryMethods.map((m) => {
            const fee = getDeliveryFee(m.id, subtotal)
            const selected = selectedDeliveryId === m.id
            return (
              <button
                key={m.id}
                onClick={() => onSelectDelivery(m.id)}
                aria-pressed={selected}
                className={`text-left flex items-center justify-between gap-4 bg-neone-panel border rounded-2xl p-5 transition-colors focus-ring ${
                  selected ? 'border-neone-accent' : 'border-neone-border hover:border-neone-muted'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      selected ? 'border-neone-accent bg-neone-accent' : 'border-neone-border'
                    }`}
                  >
                    {selected && <Check size={12} className="text-black" />}
                  </span>
                  <div>
                    <p className="text-white font-medium text-sm">{m.name}</p>
                    <p className="text-neone-muted text-xs mt-1">{m.desc}</p>
                    <p className="text-neone-muted text-xs mt-1">Yetib borish: {m.eta}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${fee === 0 ? 'text-neone-accent' : 'text-white'}`}>
                  {fee === 0 ? 'Bepul' : formatSom(fee)}
                </span>
              </button>
            )
          })}
        </div>

        <OrderRecap
          items={items}
          subtotal={subtotal}
          deliveryFee={currentFee}
          ctaLabel="Davom etish"
          onCta={onContinue}
          ctaDisabled={!selectedDeliveryId}
        />
      </div>
    </main>
  )
}
