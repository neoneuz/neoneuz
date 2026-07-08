import { Clock } from 'lucide-react'
import PaymentResultLayout from '../../components/checkout/PaymentResultLayout'

export default function PaymentPending({ order, onConfirm, onCancel }) {
  return (
    <PaymentResultLayout
      icon={Clock}
      tone="pending"
      title="To'lov tasdiqlanishi kutilmoqda"
      message={`To'lovni yakunlash uchun ${order?.paymentMethodName || 'tanlangan'} ilovasida tasdiqlang.`}
      order={order}
    >
      <button
        onClick={onConfirm}
        className="w-full bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring"
      >
        To'lovni tasdiqladim
      </button>
      <button
        onClick={onCancel}
        className="w-full border border-neone-border text-white font-semibold py-3.5 rounded-xl hover:border-neone-muted transition-colors focus-ring"
      >
        Bekor qilish
      </button>
    </PaymentResultLayout>
  )
}
