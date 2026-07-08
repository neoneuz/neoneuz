import { useState } from 'react'
import { X } from 'lucide-react'
import FormField from '../ui/FormField'
import { regions } from '../../data/account'

const emptyForm = {
  label: '',
  fullName: '',
  phone: '',
  region: regions[0],
  district: '',
  street: '',
  apartment: '',
  isDefault: false,
}

export default function AddressFormModal({ initialAddress, onClose, onSubmit }) {
  const [form, setForm] = useState(initialAddress ? { ...emptyForm, ...initialAddress } : emptyForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: null }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = {}
    if (!form.label) nextErrors.label = 'Manzil nomini kiriting (masalan, Uy)'
    if (!form.fullName) nextErrors.fullName = "To'liq ismni kiriting"
    if (!form.phone) nextErrors.phone = 'Telefon raqamni kiriting'
    if (!form.district) nextErrors.district = 'Tuman/shaharni kiriting'
    if (!form.street) nextErrors.street = "Ko'cha va uy raqamini kiriting"
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    await onSubmit(form)
    setSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-neone-bg border border-neone-border w-full max-w-lg sm:rounded-2xl overflow-hidden max-h-full sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neone-border shrink-0">
          <h2 className="text-white font-bold">{initialAddress ? 'Manzilni tahrirlash' : "Yangi manzil qo'shish"}</h2>
          <button onClick={onClose} className="text-neone-muted hover:text-white focus-ring" aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex flex-col gap-4">
          <FormField
            label="Manzil nomi"
            placeholder="Uy, Ish va h.k."
            value={form.label}
            onChange={(e) => update('label', e.target.value)}
            error={errors.label}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="To'liq ism" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} error={errors.fullName} />
            <FormField label="Telefon raqam" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} error={errors.phone} />
          </div>

          <label className="block">
            <span className="block text-white text-sm font-medium mb-1.5">Viloyat</span>
            <select
              value={form.region}
              onChange={(e) => update('region', e.target.value)}
              className="w-full bg-neone-card border border-neone-border rounded-xl px-3.5 py-3 text-sm text-white outline-none focus-ring focus:border-neone-accent"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>

          <FormField
            label="Tuman / shahar"
            placeholder="Chilonzor tumani"
            value={form.district}
            onChange={(e) => update('district', e.target.value)}
            error={errors.district}
          />
          <FormField
            label="Ko'cha va uy raqami"
            placeholder="Bunyodkor ko'chasi 12"
            value={form.street}
            onChange={(e) => update('street', e.target.value)}
            error={errors.street}
          />
          <FormField
            label="Kvartira / ofis (ixtiyoriy)"
            placeholder="45-xonadon"
            value={form.apartment}
            onChange={(e) => update('apartment', e.target.value)}
          />

          <label className="flex items-center gap-2.5 text-sm text-white">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => update('isDefault', e.target.checked)}
              className="w-4 h-4 rounded accent-[#22c55e]"
            />
            Asosiy manzil sifatida belgilash
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
              type="submit"
              disabled={submitting}
              className="flex-1 bg-neone-accent text-black font-semibold text-sm py-3 rounded-xl hover:brightness-95 focus-ring disabled:opacity-60"
            >
              {submitting ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
