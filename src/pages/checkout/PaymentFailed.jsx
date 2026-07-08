import { XCircle } from 'lucide-react'
import PaymentResultLayout from '../../components/checkout/PaymentResultLayout'

export default function PaymentFailed({ order, onRetry, onHome }) {
  return (
    <PaymentResultLayout
      icon={XCircle}
      tone="error"
      title="To'lov amalga oshmadi"
      message="To'lovni tasdiqlashda xatolik yuz berdi. Karta ma'lumotlarini tekshirib, qaytadan urinib ko'ring."
      order={order}
    >
      <button
        onClick={onRetry}
        className="w-full bg-neone-accent text-black font-semibold py-3.5 rounded-xl hover:brightness-95 transition-all focus-ring"
      >
        Qaytadan urinish
      </button>
      <button
        onClick={onHome}
        className="w-full border border-neone-border text-white font-semibold py-3.5 rounded-xl hover:border-neone-muted transition-colors focus-ring"
      >
        Bosh sahifaga qaytish
      </button>
    </PaymentResultLayout>
  )
}
