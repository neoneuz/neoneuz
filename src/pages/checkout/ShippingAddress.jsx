import { useEffect, useState } from 'react'
import { Check, ChevronLeft, MapPin, Plus, ShoppingBag } from 'lucide-react'
import CheckoutSteps from '../../components/checkout/CheckoutSteps'
import OrderRecap from '../../components/checkout/OrderRecap'
import EmptyState from '../../components/EmptyState'
import AddressFormModal from '../../components/account/AddressFormModal'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

export default function ShippingAddress({ selectedAddressId, onSelectAddress, onContinue, onBack, onContinueShopping }) {
  const { addresses, addAddress } = useAuth()
  const { items, subtotal } = useCart()
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingSelect, setPendingSelect] = useState(false)

  // Foydalanuvchi checkout jarayonida yangi manzil qo'shsa, uni avtomatik tanlaymiz.
  useEffect(() => {
    if (pendingSelect && addresses.length > 0) {
      onSelectAddress(addresses[addresses.length - 1].id)
      setPendingSelect(false)
    }
  }, [addresses, pendingSelect]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleAddAddress(form) {
    setPendingSelect(true)
    await addAddress(form)
    setModalOpen(false)
  }

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
        <h1 className="text-white text-xl font-bold">Yetkazib berish manzili</h1>
      </div>

      <CheckoutSteps current="address" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div>
          {addresses.length === 0 ? (
            <EmptyState
              icon={MapPin}
              title="Hozircha manzil qo'shilmagan"
              message="Yetkazib berish uchun manzil qo'shing"
              ctaLabel="Manzil qo'shish"
              onCta={() => setModalOpen(true)}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((a) => {
                const selected = selectedAddressId === a.id
                return (
                  <button
                    key={a.id}
                    onClick={() => onSelectAddress(a.id)}
                    aria-pressed={selected}
                    className={`text-left relative bg-neone-panel border rounded-2xl p-5 transition-colors focus-ring ${
                      selected ? 'border-neone-accent' : 'border-neone-border hover:border-neone-muted'
                    }`}
                  >
                    {selected && (
                      <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-neone-accent text-black flex items-center justify-center">
                        <Check size={12} />
                      </span>
                    )}
                    <div className="flex items-center gap-2 pr-6">
                      <span className="text-white font-semibold text-sm">{a.label}</span>
                      {a.isDefault && (
                        <span className="text-[11px] font-semibold text-neone-accent bg-neone-accent/10 px-2 py-0.5 rounded-md">
                          Asosiy
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-neone-muted leading-relaxed">
                      <p className="text-white">{a.fullName}</p>
                      <p>{a.phone}</p>
                      <p>
                        {a.street}
                        {a.apartment ? `, ${a.apartment}` : ''}
                      </p>
                      <p>
                        {a.district}, {a.region}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 flex items-center justify-center gap-2 w-full sm:w-auto border border-dashed border-neone-border text-white text-sm px-4 py-3 rounded-xl hover:border-neone-muted focus-ring"
          >
            <Plus size={16} /> Yangi manzil qo'shish
          </button>
        </div>

        <OrderRecap
          items={items}
          subtotal={subtotal}
          ctaLabel="Davom etish"
          onCta={onContinue}
          ctaDisabled={!selectedAddressId}
        />
      </div>

      {modalOpen && <AddressFormModal onClose={() => setModalOpen(false)} onSubmit={handleAddAddress} />}
    </main>
  )
}
