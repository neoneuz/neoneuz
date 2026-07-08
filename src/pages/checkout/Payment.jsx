import { useState } from 'react'
import { Check, ChevronLeft, Lock, ShieldCheck, ShoppingBag } from 'lucide-react'
import CheckoutSteps from '../../components/checkout/CheckoutSteps'
import OrderRecap from '../../components/checkout/OrderRecap'
import EmptyState from '../../components/EmptyState'
import FormField from '../../components/ui/FormField'
import {
  paymentMethods,
  deliveryMethods,
  getDeliveryFee,
  formatCardNumber,
  formatExpiry,
  isValidCardNumber,
  generateOrderId,
} from '../../data/checkout'
import { formatSom } from '../../data/products'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

function PaymentMethodTile({ method, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(method.id)}
      aria-pressed={selected}
      className={`relative flex flex-col items-center gap-2.5 bg-neone-panel border rounded-2xl p-4 transition-colors focus-ring ${
        selected ? 'border-neone-accent' : 'border-neone-border hover:border-neone-muted'
      }`}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-neone-accent text-black flex items-center justify-center">
          <Check size={10} />
        </span>
      )}
      {method.special === 'mastercard' ? (
        <span className="w-full h-9 rounded-lg flex items-center justify-center bg-neone-card">
          <span className="relative w-9 h-6 shrink-0">
            <span className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#EB001B] opacity-90" />
            <span className="absolute left-3 top-0 w-6 h-6 rounded-full bg-[#F79E1B] opacity-90" />
          </span>
        </span>
      ) : (
        <span
          className={`w-full h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold tracking-wide px-1 ${method.bg} ${
            method.italic ? 'italic' : ''
          }`}
        >
          {method.name}
        </span>
      )}
      <span className="text-white text-xs font-medium">{method.name}</span>
    </button>
  )
}

export default function Payment({ addressId, deliveryId, onBack, onSuccess, onFailed, onPending, onContinueShopping }) {
  const { addresses } = useAuth()
  const { items, subtotal } = useCart()
  const [methodId, setMethodId] = useState(null)
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvc: '', name: '' })
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const method = paymentMethods.find((m) => m.id === methodId)
  const address = addresses.find((a) => a.id === addressId)
  const delivery = deliveryMethods.find((d) => d.id === deliveryId)
  const deliveryFee = getDeliveryFee(deliveryId, subtotal)
  const total = subtotal + deliveryFee

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

  function validate() {
    const next = {}
    if (!method) {
      next.method = "To'lov usulini tanlang"
      return next
    }
    if (method.type === 'card') {
      const digits = cardForm.number.replace(/\D/g, '')
      if (digits.length < 13) next.number = "Karta raqamini to'liq kiriting"
      if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry)) next.expiry = 'AA/YY formatida kiriting'
      if (!/^\d{3,4}$/.test(cardForm.cvc)) next.cvc = 'CVC kodini kiriting'
      if (!cardForm.name.trim()) next.name = "Karta egasining ismini kiriting"
    } else {
      if (!/^\+?\d{9,13}$/.test(phone.replace(/[\s()-]/g, ''))) next.phone = 'Telefon raqamini kiriting'
    }
    return next
  }

  function buildOrder() {
    return {
      id: generateOrderId(),
      items,
      subtotal,
      deliveryFee,
      total,
      address,
      delivery,
      paymentMethodId: method.id,
      paymentMethodName: method.name,
      createdAt: new Date().toISOString(),
    }
  }

  async function handlePay() {
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setSubmitting(false)

    const order = buildOrder()

    if (method.type === 'wallet') {
      onPending(order)
    } else if (isValidCardNumber(cardForm.number)) {
      onSuccess(order)
    } else {
      onFailed(order)
    }
  }

  return (
    <main className="px-4 sm:px-8 py-6">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="text-neone-muted hover:text-white focus-ring">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-bold">To'lov</h1>
      </div>

      <CheckoutSteps current="payment" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-white font-semibold text-sm mb-3">To'lov usulini tanlang</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {paymentMethods.map((m) => (
                <PaymentMethodTile key={m.id} method={m} selected={methodId === m.id} onSelect={setMethodId} />
              ))}
            </div>
            {errors.method && <p className="text-red-500 text-xs mt-2">{errors.method}</p>}
          </div>

          {method?.type === 'card' && (
            <div className="bg-neone-panel border border-neone-border rounded-2xl p-5 flex flex-col gap-4">
              <FormField
                label="Karta raqami"
                placeholder="4000 1234 5678 9017"
                value={cardForm.number}
                onChange={(e) => setCardForm((f) => ({ ...f, number: formatCardNumber(e.target.value) }))}
                error={errors.number}
                inputMode="numeric"
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Amal qilish muddati"
                  placeholder="AA/YY"
                  value={cardForm.expiry}
                  onChange={(e) => setCardForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                  error={errors.expiry}
                  inputMode="numeric"
                />
                <FormField
                  label="CVC"
                  placeholder="123"
                  type="password"
                  value={cardForm.cvc}
                  onChange={(e) => setCardForm((f) => ({ ...f, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                  error={errors.cvc}
                  inputMode="numeric"
                />
              </div>
              <FormField
                label="Karta egasining ismi"
                placeholder="ALIYEV ALI"
                value={cardForm.name}
                onChange={(e) => setCardForm((f) => ({ ...f, name: e.target.value.toUpperCase() }))}
                error={errors.name}
              />
            </div>
          )}

          {method?.type === 'wallet' && (
            <div className="bg-neone-panel border border-neone-border rounded-2xl p-5 flex flex-col gap-4">
              <FormField
                label="Telefon raqami"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                inputMode="tel"
              />
              <p className="text-neone-muted text-xs leading-relaxed">
                To'lovni tasdiqlash uchun {method.name} ilovasiga yo'naltirilasiz.
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-neone-muted text-xs">
            <ShieldCheck size={14} className="text-neone-accent shrink-0" />
            Barcha to'lovlar xavfsiz va shifrlangan aloqa orqali amalga oshiriladi
          </div>
        </div>

        <OrderRecap
          items={items}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          ctaLabel={`To'lash \u2014 ${formatSom(total)}`}
          onCta={handlePay}
          ctaDisabled={!methodId}
          ctaLoading={submitting}
          ctaIcon={Lock}
        />
      </div>
    </main>
  )
}
