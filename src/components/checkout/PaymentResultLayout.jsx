import { formatSom } from '../../data/products'

const TONE_STYLES = {
  success: 'bg-neone-accent/10 text-neone-accent',
  error: 'bg-red-500/10 text-red-400',
  pending: 'bg-amber-400/10 text-amber-400',
}

export default function PaymentResultLayout({ icon: Icon, tone, title, message, order, children }) {
  return (
    <main className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${TONE_STYLES[tone]}`}>
            <Icon size={36} />
          </div>
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          <p className="text-neone-muted text-sm mt-2 leading-relaxed">{message}</p>
        </div>

        {order && (
          <div className="bg-neone-panel border border-neone-border rounded-2xl p-5 mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neone-muted">Buyurtma raqami</span>
              <span className="text-white font-medium">#{order.id}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2.5">
              <span className="text-neone-muted">To'lov usuli</span>
              <span className="text-white font-medium">{order.paymentMethodName}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2.5 pt-2.5 border-t border-neone-border">
              <span className="text-white font-semibold">Jami summa</span>
              <span className="text-white font-bold">{formatSom(order.total)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-8">{children}</div>
      </div>
    </main>
  )
}
