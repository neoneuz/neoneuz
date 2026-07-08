import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { cancelReasons } from '../../data/orders'

export default function CancelOrderModal({ order, onClose, onConfirm }) {
  const [reason, setReason] = useState(cancelReasons[0])
  const [submitting, setSubmitting] = useState(false)

  async function handleConfirm() {
    setSubmitting(true)
    await onConfirm(reason)
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-neone-bg border border-neone-border w-full max-w-md sm:rounded-2xl overflow-hidden max-h-full sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neone-border shrink-0">
          <h2 className="text-white font-bold">Buyurtmani bekor qilish</h2>
          <button onClick={onClose} className="text-neone-muted hover:text-white focus-ring" aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
            <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-neone-muted leading-relaxed">
              <span className="text-white font-medium">#{order.id}</span> buyurtmasini bekor qilmoqchimisiz? Bu amalni ortga qaytarib
              bo'lmaydi.
            </p>
          </div>

          <label className="block">
            <span className="block text-white text-sm font-medium mb-1.5">Bekor qilish sababi</span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-neone-card border border-neone-border rounded-xl px-3.5 py-3 text-sm text-white outline-none focus-ring focus:border-neone-accent"
            >
              {cancelReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-neone-border text-white text-sm py-3 rounded-xl hover:border-neone-muted focus-ring"
            >
              Bekor qilish
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={submitting}
              className="flex-1 bg-red-500 text-white font-semibold text-sm py-3 rounded-xl hover:brightness-95 focus-ring disabled:opacity-60"
            >
              {submitting ? 'Yuborilmoqda...' : 'Ha, bekor qilish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
