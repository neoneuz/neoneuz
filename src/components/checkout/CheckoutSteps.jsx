import { Check } from 'lucide-react'

const STEPS = [
  { key: 'address', label: 'Manzil' },
  { key: 'delivery', label: 'Yetkazib berish' },
  { key: 'summary', label: 'Xulosa' },
  { key: 'payment', label: "To'lov" },
]

export default function CheckoutSteps({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current)

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 mb-6 overflow-x-auto pb-1">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex
        const isActive = i === currentIndex
        return (
          <div key={step.key} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${
                isDone
                  ? 'bg-neone-accent text-black'
                  : isActive
                  ? 'border-2 border-neone-accent text-neone-accent'
                  : 'border border-neone-border text-neone-muted'
              }`}
            >
              {isDone ? <Check size={13} /> : i + 1}
            </span>
            <span
              className={`text-xs sm:text-sm whitespace-nowrap ${
                isActive ? 'text-white font-medium' : isDone ? 'text-white' : 'text-neone-muted'
              }`}
            >
              {step.label}
            </span>
            {i < STEPS.length - 1 && <span className="w-4 sm:w-8 h-px bg-neone-border shrink-0" />}
          </div>
        )
      })}
    </div>
  )
}
