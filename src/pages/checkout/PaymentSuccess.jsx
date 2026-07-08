import { CheckCircle2 } from 'lucide-react'
import PaymentResultLayout from '../../components/checkout/PaymentResultLayout'

export default function PaymentSuccess({ order, onHome }) {
  return (
    <PaymentResultLayout
      icon={CheckCircle2}
      tone="success"
      title="To'lov muvaffaqiyatli o'tdi!"
      message="Buyurtmangiz qabul qilindi. Yetkazib berish holati haqida SMS orqali xabar beramiz."
      order={order}
    >
      <button
        onClick={onHome}
        className="w-full bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring"
      >
        Bosh sahifaga qaytish
      </button>
    </PaymentResultLayout>
  )
}
