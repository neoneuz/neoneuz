import { ClipboardCheck, CheckCircle2, Truck, PackageCheck, XCircle } from 'lucide-react'
import { ORDER_STATUS_FLOW, ORDER_STATUS_META, getStatusStepIndex, formatOrderDate } from '../../data/orders'

const STEP_ICONS = {
  processing: ClipboardCheck,
  confirmed: CheckCircle2,
  shipped: Truck,
  delivered: PackageCheck,
  cancelled: XCircle,
}

// Buyurtma holati bosqichlarini ko'rsatadi.
// variant="compact" — gorizontal mini-indikator (Buyurtma tafsilotlari sahifasi uchun)
// variant="full" — vertikal, vaqt tamg'alari va tavsiflar bilan (Buyurtmani kuzatish sahifasi uchun)
export default function OrderStatusTimeline({ order, variant = 'full' }) {
  const isCancelled = order.status === 'cancelled'
  const currentIndex = getStatusStepIndex(order.status)

  function historyFor(status) {
    return order.statusHistory.find((h) => h.status === status)
  }

  if (variant === 'compact') {
    if (isCancelled) {
      return (
        <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
          <XCircle size={16} /> Bekor qilindi
        </div>
      )
    }
    return (
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1">
        {ORDER_STATUS_FLOW.map((step, i) => {
          const done = i <= currentIndex
          const isActive = i === currentIndex && order.status !== 'delivered'
          const StepIcon = STEP_ICONS[step]
          return (
            <div key={step} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 ${
                  done ? 'bg-neone-accent text-black' : 'border border-neone-border text-neone-muted'
                } ${isActive ? 'ring-2 ring-neone-accent/40' : ''}`}
              >
                <StepIcon size={13} />
              </span>
              <span
                className={`text-xs sm:text-sm whitespace-nowrap ${done ? 'text-white' : 'text-neone-muted'} ${
                  isActive ? 'font-medium' : ''
                }`}
              >
                {ORDER_STATUS_META[step].label}
              </span>
              {i < ORDER_STATUS_FLOW.length - 1 && <span className="w-4 sm:w-8 h-px bg-neone-border shrink-0" />}
            </div>
          )
        })}
      </div>
    )
  }

  const stepsToRender = isCancelled
    ? [...order.statusHistory.filter((h) => h.status !== 'cancelled').map((h) => h.status), 'cancelled']
    : ORDER_STATUS_FLOW

  return (
    <div className="flex flex-col">
      {stepsToRender.map((step, i) => {
        const meta = ORDER_STATUS_META[step]
        const StepIcon = STEP_ICONS[step]
        const entry = historyFor(step)
        const isLast = i === stepsToRender.length - 1
        const isCancelledNode = step === 'cancelled'
        const done = isCancelled ? true : i <= currentIndex
        const isActive = !isCancelled && i === currentIndex && order.status !== 'delivered'

        return (
          <div key={`${step}-${i}`} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isCancelledNode
                    ? 'bg-red-500/15 text-red-400'
                    : done
                    ? 'bg-neone-accent text-black'
                    : 'border border-neone-border text-neone-muted'
                } ${isActive ? 'ring-2 ring-neone-accent/40' : ''}`}
              >
                <StepIcon size={15} />
              </span>
              {!isLast && (
                <span className={`w-px flex-1 min-h-[28px] ${done && !isCancelledNode ? 'bg-neone-accent/40' : 'bg-neone-border'}`} />
              )}
            </div>
            <div className={isLast ? 'pb-0' : 'pb-6'}>
              <p className={`text-sm font-medium ${isCancelledNode ? 'text-red-400' : done ? 'text-white' : 'text-neone-muted'}`}>
                {meta.label}
              </p>
              <p className="text-neone-muted text-xs mt-0.5">{entry ? formatOrderDate(entry.at, true) : done ? '' : 'Kutilmoqda'}</p>
              {(done || isCancelledNode) && (
                <p className="text-neone-muted text-xs mt-1 leading-relaxed">
                  {isCancelledNode && order.cancelReason ? `Sabab: ${order.cancelReason}` : meta.description}
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
